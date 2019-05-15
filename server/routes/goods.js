var express = require('express');
var router = express.Router();
var Goods = require('../models/goods');
var User = require('../models/user')
router.get("/", (req, res, next) => {
  // res.send('hello,goods list')
  let page = parseInt(req.param('page'));
  let pageSize = parseInt(req.param('pageSize'));
  let sort = req.param('sort');
  let skip = (page-1)*pageSize;
  let priceLevel = req.param('priceLevel');
  let priceStart = '';
  let priceEnd = '';
  let params = {};
  if (priceLevel!='all') {
    console.log(priceLevel === '2')
    switch(priceLevel) {
      case '0':
        priceStart = 0;
        priceEnd = 500;
        break;
      case '1':
        priceStart = 500;
        priceEnd = 1000;
        break;
      case '2':
        priceStart = 1000;
        priceEnd = 2000;
        break;
    }
    params = {
      salePrice:{
        $gte: priceStart,
        $lte: priceEnd
      }
    }
  }
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice' : sort})
  goodsModel.find({}).then(result => {
    if (!result) {
      res.status(404).json({
        message: "Not found!"
      });
    }
    res.status(201).json({
      message: "success!",
      result: result
    })
  }).catch(err => {
    res.status(500).json({
    message: "Fetching products failed!"
  });
  })
    // , function (err,doc) {
    // if (err) {
    //   res.send(err.message)
    // } else {
    //   res.send(doc)
    // }
  // }
});


router.post("/addCart", async (req,res,next) => {
  let userName = req.body.userName;
  console.log(userName)
  if (!userName) {
    res.status(401).json({
      message: "You need login!"
    });
  }
  let _id = req.body._id;
  let user;
  let good;
  let goodsItem = '';
  try {
    user = await User.findOne({userName: userName})
    if (!user) {
      res.status(404).json({
        message: "User Not found!"
      });
    }
    user.cartList.forEach(item => {
      if(item._id == _id){
        goodsItem = item;
        item.productNum ++;
      }
    });
    if (goodsItem) {
      let result = user.save()
      if (!result) {
        res.status(403).json({
          message: "user cart cannot update!"
        });
      } else {
        res.status(200).json({
          message: "User cart update!",
          result: result
        })
      }
    } else {
      good = await Goods.findOne({_id:_id});
      console.log("goods: " + good)
      if (!good) {
        console.log("goods: " + good)
        res.status(404).json({
          message: "product not found!"
        });
      }
      user.cartList.push({
        "_id":_id,
        "productName":good.productName,
        "salePrice":good.salePrice,
        "productImage":good.productImage,
        "productNum":1,
        "checked":1
      });
    
      let userSave = await user.save();
      console.log(userSave)
      if (!userSave) {
        res.status(403).json({
          message: "user cart cannot update!"
        });
      } else {
        res.status(200).json({
          message: "User cart update!",
          result: userSave
        })
      }  
    }
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error!"
    });
  };
})
module.exports = router;

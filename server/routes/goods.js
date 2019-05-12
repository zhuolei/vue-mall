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
    console.log('result:' + result)
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
  let userId = '100000077';
  let productId = req.body.productId;
  try {
    let user = await User.findOne({userId: userId})
    if (!user) {
      res.status(404).json({
        message: "User Not found!"
      });
    }
    let goodsItem = '';
    user.cartList.forEach(item => {
      if(item.productId == productId){
        goodsItem = item;
        item.productNum ++;
      }
    });
    if (goodsItem) {
      console.log(goodsItem)
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
      let good = await Goods.findOne({productId:productId});
      if (!good) {
        res.status(404).json({
          message: "product not found!"
        });
      }
      user.cartList.push({
        "productId":result.productId,
        "productName":result.productName,
        "salePrice":result.salePrice,
        "productImage":result.productImage,
        "productNum":1,
        "checked":1
      });
      let userSave = await user.save();
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
    console.log(user)
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error!"
    });
  };


    // .then(result => {
    //   if (!result) {
    //     res.status(404).json({
    //       message: "Not found!"
    //     });
    //   }
    //   // res.status(200).json({
    //   //   message:"call success"
    //   // })
    //   let goodsItem = '';
    //   // console.log(result);
    //   user = result;
    //   result.cartList.forEach(item => {
    //     if(item.productId == productId){
    //       goodsItem = item;
    //       item.productNum ++;
    //     }
    //   });
    //   if (goodsItem) {
    //     console.log(goodsItem)
    //     result.save(resultCart => {
    //       if (!resultCart) {
    //         res.status(404).json({
    //           message: "user cart update unsuccess!"
    //         });
    //       }
    //       res.status(200).json({
    //         message: "User cart update!",
    //         result: resultCart
    //       })
    //     })
    //   } else {
    //     return Goods.findOne({productId:productId})
    //   }
    // })
    // .then(result => {
    //   // console.log(result)
    //   if (!result) {
    //     res.status(404).json({
    //       message: "Not found!"
    //     });
    //   }
    //   console.log(result);
    //   user.cartList.push({
    //     "productId":result.productId,
    //     "productName":result.productName,
    //     "salePrice":result.salePrice,
    //     "productImage":result.productImage,
    //     "productNum":1,
    //     "checked":1
    //   });
    //   return user.save()
    // })
    // .then(result => {
    //   // console.log(result)
    //   res.status(200).json({
    //     message: "User cart update!",
    //     result: result
    //   });
    // })
})
module.exports = router;

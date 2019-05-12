var express = require('express');
var router = express.Router();
var Goods = require('../models/goods');

router.get("/", function(req, res, next){
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
  console.log(params)
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice' : sort})
  goodsModel.find({}, function (err,doc) {
    if (err) {
      res.send(err.message)
    } else {
      res.send(doc)
    }
  })
});
module.exports = router;

var express = require('express');
var router = express.Router();
var Goods = require('../models/goods');

router.get("/", function(req, res, next){
  // res.send('hello,goods list')
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let sort = req.param("sort");
  let skip = (page-1)*pageSize;
  let params = {};
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

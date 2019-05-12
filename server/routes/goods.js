var express = require('express');
var router = express.Router();
var Goods = require('../models/goods');

router.get("/", function(req, res, next){
  // res.send('hello,goods list')
  Goods.find({}, function (err,doc) {
    if (err) {
      res.send(err.message)
    } else {
      res.send(doc)
    }
  })
});
module.exports = router;

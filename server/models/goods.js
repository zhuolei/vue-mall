var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
  "productId":{type:String},
  "productName":String,
  "salePrice":Number,
  "productNum":Number,
  "checked":String,
  "productImage":String
}, {collection: 'products'});

module.exports = mongoose.model('Good',productSchema);

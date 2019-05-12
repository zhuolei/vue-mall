const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//{type: String, required: true, unique:true},
const userSchema = new mongoose.Schema({
  "userId":String,
  "userName": {type: String, required: true, unique:true},
  "userPwd": {type: String, required: true},
  "orderList":Array,
  "cartList":[
    {
      "productId":String,
      "productName":String,
      "salePrice":String,
      "productImage":String,
      "checked":String,
      "productNum":String
    }
  ],
  "addressList":[
    {
      "addressId": String,
      "userName": String,
      "streetName": String,
      "postCode": Number,
      "tel": Number,
      "isDefault": Boolean
    }
  ]
}, {collection: 'users'});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User",userSchema);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const goods = require('./routes/goods')
const users = require('./routes/users')

const app = express();
// serve static contents
app.use(cors());// *
app.use(bodyParser.json()) //if you don't have things before body
app.use(bodyParser.urlencoded({extended: false})); // parse form data

// connect to monogdb
mongoose.Promise = global.Promise;
var promise = mongoose.connect("mongodb+srv://leo:76hHYuoBGSzS09Ed@imooc-fgpwg.mongodb.net/vue-mall?retryWrites=true", {
  useNewUrlParser: true
});
promise.then(function() {
  console.log("Mongodb connected!");
}, function(){
  console.log("Mongodb is not connected")
});

app.use('/goods', goods);
app.use('/user',users);

module.exports = app;

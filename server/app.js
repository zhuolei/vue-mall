const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs')
const cors = require('cors');
const mongoose = require('mongoose');
const goods = require('./routes/goods')
const users = require('./routes/users')

const app = express();



// serve static contents
app.use(cors());// *
app.use(bodyParser.json()) //if you don't have things before body
app.use(bodyParser.urlencoded({extended: false})); // parse form data

app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

// connect to monogdb
mongoose.Promise = global.Promise;
var promise = mongoose.connect(
  "mongodb+srv://leo:" +
  process.env.MONGO_ATLAS_PW +
  "@imooc-fgpwg.mongodb.net/vue-mall?retryWrites=true", {
  useNewUrlParser: true
});
promise.then(function() {
  console.log("Mongodb connected!");
}, function(){
  console.log("Mongodb is not connected")
});

// app.use(function(req, res, next) {
//   if ()
// })

app.use('/goods', goods);
app.use('/users',users);

// app.use(function(req, res, next) {
//   let err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// })
//
// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   res.status(err.status || 500);
//   res.render('error');
// })
module.exports = app;

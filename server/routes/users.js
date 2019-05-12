var express = require('express');
var router = express.Router();
var User = require('./../models/user');

router.post('/login', async (req,res,next) => {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  try {
    let user = User.findOne(param);
    if (!user) {
      res.status(404).json({
        message:'user not found'
      })
    }
    res.status(200).json({
      result: user,
    })
  } catch (e) {

  }
})
module.exports = router;

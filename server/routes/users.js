const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

var User = require('../models/user');

router.post('/signup', (req, res, next) => {
  console.log(req.body)
  bcrypt.hash(req.body.userPwd, 10)
    .then(hash => {
      const user = new User({
        userName:req.body.userName,
        userPwd: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message:'User created',
            result:result
          })
        }).catch(err => {
          console.log(err)
          res.status(500).json({
            error: err
          })
        })
    })
})

router.post('/login', async (req,res,next) => {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  try {
    let user = await User.findOne(param);
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

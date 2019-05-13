const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

router.post('/login', (req,res,next) => {
  let param = {
    userName: req.body.userName
  }
  let fetchedUser;
  User.findOne(param).then(user => {
    if (!user) {
      return res.status(404).json({
        message:'user not found'
      })
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.userPwd, user.userPwd);
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    const token = jwt.sign(
      {userName: fetchedUser.userName, userId: fetchedUser._id},
      'secret_this_should_be_longer',
      {expiresIn:'1h'}
    );
    res.status(200).json({
      user: fetchedUser,
      token: token
    });
  }).catch(err => {
    return res.status(401).json({
      message: "Auth failed"
    })
  })
})
// router.post('/logout', (req,res,next) => {
//
// })
module.exports = router;

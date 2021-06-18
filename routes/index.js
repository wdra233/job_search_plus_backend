var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5');
const {UserModel} = require('../db/models');

// filter掉password和__v property
const filter = '-password -__v';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res) {
  const {username, password, type} = req.body;
  UserModel.findOne({username}, (err, user) => {
    if (user) {
      res.send({code: 1, msg: 'User already exist'});
    } else {
      new UserModel({username, type, password: md5(password)}).save((err, user) => {
        // 生成一天的cookie
        res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 *24});
        const data = {username, type, _id: user._id};
        res.send({code: 0, data});
      })
    }
  })
});

router.post('/login', function (req, res) {
  const {username, password} = req.body;

  UserModel.findOne({username, password: md5(password)}, filter, (err, user) => {
    if (user) {
      res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 *24});
      res.send({code: 0, data: user});
    } else {
      res.send({code: 1, msg: 'username or password incorrect'});
    }
  });
});

router.post('/update', function(req, res) {
  const user = req.body;
  const userid = req.cookies.userid;
  if (!userid) {
    res.send({code: 1, msg: 'Please login or register first!'});
  }

  UserModel.findByIdAndUpdate({_id: userid}, user, (err, oldUser) => {
    if (!oldUser) {
      res.clearCookie('userid');
      res.send({code: 1, msg: 'Please login or register first'});
    } else {
      const {_id, username, type} = oldUser;
      const data = Object.assign(user, {_id, username, type});
      res.send({code: 0, data});
    }
  })

})
module.exports = router;

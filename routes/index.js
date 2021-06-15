var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res) {
  const {username, password} = req.body;
  if (username === 'admin') {
    res.send({code: 1, msg: 'Admin already exists'});
  } else {
    res.send({code:0, data: {id: 'hello123', username, password}});
  }
})

module.exports = router;

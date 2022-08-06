var express = require('express');
var User = require('../models/User');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index.js');
});

router.get('/register', function (req, res, next) {
  res.render('registerForm');
});

router.post('/', function (req, res, next) {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;

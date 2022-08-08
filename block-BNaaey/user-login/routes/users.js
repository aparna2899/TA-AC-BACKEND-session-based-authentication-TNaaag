var express = require('express');
const User = require('../models/User');
var router = express.Router();

router.get('/', function (req, res, next) {
  console.log(req.session);
  res.render('index');
});

router.get('/register', function (req, res, next) {
  res.render('registerForm');
});

router.get('/login', function (req, res, next) {
  res.render('loginForm');
});

router.post('/register', function (req, res, next) {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

router.post('/login', function (req, res, next) {
  var { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect('/users/login');
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) return res.redirect('/users/login');
      req.session.userId = user.id;
      res.redirect('/users');
    });
  });
});

module.exports = router;

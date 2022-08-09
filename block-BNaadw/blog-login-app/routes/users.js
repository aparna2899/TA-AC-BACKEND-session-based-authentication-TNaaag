var express = require('express');
const User = require('../models/User');
var router = express.Router();

router.get('/register', function (req, res, next) {
  var error = req.flash('error')[0];
  res.render('registerForm', { error });
});

router.get('/login', function (req, res, next) {
  var error = req.flash('error')[0];
  res.render('loginForm', { error });
});

router.post('/register', function (req, res, next) {
  var { email, password } = req.body;
  if (!User.findOne({ email })) {
    req.flash('error', 'Email should be unique');
    return res.redirect('/users/register');
  }
  if (password.length < 4) {
    req.flash('error', 'Password should be of minimum 4 charachetrs');
    return res.redirect('/users/register');
  }
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    console.log(user.getFullName(user.fname, user.lname));
    res.redirect('/users/login');
  });
});

router.post('/login', function (req, res, next) {
  var { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'Email/Password required');
    res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      req.flash('error', 'Email is not registered');
      return res.redirect('/users/login');
    }
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        req.flash('error', 'Invalid Password');
        return res.redirect('/users/login');
      }
      req.session.userId = user.id;
      res.redirect('/articles');
    });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/users/login');
});

module.exports = router;

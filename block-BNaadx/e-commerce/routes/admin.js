var express = require('express');
var Admin = require('../models/Admin');
var Product = require('../models/Product');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('admin');
});

router.get('/register', function (req, res, next) {
  var error = req.flash('error')[0];
  res.render('adminRegisterForm', { error });
});

router.get('/login', function (req, res, next) {
  var error = req.flash('error')[0];
  res.render('adminLoginForm', { error });
});

router.post('/register', function (req, res, next) {
  var { email, password } = req.body;
  if (!Admin.findOne({ email })) {
    req.flash('error', 'Email should be unique');
    return res.redirect('/admin/register');
  }
  if (password.length < 4) {
    req.flash('error', 'Password should be of minimum 4 charachetrs');
    return res.redirect('/admin/register');
  }
  Admin.create(req.body, (err, admin) => {
    if (err) return next(err);
    res.redirect('/admin/login');
  });
});

router.post('/login', function (req, res, next) {
  var { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'Email/Password required');
    res.redirect('/admin/login');
  }
  Admin.findOne({ email }, (err, admin) => {
    if (err) return next(err);
    if (!admin) {
      req.flash('error', 'Email is not registered');
      return res.redirect('/admin/login');
    }
    Admin.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        req.flash('error', 'Invalid Password');
        return res.redirect('/admin/login');
      }
      req.session.adminId = admin.id;
      res.redirect('/admin');
    });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

router.get('/product', (req, res) => {
  res.render('productForm');
});

router.post('/product', (req, res) => {
  Product.create(req.body, (err, product) => {
    if (err) return next(err);
    res.redirect('/admin');
  });
});

module.exports = router;

var express = require('express');
var Product = require('../models/Product');
var router = express.Router();

router.get('/', (req, res) => {
  Product.find({}, (err, products) => {
    res.render('productList', { products: products });
  });
});

router.get('/:id', (req, res) => {
  var id = req.params.id;
  Product.findById(id, (err, product) => {
    res.render('productDetail', { product });
  });
});

module.exports = router;

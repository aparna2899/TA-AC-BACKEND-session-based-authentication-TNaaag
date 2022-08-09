var mongoose = require('mongoose');
var slugify = require('slugify');

var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: { type: String, required: true },
  quantity: Number,
  price: { type: Number, default: 0, required: true },
  slug: String,
});

var Product = mongoose.model('Product', productSchema);
module.exports = Product;

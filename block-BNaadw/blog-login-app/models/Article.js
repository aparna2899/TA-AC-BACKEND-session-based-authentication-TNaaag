var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var slugify = require('slugify');

var Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    likes: { type: Number, defualt: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: String, required: true },
    slug: { type: String },
  },
  { timestamps: true }
);

articleSchema.pre('save', function (next) {
  this.slug = slugify(this.title, {
    lower: true,
  });
  next();
});

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;

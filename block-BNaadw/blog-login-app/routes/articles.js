var express = require('express');
var Article = require('../models/Article');
var Comment = require('../models/Comment');
var router = express.Router();

//view articles list
router.get('/', (req, res, next) => {
  if (req.session.userId) {
    Article.find({}, (err, articles) => {
      if (err) return next(err);
      res.render('articleList', { articles });
    });
  } else {
    res.redirect('/users/login');
  }
});

//create new article form
router.get('/new', (req, res) => {
  if (req.session.userId) {
    res.render('articleForm');
  } else {
    res.redirect('/users/login');
  }
});

//create an article
router.post('/', (req, res, next) => {
  Article.create(req.body, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

//get article details
router.get('/:slug', (req, res) => {
  var slug = req.params.slug;
  Article.findOne({ slug })
    .populate('comments')
    .exec((err, article) => {
      if (err) return next(err);
      res.render('articleDetail', { article: article });
    });
});

//update article form
router.get('/:slug/edit', (req, res, next) => {
  var slug = req.params.slug;
  Article.findOne({ slug }, (err, article) => {
    if (err) return next(err);
    res.render('articleEditForm', { article });
  });
});

//update article
router.post('/:slug', (req, res, next) => {
  var slug = req.params.slug;
  Article.findOneAndUpdate({ slug }, req.body, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles/' + slug);
  });
});

//delete article
router.get('/:slug/delete', (req, res, next) => {
  var slug = req.params.slug;
  Article.findOneAndDelete({ slug }, (err, article) => {
    if (err) return next(err);
    Comment.deleteMany({ articleId: article.id }, (err, info) => {
      res.redirect('/articles');
    });
  });
});

//add comment
router.post('/:slug/comments', (req, res, next) => {
  var slug = req.params.slug;
  req.body.articleId = id;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    Article.findOneAndUpdate(
      { slug },
      { $push: { comments: comment._id } },
      (err, updatedArticle) => {
        res.redirect('/articles/' + id);
      }
    );
  });
});

module.exports = router;

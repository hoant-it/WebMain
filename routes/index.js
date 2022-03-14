var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('main/home', { 
    title: 'Home page',
    html:'' });
});

router.get('/about', function(req, res, next) {
  res.render('main/about', { 
    title: 'About',
    html:'' });
});

module.exports = router;

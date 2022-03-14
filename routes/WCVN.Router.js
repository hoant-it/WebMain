var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/VNWC_SDTC', function(req, res, next) {
    res.render('WCVN/WCVN_SDTC', { 
      title: 'VNWC',
      html:'' });
  });

module.exports = router;

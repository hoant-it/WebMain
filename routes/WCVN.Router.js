var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/VNWC_SDTC", function (req, res, next) {
  res.render("VNWC/WCVN_SDTC", {
    title: "VNWC",
    userId: req.signedCookies.userId,
    html: "",
  });
});

module.exports = router;

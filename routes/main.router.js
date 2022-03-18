var express = require('express');
var router = express.Router();
const mainControl = require('../Controlers/MainControl/main.control')

router.get('/', async (req,res) =>{
  res.redirect('/home');
})
/* GET home page. */
router.get('/home', mainControl.HomeLoad);
/* Login. */
router.get('/login', mainControl.LoginLoad)
router.post('/login', mainControl.LoginAjax)
/* Logout. */
router.post('/logout', mainControl.LogOut)

module.exports = router;

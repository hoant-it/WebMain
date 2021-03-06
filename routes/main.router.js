var express = require('express');
var router = express.Router();
const mainControl = require('../Controlers/Main/main.control')
const homeMiddle = require('../MiddleWares/Home/home.middle')

router.get('/', async (req,res) =>{
  res.redirect('/home');
})
/* GET home page. */
router.get('/home',homeMiddle.redirectLogin, mainControl.HomeLoad);
/* Login. */
router.get('/login',homeMiddle.redirectHome, mainControl.LoginLoad)
router.post('/login', mainControl.LoginAjax)
/* Logout. */
router.post('/logout', mainControl.LogOut)
router.get('/error',async(req,res) =>{
  res.render('error',{
    title:'Error Page',
    message: 'err',
    html:''
  })
})

//Change pass
router.get('/changepassword',mainControl.ChangePassword)
router.get('/changePasswordFirst',mainControl.ChangePassword)
router.post('/changepassword',mainControl.ChangePasswordSave)

module.exports = router;

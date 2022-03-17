var express = require('express');
var router = express.Router();
const sql = require('../databases/database')

router.get('/', async (req,res) =>{
  res.redirect('/home');
})



/* GET home page. */
router.get('/home', async(req, res, next) => {
  //test connection db
  sql.GetDataByQuery()
  .then(result =>{
    res.json(result[0])
  }) ;
  res.render('main/home', { 
    title: 'Home page',
    html:'' }
    );
  
});


router.get('/login', function(req, res, next) {
  res.render('main/login', { 
    layout:'./layouts/loginlayout',
    title: 'Login',
    messageError:'' });
});

router.post('/logout', async (req, res) =>{
  res.clearCookie("userId");
  res.clearCookie("IDAuthorization");
  res.clearCookie("UserInGroupID");
  res.redirect('/login');
})

module.exports = router;

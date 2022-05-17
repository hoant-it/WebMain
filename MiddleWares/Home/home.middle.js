module.exports.redirectLogin= (req,res,next) =>{
  if(req.signedCookies.webLoginFist === "false"){
    res.redirect("/changePasswordFirst");
  }else{
    if(!req.signedCookies.userId){
      res.redirect('/login')
    } 
        next();
  }
  }


  module.exports.redirectHome = (req,res,next) =>{
    // req.session.userID
    console.log(req.signedCookies.userId)
    if(req.signedCookies.userId){
   res.redirect('/home')
    } else{
      next();
    }
  }
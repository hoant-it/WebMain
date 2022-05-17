const sql = require("../../databases/mainDb");
var cryptoJs = require("crypto-js");


module.exports.LoginAjax = async (req, res) => {
  try {
    const { userName, password } = req.body;
  let dataUserA = await sql.sp_Wacoal_Web_ListUserGetRole(userName.toUpperCase())
 
  if (dataUserA.length < 1) {
    res.render("main/login", {
      layout: "./layouts/loginlayout",
      title: "Login",
      messageError: "User name không tồn tại",
    });
  }
  let webPass = dataUserA[0].WebPass.toString();
  let iDAuthorization = dataUserA[0].IDAuthorization;
  let userInGroupID = dataUserA[0].UserInGroupID;
  let webLoginFist=dataUserA[0].WebLoginFrist

  let bytes = cryptoJs.AES.decrypt(webPass, "itsasecret123");
  let message_decode = bytes.toString(cryptoJs.enc.Utf8);
  // var bytes2= cryptoJs.AES.decrypt()
  if (message_decode === password) {
    res.cookie("userId", userName, { signed: true });
    res.cookie("IDAuthorization", iDAuthorization, { signed: true });
    res.cookie("UserInGroupID", userInGroupID, { signed: true });
    res.cookie("webLoginFist", webLoginFist, { signed: true });
    res.redirect("/home");
  } else {
    res.render("main/login", {
      layout: "./layouts/loginlayout",
      title: "Login",
      messageError: "Password không đúng",
    });
  }
    
  } catch (error) {
    res.render("main/login", {
      layout: "./layouts/loginlayout",
      title: "Login",
      messageError: error,
    });
  }
  
};

module.exports.LoginLoad = async (req, res) => {
  res.render("main/login", {
    layout: "./layouts/loginlayout",
    title: "Login",
    messageError: "",
  });
};

module.exports.LogOut = async (req, res) => {
  res.clearCookie("userId");
  res.clearCookie("IDAuthorization");
  res.clearCookie("UserInGroupID");
  res.redirect("/login");
};

//home load
result=[];
function data_Tree(arr,parent_id="0", level=0){
arr.forEach(element => {
  if(element["parent_id"]=== parent_id){
    element["level"]=level;
    if(element["href"]===""){
      if(level===0){
        html+=`<li class="active"><a> ${element["title"]} <span class="fa fa-chevron-down"></span></a>`;
        html+=`<ul class="nav child_menu" style="display:block">`;
      }
      else {
        html+=`<li><a> ${element["title"]} <span class="fa fa-chevron-down"></span></a>`;
        html+=`<ul class="nav child_menu">`;
      }
   
    result.push(element);
    child=data_Tree(arr,element["id"],level + 1);
      result.concat(child);
      html+=`</ul>`
    html+=`</li>`
    }
    else{
      html+=`<li><a href="${element["href"]}"> ${element["title"]}</a>`;
      // html+=`<li><a href=""> ${element["title"]}</a>`;
    result.push(element);
    child=data_Tree(arr,element["id"],level + 1);
      result.concat(child);
    html+=`</li>`
    }
  }
});
return result;
}


module.exports.HomeLoad = async (req, res, next) => {
  try {
    html="";
    html=`<ul class="nav side-menu" id="side-menu">`;
   await sql.sp_Wacoal_LoadMenuWeb_V1(req.signedCookies.IDAuthorization,req.signedCookies.UserInGroupID).then(result=>{
    //  console.log(result);
      list_cat=data_Tree(result,"0");
      html+=`</ul>`
    })
   res.render('main/home',{
     title:'Việt Nam Wacoal',
     userId:req.signedCookies.userId,
     html:html,
   })
  } catch (error) {
    res.render('error',{
      title:'Error Page',
      message: 'err' +error,
      html:'',
    });
  }

};

module.exports.ChangePassword= async(req,res)=>{
    res.render('main/changePassword',{
      title:'Express',
      userId:req.signedCookies.userId,
      html:''
    });
}
module.exports.changePasswordFirst= async(req,res)=>{
  res.render('main/changePassword',{
    title:'changePasswordFirst',
    userId:req.signedCookies.userId,
    html:''
  });
}

module.exports.ChangePasswordSave=async(req,res)=>{
  messErr='';
  try {
     //  const passwordRegex=new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
     let passwordweb='';
    //  console.log(req.body);
     const{UserId,Currentpassword,Newpassword,ConfirmPassword}=req.body;
     passwordweb= await sql.ListUser_WebPassGet_web_V1(UserId)
     let bytes = cryptoJs.AES.decrypt(passwordweb, "itsasecret123");
     let message_decode = bytes.toString(cryptoJs.enc.Utf8);
     if(message_decode!==Currentpassword){
         messErr='Error: Mật khẩu hiện tại không đúng!';
         res.send(messErr);
     }else{
       if(Newpassword!==ConfirmPassword){
         messErr='Error: Mật khẩu mới và xác nhận không trùng khớp';
         res.send(messErr);
       } 
       // else if(passwordRegex.test(Newpassword)===false){
       //   messErr='Error: Mật khẩu mới phải có tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số ';
       //   res.send(messErr);
       // }
        else{
         // Mã hóa
         var message = cryptoJs.AES.encrypt(Newpassword, 'itsasecret123').toString()
        //  console.log(message);
        await sql.ListUser_WebPassUpdate_web_V1(UserId,message)
        messErr="ok"
        res.send(messErr);
       }
     }
  } catch (error) {
    messErr='Lỗi: '+error
    res.send(messErr);
  }
}
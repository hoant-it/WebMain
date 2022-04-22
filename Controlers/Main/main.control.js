const sql = require("../../databases/mainDb");
var cryptoJs = require("crypto-js");

module.exports.LoginAjax = async (req, res) => {
  const { userName, password } = req.body;
  let dataUserA = [];
   await sql.sp_Wacoal_Web_ListUserGetRole(userName.toUpperCase()).then(resuslt =>{
    dataUserA=resuslt;
  }).catch(error =>{
    res.render("main/login", {
      layout: "./layouts/loginlayout",
      title: "Login",
      messageError: error.message,
    });
  })
 
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

  let bytes = cryptoJs.AES.decrypt(webPass, "itsasecret123");
  let message_decode = bytes.toString(cryptoJs.enc.Utf8);
  // var bytes2= cryptoJs.AES.decrypt()
  if (message_decode === password) {
    res.cookie("userId", userName, { signed: true });
    res.cookie("IDAuthorization", iDAuthorization, { signed: true });
    res.cookie("UserInGroupID", userInGroupID, { signed: true });
    res.redirect("/home");
  } else {
    res.render("main/login", {
      layout: "./layouts/loginlayout",
      title: "Login",
      messageError: "Password không đúng",
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
     console.log(result);
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

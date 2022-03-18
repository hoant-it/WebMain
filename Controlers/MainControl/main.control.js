const sql = require("../../databases/loginDb");
var cryptoJs = require("crypto-js");

module.exports.LoginAjax = async (req, res) => {
  const { userName, password } = req.body;
  let dataUserA = [];
  dataUserA = await sql.sp_Wacoal_Web_ListUserGetRole(userName.toUpperCase());
  if (dataUserA.length < 1) {
    res.render("main/login", {
      messageError: "User name không tồn tại",
    });
  }
  let webPass = dataUserA[0].WebPass;
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

module.exports.HomeLoad = async (req, res, next) => {
  res.render("main/home", {
    title: "Home page",
    html: "",
  });
};

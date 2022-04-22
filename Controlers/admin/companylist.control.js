const db= require('../../databases/admin/company.db')


module.exports.CompanyListLoad = async (req, res) => {
    res.render("admin/CompanyList", {
      title: "Company",
      userId: req.signedCookies.userId,
      html: "",
      // script:'<script src="/javascripts/kho/Orderjs.js"></script>'
    });
  };

  module.exports.ListCompany_Load_Web_V1 = async(req,res) =>{
      try {
        let result = await db.ListCompany_Load_Web_V1()
        res.json({
            data:result
        })
          
      } catch (error) {
          throw error
      }
  

  } 

  module.exports.CompanySavetodatabase = async (req, res) => {
    var mes = "";
    // console.log(req.body);
    try {
      mes = await db.CompanySavetodatabase(req.body);
    } catch (error) {
      mes = "Lỗi";
    }
    res.send(mes);
  };

  module.exports.CompanyListPostDelete = async (req, res) => {
    // const{CompanyCode}=req.body;
    var send = {};
    try {
      send = await db.CompanyDeleteData(req.body);
    } catch (error) {
      send.mes = 'Lỗi: '+error
    }
    res.send(send);
  };


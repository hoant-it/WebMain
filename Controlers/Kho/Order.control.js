
const db = require("../../databases/kho/orderdb");
const readXlsxFile = require("read-excel-file/node");
const sql = require("mssql");
const sqlConfig = require("../../databases/dbconfig");

module.exports.OrderLoad = async (req, res) => {
  res.render("kho/Order", {
    title: "Order",
    userId: req.signedCookies.userId,
    html: "",
    // script:'<script src="/javascripts/kho/Orderjs.js"></script>'
  });
};

module.exports.DONHANGITEM_3_MY_SearchBox_Web_V1 = async (req, res) => {
  try {
    await db.DONHANGITEM_3_MY_SearchBox_Web_V1().then((result) => {
      res.json({
        data: result,
      });
    });
  } catch (error) {
    res.json({
      data: {},
      message: `Query Failed. Error: ${error}`,
    });
  }
};

module.exports.DONHANGITEM_3_Load_Web_V1 = async(req,res) =>{
    const{MY}=req.params
    try {
        await db.DONHANGITEM_3_Load_Web_V1(MY).then(result =>{
            res.json({
                data:result
            })
        })
    } catch (error) {
        res.json({
            data:{},
            message:error
        })
        
    }
}


module.exports.OrderInserByType =async(req,res) =>{
  let lError={}
  try {
   await db.OrderInsertByType(req.file.filename, req.signedCookies.userId)
   .then(result=>{
   res.send(result)
   })
    
  } catch (error) {
    lError.errMes = "Lỗi: " + error;
    lError.statusErr = false;
    res.send(lError)
  }
}
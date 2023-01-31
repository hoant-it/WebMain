const db = require("../../databases/kho/XuatNhapKho.Db");
const xlsx = require("xlsx");
const del = require("del");

module.exports.XuatNhapKhoLoad = async (req, res) => {
    res.render("kho/XuatNhapKho", {
      title: "XuatNhapKho",
      userId: req.signedCookies.userId,
      html: "",
    });
  };


  module.exports.LOAICHIITEM_Load_Web_Wacoal_V1= async(req,res)=>{
    
    try {
      result= await db.LOAICHIITEM_Load_Web_Wacoal_V1()
      res.status(200).json({
       data:result
      })
    } catch (error) {
      res.status(403).json({
        data:[]
       })
    }
 
  }

  module.exports.MAUCHIMAUNL_Load_MAUCHI_By_LOAICHI_Web_wacoal_V1= async(req,res)=>{
    
    try {
      result= await db.MAUCHIMAUNL_Load_MAUCHI_By_LOAICHI_Web_wacoal_V1(req.params)
      res.status(200).json({
       data:result
      })
    } catch (error) {
      res.status(403).json({
        data:[]
       })
    }
 
  }

  module.exports.KHOCHITON_Insert_Web_Wacoal_V1=async(req,res)=>{
    let lMes={}
    try {
     await db.KHOCHITON_Insert_Web_Wacoal_V1(req.body,req.signedCookies.userId)
     lMes.status=true;
     lMes.mes="thành công"
    
      
    } catch (error) {
      lMes.status=false;
     lMes.mes="Err: "+error
    }
    res.send(lMes)
  }
const sql = require("mssql");
const sqlConfig = require("../dbconfig");
const xlsx = require("xlsx");
const del = require("del");

module.exports.LOAICHIITEM_Load_Web_Wacoal_V1 = async () => {
    try {
      let pool = await sql.connect(sqlConfig);
      let res = await pool
        .request()
        //   .input("UserName", sql.NVarChar, userName)
        // .input('aaa', sql.NVarChar, userName)
        .execute("LOAICHIITEM_Load_Web_Wacoal_V1");
      // console.log(res.recordset);
      return res.recordset;
    } catch (error) {
      // return error
      console.log("error" + error);
    }
  };

  module.exports.MAUCHIMAUNL_Load_MAUCHI_By_LOAICHI_Web_wacoal_V1 = async (params) => {
    let pool = await sql.connect(sqlConfig);
    try {
     
      let res = await pool
        .request()
          .input("LOAICHI", sql.NVarChar, params.LOAICHI)
        // .input('aaa', sql.NVarChar, userName)
        .execute("MAUCHIMAUNL_Load_MAUCHI_By_LOAICHI_Web_wacoal_V1");
      // console.log(res.recordset);
      return res.recordset;
    } catch (error) {
      // return error
      console.log("error" + error);
    }
  };

  module.exports.KHOCHITON_Insert_Web_Wacoal_V1 = async(body,userName)=>{
    const {loaiChi,mauChi,slNhap,slXuat}=body
    let pool = await sql.connect(sqlConfig);
    try {
      await pool
      .request()
      .input("LOAICHI",sql.NVarChar(50),loaiChi)
      .input("MAUCHI",sql.NVarChar(50),mauChi)
      .input("SLCUONNHAP",sql.Int,slNhap)
      .input("SLCUONXUAT",sql.Int,slXuat)
      .input("UserName",sql.NVarChar(50),userName)
      .execute('KHOCHITON_Insert_Web_Wacoal_V1')
      
    } catch (error) {
      throw(error)
    }
  }

  
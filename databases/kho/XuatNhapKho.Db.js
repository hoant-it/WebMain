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

  module.exports.KHOCHITON_Insert_Web_Wacoal_V2 = async(body,userName)=>{
    const {loaiChi,mauChi,slNhap,slXuat,maHang}=body
    let pool = await sql.connect(sqlConfig);
    try {
      await pool
      .request()
      .input("LOAICHI",sql.NVarChar(50),loaiChi)
      .input("MAUCHI",sql.NVarChar(50),mauChi)
      .input("SLCUONNHAP",sql.Int,slNhap)
      .input("SLCUONXUAT",sql.Int,slXuat)
      .input("UserName",sql.NVarChar(50),userName)
      .input("MAHANG",sql.NVarChar(50),maHang)
      .execute('KHOCHITON_Insert_Web_Wacoal_V2')
      
    } catch (error) {
      throw(error)
    }
  }


  module.exports.KHOCHITON_Load_Web_Wacoal_V1 = async () => {
    try {
      let pool = await sql.connect(sqlConfig);
      let res = await pool
        .request()
        //   .input("UserName", sql.NVarChar, userName)
        // .input('aaa', sql.NVarChar, userName)
        .execute("KHOCHITON_Load_Web_Wacoal_V1");
      // console.log(res.recordset);
      return res.recordset;
    } catch (error) {
      // return error
      console.log("error" + error);
    }
  };

  module.exports.CONGDOAN_MAHANG_LOAICHI_load_By_MAHANG_web_wacoal_v1 = async (params) => {
    try {
      let pool = await sql.connect(sqlConfig);
      let res = await pool
        .request()
          .input("MAHANG", sql.NVarChar(50), params.MAHANG)
        // .input('aaa', sql.NVarChar, userName)
        .execute("CONGDOAN_MAHANG_LOAICHI_load_By_MAHANG_web_wacoal_v1");
      // console.log(res.recordset);
      return res.recordset;
    } catch (error) {
      // return error
      console.log("error" + error);
    }
  };

  module.exports.CONGDOAN_MAHANG_MAMAUCHI_Load_By_MAHANG_LOAICHI_web_wacoal_v1 = async (params) => {
    try {
      let pool = await sql.connect(sqlConfig);
      let res = await pool
        .request()
          .input("MAHANG", sql.NVarChar(50), params.MAHANG)
          .input("LOAICHI", sql.NVarChar(50), params.LOAICHI)
        .execute("CONGDOAN_MAHANG_MAMAUCHI_Load_By_MAHANG_LOAICHI_web_wacoal_v1");
      // console.log(res.recordset);
      return res.recordset;
    } catch (error) {
      // return error
      console.log("error" + error);
    }
  };

  


  
  
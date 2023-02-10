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

  // module.exports.KHOCHITON_Insert_Web_Wacoal_V1 = async(body,userName)=>{
  //   const {loaiChi,mauChi,slNhap,slXuat}=body
  //   let pool = await sql.connect(sqlConfig);
  //   try {
  //     await pool
  //     .request()
  //     .input("LOAICHI",sql.NVarChar(50),loaiChi)
  //     .input("MAUCHI",sql.NVarChar(50),mauChi)
  //     .input("SLCUONNHAP",sql.Int,slNhap)
  //     .input("SLCUONXUAT",sql.Int,slXuat)
  //     .input("UserName",sql.NVarChar(50),userName)
  //     .execute('KHOCHITON_Insert_Web_Wacoal_V1')
      
  //   } catch (error) {
  //     throw(error)
  //   }
  // }

  // module.exports.KHOCHITON_Insert_Web_Wacoal_V2 = async(body,userName)=>{
  //   const {loaiChi,mauChi,slNhap,slXuat,maHang}=body
  //   let pool = await sql.connect(sqlConfig);
  //   try {
  //     await pool
  //     .request()
  //     .input("LOAICHI",sql.NVarChar(50),loaiChi)
  //     .input("MAUCHI",sql.NVarChar(50),mauChi)
  //     .input("SLCUONNHAP",sql.Int,slNhap)
  //     .input("SLCUONXUAT",sql.Int,slXuat)
  //     .input("UserName",sql.NVarChar(50),userName)
  //     .input("MAHANG",sql.NVarChar(50),maHang)
  //     .execute('KHOCHITON_Insert_Web_Wacoal_V2')
      
  //   } catch (error) {
  //     throw(error)
  //   }
  // }

  module.exports.KHOCHITON_Insert_Web_Wacoal_V3 = async(body,userName)=>{
    const {loaiChi,mauChi,slNhap,slXuat,maHang,slNhapMet,slXuatMet}=body
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
      .input("SLMETNHAP",sql.Numeric(18,3),slNhapMet)
      .input("SLMETXUAT",sql.Numeric(18,3),slXuatMet)
      .execute('KHOCHITON_Insert_Web_Wacoal_V3')
      
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

  module.exports.KHOCHITON_Load_Web_Wacoal_V2 = async () => {
    try {
      let pool = await sql.connect(sqlConfig);
      let res = await pool
        .request()
        //   .input("UserName", sql.NVarChar, userName)
        // .input('aaa', sql.NVarChar, userName)
        .execute("KHOCHITON_Load_Web_Wacoal_V2");
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


  module.exports.KHOCHITON_LichSuNhap_web_wacoal_v1 = async () => {
    try {
      let pool = await sql.connect(sqlConfig);
      let res = await pool
        .request()
        .execute("KHOCHITON_LichSuNhap_web_wacoal_v1");
      // console.log(res.recordset);
      return res.recordset;
    } catch (error) {
      // return error
      console.log("error" + error);
    }
  };

  module.exports.KHOCHITON_LichSuXuat_web_wacoal_v1 = async () => {
    try {
      let pool = await sql.connect(sqlConfig);
      let res = await pool
        .request()
        .execute("KHOCHITON_LichSuXuat_web_wacoal_v1");
      // console.log(res.recordset);
      return res.recordset;
    } catch (error) {
      // return error
      console.log("error" + error);
    }
  };


  // module.exports.DONHANGITEM_DRAFT_Insert_Web_V1 = async (content, userName) => {
  //   try {
  //     const {
  //       Classification,
  //       MY,
  //       OrderNo,
  //       UnitNo,
  //       Style,
  //       Cup,
  //       Size,
  //       Color,
  //       OrderQty,
  //       Note,
  //     } = content;
  
  //     let pool = await sql.connect(sqlConfig);
  //     await pool
  //       .request()
  //       .input("Classification", sql.NVarChar(50), Classification)
  //       .input("MY", sql.NVarChar(10), MY.toString())
  //       .input("OrderNo", sql.NVarChar(50), OrderNo)
  //       .input("UnitNo", sql.NVarChar(50), UnitNo)
  //       .input("Style", sql.NVarChar(50), Style)
  //       .input("Cup", sql.NVarChar(50), Cup)
  //       .input("Size", sql.NVarChar(50), Size.toString())
  //       .input("Color", sql.NVarChar(50), Color)
  //       .input("OrderQty", sql.Int, OrderQty)
  //       .input("Note", sql.NVarChar(50), Note)
  //       .input("UserName", sql.NVarChar(50), userName)
  //       .execute("DONHANGITEM_DRAFT_Insert_Web_V1");
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  


  


  
  
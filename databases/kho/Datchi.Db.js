const sql = require("mssql");
const sqlConfig = require("../dbconfig");

module.exports.wacoal_MaHang_Select_V1 = async () => {
    try {
      let pool = await sql.connect(sqlConfig);
      let res = await pool
        .request()
        .execute("wacoal_MaHang_Select_V1");
      return res.recordset;
    } catch (error) {
      throw error
    }
  };

  module.exports.wacoal_Datchi_MauMH_Load_Web_V1 = async (maHang) => {
    try {
      let pool = await sql.connect(sqlConfig);
      let res = await pool
        .request()
        .input("MAHANG",maHang )
        .execute("wacoal_Datchi_MauMH_Load_Web_V1");
      return res.recordset;
    } catch (error) {
      throw error
    }
  };


  module.exports.wacoal_CHUYEN_Load_Web_V1 = async (maHang) => {
    try {
      let pool = await sql.connect(sqlConfig);
      let res = await pool
        .request()
        .execute("wacoal_CHUYEN_Load_Web_V1");
      return res.recordset;
    } catch (error) {
      throw error
    }
  };

  module.exports.wacoal_DatChi_MH_Mau_SL_Web_V1 = async (MAHANG,MAUMH,Qty) => {
    try {
      let pool = await sql.connect(sqlConfig);
      let res = await pool
        .request()
        .input("MAHANG",MAHANG)
        .input("MAUMH",MAUMH)
        .input("Qty",Qty)
        .execute("wacoal_DatChi_MH_Mau_SL_Web_V1");
      return res.recordset;
    } catch (error) {
      throw error
    }
  };


  module.exports.wacoal_TinhChi_MaHang_Mau_SL_V1 = async (MAHANG,MAUMH,Qty) => {
    try {
      let pool = await sql.connect(sqlConfig);
      let res = await pool
        .request()
        .input("MAHANG",sql.NVarChar(50),MAHANG)
        .input("MAUMH",sql.NVarChar(50),MAUMH)
        .input("Qty",sql.Int,Qty)
        .execute("wacoal_TinhChi_MaHang_Mau_SL_V1");
      return res.recordset;
    } catch (error) {
      throw error
    }
  };



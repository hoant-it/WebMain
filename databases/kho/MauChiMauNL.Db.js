const sql=require("mssql")
const sqlconfig= require('../dbconfig')

module.exports.wacoal_MAUCHIMAUNL_Load_Web_V1= async()=>{
    try {
        let pool= await sql.connect(sqlconfig)
        let result= await pool.request()
        .execute('wacoal_MAUCHIMAUNL_Load_Web_V1')
        return result.recordset
        
    } catch (error) {
        throw error
    }
}

module.exports.wacoal_MAUCHIMAUNL_Import_excel_Web_V1=async(MAUNL,LOAICHI,MAUCHI,UserName)=>{
    try {
        let pool= await sql.connect(sqlconfig)
         await pool.request()
        .input('MAUNL',sql.NVarChar(50),MAUNL)
        .input('LOAICHI',sql.NVarChar(50),LOAICHI)
        .input('MAUCHI',sql.NVarChar(50),MAUCHI.toString())
        .input('UserName',sql.NVarChar(50),UserName)
        .execute('wacoal_MAUCHIMAUNL_Import_excel_Web_V1')
    } catch (error) {
        throw error
    }
}

module.exports.MauChiMauNLUpdate = async (body, userName) => {
  const { mauNL, loaiChi, mauChi, status } = body;
  try {
    let pool = await sql.connect(sqlconfig);
    if (status === "submitInsert") {
      await pool
        .request()
        .input("MAUNL", sql.NVarChar(50), mauNL)
        .input("LOAICHI", sql.NVarChar(50), loaiChi)
        .input("MAUCHI", sql.NVarChar(50), mauChi.toString())
        .input("UserName", sql.NVarChar(50), userName)
        .execute("wacoal_MAUCHIMAUNL_Insert_Web_V1");
    }
    if(status==="submitEdit"){
        await pool
        .request()
        .input("MAUNL", sql.NVarChar(50), mauNL)
        .input("LOAICHI", sql.NVarChar(50), loaiChi)
        .input("MAUCHI", sql.NVarChar(50), mauChi)
        .input("UserName", sql.NVarChar(50), userName)
        .execute("wacoal_MAUCHIMAUNL_Update_Web_V1");
    }
  } catch (error) {
    throw error
  }
};

module.exports.wacoal_LOAICHIITEM_Load_V1=async()=>{
    try {
        let pool=await sql.connect(sqlconfig)
        let result= await pool.request()
        .execute('wacoal_LOAICHIITEM_Load_V1')
        return result.recordset
        
    } catch (error) {
        throw error
    }
}

module.exports.MAUCHIMAUNL_Delete_Web_V1=async(body)=>{
    try {
        const{mauNl,LoaiChi}=body
        let pool=await sql.connect(sqlconfig)
        await pool.request()
        .input('MAUNL',sql.NVarChar(50),mauNl)
        .input('LOAICHI',sql.NVarChar(50),LoaiChi)
        .execute('MAUCHIMAUNL_Delete_Web_V1')
        
    } catch (error) {
        throw error
    }
  

}
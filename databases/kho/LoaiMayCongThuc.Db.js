const sql=require("mssql")
const sqlconfig= require('../dbconfig')

module.exports.wacoal_LOAIMAYCT_Load_Web_V1= async()=>{
    try {
        let pool= await sql.connect(sqlconfig)
        let result= await pool.request()
        .execute('wacoal_LOAIMAYCT_Load_Web_V1')
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

module.exports.LOAIMAYCTUpdate = async (body, userName) => {
  const { MAMAY, KYHIEUMAY, LOAIMAY,VITRICHI,HESOALPHA,HESOBETA,CONGTHUCTINHCHI,NOTE, status } = body;
  try {
    let pool = await sql.connect(sqlconfig);
    if (status === "submitInsert") {
      await pool
        .request()
        .input("MAMAY", sql.NVarChar(5), MAMAY)
        .input("KYHIEUMAY", sql.NVarChar(sql.MAX), KYHIEUMAY)
        .input("LOAIMAY", sql.NVarChar(100), LOAIMAY)
        .input("VITRICHI", sql.NVarChar(20), VITRICHI)
        .input("HESOALPHA", sql.Numeric(9,3), HESOALPHA)
        .input("HESOBETA", sql.Numeric(9,3), HESOBETA)
        .input("CONGTHUCTINHCHI", sql.NVarChar(500), CONGTHUCTINHCHI)
        .input("NOTE", sql.NVarChar(500), NOTE)
        .input("UserName", sql.NVarChar(50), userName)
        .execute("wacoal_LOAIMAYCT_Insert_Web_V1");
    }
    if(status==="submitEdit"){
        await pool
        .request()
        .input("MAMAY", sql.NVarChar(5), MAMAY)
        .input("KYHIEUMAY", sql.NVarChar(sql.MAX), KYHIEUMAY)
        .input("LOAIMAY", sql.NVarChar(100), LOAIMAY)
        .input("VITRICHI", sql.NVarChar(20), VITRICHI)
        .input("HESOALPHA", sql.Numeric(9,3), HESOALPHA)
        .input("HESOBETA", sql.Numeric(9,3), HESOBETA)
        .input("CONGTHUCTINHCHI", sql.NVarChar(500), CONGTHUCTINHCHI)
        .input("NOTE", sql.NVarChar(500), NOTE)
        .input("UserName", sql.NVarChar(50), userName)
        .execute("wacoal_LOAIMAYCT_Update_Web_V1");
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

module.exports.wacoal_LOAIMAYCT_Delete_Web_V1=async(body,userName)=>{
    try {
        const{MAMAY}=body
        let pool=await sql.connect(sqlconfig)
        await pool.request()
        .input('MAMAY',sql.NVarChar(5),MAMAY)
        .input('UserName',sql.NVarChar(50),userName)
        .execute('wacoal_LOAIMAYCT_Delete_Web_V1')
        
    } catch (error) {
        throw error
    }
  

}
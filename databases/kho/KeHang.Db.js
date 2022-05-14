const sql = require("mssql");
const sqlConfig = require("../dbconfig");


module.exports.wacoal_KEHANG_Load_By_Id_Web_V1=async(ID)=>{
    try {
        let pool=await sql.connect(sqlConfig)
        let result=await pool.request()
        .input('ID',sql.BigInt,ID)
        .execute('wacoal_KEHANG_Load_By_Id_Web_V1')
        return result.recordset
    } catch (error) {
        throw error
    }
  
}

module.exports.wacoal_KEHANG_Web_Load_V1=async()=>{
    try {
        let pool=await sql.connect(sqlConfig)
        let result=await pool.request()
        .execute('wacoal_KEHANG_Web_Load_V1')
        return result.recordset
    } catch (error) {
        throw error
    }
}

module.exports.wacoal_KHONL_Web_Load_V1= async(params) =>{
    try {
       const{SHEFTID}=params
       let pool=await sql.connect(sqlConfig)
       let result=await pool.request()
       .input('SHEFTID',sql.BigInt,SHEFTID)
       .execute('wacoal_KHONL_Web_Load_V1')
       return result.recordset
    } catch (error) {
      throw error
    }
   }

   module.exports.SaveKeHangToDatabase=async(body,userName)=>{
       try {
        const{btnSave,keHang,txtNL,txtOrder,txtColor,txtQty,txtUnit,txtQtyTon,txtQtyXuat,khoId}=body 
        let pool=await sql.connect(sqlConfig)
        if(btnSave=='submitInsert'){
            await pool.request()
            .input('SHEFTID',sql.BigInt,keHang)
            .input('MATERIAL',sql.NVarChar(50),txtNL)
            .input('ORDERNO',sql.NVarChar(50),txtOrder)
            .input('COLOR',sql.NVarChar(50),txtColor)
            .input('QUANTITY',sql.Numeric(9,3),txtQty)
            .input('UNIT',sql.NVarChar(50),txtUnit)
            .input('UserName',sql.NVarChar(50),userName)
            .execute('wacoal_KeHang_Insert_web_v1')
        }
        if(btnSave=='submitEdit'){
            await pool.request()
            .input('KHONLID',sql.BigInt,khoId)
            .input('QUANTITYXUAT',sql.Numeric(9,3),txtQtyXuat)
            .input('UserName',sql.NVarChar(50),userName)
            .execute('wacoal_KHONLXUAT_Insert_Web_V1')
        }
       } catch (error) {
           throw error
       }

   }

   module.exports.wacoal_KHONLXUAT_Load_By_KHONLID_web_V1= async(params) =>{
    try {
       const{KHONLID}=params
       let pool=await sql.connect(sqlConfig)
       let result=await pool.request()
       .input('KHONLID',sql.BigInt,KHONLID)
       .execute('wacoal_KHONLXUAT_Load_By_KHONLID_web_V1')
       return result.recordset
    } catch (error) {
      throw error
    }
   }
const sql=require('mssql')
const sqlconfig= require('../dbconfig')


module.exports.wacoal_ListMenu_Load_website_v1= async()=>{
    try {
        let pool= await sql.connect(sqlconfig);
        let result= await pool.request()
        .execute('wacoal_ListMenu_Load_website_v1')
        return result.recordset
    } catch (error) {
        throw error
    }
}

module.exports.sp_CNY_Menu_CreateMenuCode= async()=>{
    try {
        let pool = await sql.connect(sqlconfig)
        let result=await pool.request()
        .execute('sp_CNY_Menu_CreateMenuCode')
        return result.recordset
    } catch (error) {
        throw error
    }
}

module.exports.saveToDatabase= async(body)=>{
    try {
        const {MenuCode,FormName,FormCode,ProjectCode,ShowCode,SystemName,Status}=body;
        let pool = await sql.connect(sqlconfig)
        if(Status === "submitInsert"){
         
            let result=await pool.request()
            .input('MenuCode',sql.NVarChar(10),MenuCode)
            .input('FormName',sql.NVarChar(100),FormName)
            .input('FormCode',sql.NVarChar(50),FormCode)
            .input('ProjectCode', sql.NVarChar(50), ProjectCode)
            .input('ShowCode',sql.NVarChar(10),ShowCode)
            .input('SystemName',sql.NVarChar(100),SystemName)
            .execute('wacoal_ListMenu_Insert_Wesite_v1')
            return result.rowsAffected
        }
        if(Status === "submitEdit"){
            let result=await pool.request()
            .input('MenuCode',sql.NVarChar(10),MenuCode)
            .input('FormName',sql.NVarChar(100),FormName)
            .input('FormCode',sql.NVarChar(50),FormCode)
            .input('ProjectCode', sql.NVarChar(50), ProjectCode)
            .input('ShowCode',sql.NVarChar(10),ShowCode)
            .input('SystemName',sql.NVarChar(100),SystemName)
            .execute('wacoal_ListMenu_Update_Web_V1')
            return result.rowsAffected
        }
        
    } catch (error) {
     throw error
    }
}

module.exports.MenuListDelete= async(body)=>{
    try {
        const{Name}=body;
        let pool= await sql.connect(sqlconfig)
        let result= await pool.request()
        .input('MenuCode',sql.VarChar(10),Name)
        .execute('wacoal_ListMenu_Delete_WebSite_v1')
        return result.rowsAffected
        
    } catch (error) {
        throw error
    }
}
const sql=require('mssql');
const sqlconfig= require('../dbconfig')

module.exports.wacoal_GetUserList_Web_V1=async()=>{
    try {
        let pool= await sql.connect(sqlconfig);
        let result= await pool.request()
        .execute('wacoal_GetUserList_Web_V1')
        return result.recordset
        
    } catch (error) {
        throw error
    }
}

module.exports.ListDepartment_Load_Web_V1=async()=>{
    try {
        let pool= await sql.connect(sqlconfig);
        let result= await pool.request()
        .execute('ListDepartment_Load_Web_V1')
        return result.recordset
        
    } catch (error) {
        throw error
    }

}

module.exports.UserListSavetoDatabase =async(body,userName)=>{
    try {
        const {Name,FullName,Email,PositionName,DepartmentCode,Status,PositionCode}=body;
        let pool= await sql.connect(sqlconfig);
        if(Status==="submitInsert"){
            let result= await pool.request()
            .input('UserName',sql.NVarChar(50),Name)
            .input('FullName',sql.NVarChar(50),FullName)
            .input('Email',sql.NVarChar(50),Email)
            .input('PositionsCode',sql.NVarChar(50),PositionCode)
            .input('DepartmentCode',sql.NVarChar(50),DepartmentCode)
            .input('UserCreate',sql.NVarChar(50),userName)
            .execute('wacoal_ListUser_Insert')
            return result.rowsAffected
        }
        if(Status==="submitEdit"){
            let result= await pool.request()
            .input('UserName',sql.NVarChar(50),Name)
            .input('FullName',sql.NVarChar(50),FullName)
            .input('Email',sql.NVarChar(50),Email)
            .input('PositionsCode',sql.NVarChar(50),PositionCode)
            .input('DepartmentCode',sql.NVarChar(50),DepartmentCode)
            .input('UpdateBy',sql.NVarChar(50),userName)
            .execute('wacoal_ListUser_Update_Web_V1')
            return result.rowsAffected
        }
    } catch (error) {
        throw error
    }
}

module.exports.deleteData=async(body)=>{
    try {
        const{Name}=body
        let pool= await sql.connect(sqlconfig);
        let result=await pool.request()
        .input('UserName',sql.NVarChar(20),Name)
        .execute('wacoal_ListUser_Delete_Web_V1')
        return result.rowsAffected
        
    } catch (error) {
        throw error
    }
}

module.exports.resetPass=async(body)=>{
    try {
        const{Name}=body
        let pool= await sql.connect(sqlconfig);
        let result=await pool.request()
        .input('UserName',sql.NVarChar(20),Name)
        .execute('wacoal_Web_Password_Refresh_Defaut')
        return result.rowsAffected
        
    } catch (error) {
        throw error
    }
}
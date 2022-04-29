const sql=require('mssql')
const sqlconfig= require('../dbconfig')


module.exports.wacoal_ListUserGroup_Load_Web_V2=async()=>{
    try {
        let pool= await sql.connect(sqlconfig)
        let result= await pool.request()
        .execute('wacoal_ListUserGroup_Load_Web_V2')
        return result.recordset
        
    } catch (error) {
        throw error
    }

}

module.exports.RolePermissionDelete=async(body)=>{
    try {
        const{RoleId}=body;
        let pool=await sql.connect(sqlconfig)
        let result= await pool.request()
        .input('GroupUserCode',sql.VarChar(10),RoleId)
        .execute('Role_Delete_Web_V1')
        return result.rowsAffected[3]>0
    } catch (error) {
       throw error
    }
}

module.exports.RolePermissionUpdate=async(body)=>{
    try {
        const{RoleId,RoleName,Status}=body;
        if(Status==='submitInsert'){
            let pool=await sql.connect(sqlconfig)
            let result= await pool.request()
            .input('GroupUserCode',sql.VarChar(10),RoleId)
            .input('GroupUserDescription',sql.NVarChar(200),RoleName)
            .execute('wacoal_ListUserGroup_Insert_Web_V1')
            return result.rowsAffected[0]>0
        }
        if(Status==='submitUpdate'){
            let pool=await sql.connect(sqlconfig)
            let result= await pool.request()
            .input('GroupUserCode',sql.VarChar(10),RoleId)
            .input('GroupUserDescription',sql.NVarChar(200),RoleName)
            .execute('wacoal_ListUserGroup_Update_Web_V1')
            return result.rowsAffected[0]>0
        }

    } catch (error) {
        throw error
    }
}


module.exports.RuleInRoleLoad=async(params)=>{
    try {
        const{roleCode}=params;
        let pool=await sql.connect(sqlconfig)
        let result= await pool.request()
        .input('GroupUserCode',sql.VarChar(10),roleCode)
        .execute('wacoal_Rule_In_Role_Load_Web_V1')
        return result.recordset
    } catch (error) {
        throw error
    }
}

module.exports.ListPermisionGroupLoad=async(params)=>{
   try {
    const{roleCode}=params;
    let pool=await sql.connect(sqlconfig)
    let result= await pool.request()
    .input('GroupUserCode',sql.VarChar(10),roleCode)
    .execute('wacoal_ListPermisionGroup_Load_web_V1')
    return result.recordset

   } catch (error) {
       throw error
   } 
}

module.exports.UserInRoleLoad=async(params)=>{
    try {
     const{roleCode}=params;
     let pool=await sql.connect(sqlconfig)
     let result= await pool.request()
     .input('GroupUserCode',sql.VarChar(10),roleCode)
     .execute('wacoal_UserInRole_Load_Web_V1')
     return result.recordset
 
    } catch (error) {
        throw error
    } 
 }

 module.exports.UserListLoad=async()=>{
    try {
     let pool=await sql.connect(sqlconfig)
     let result= await pool.request()
     .execute('wacoal_ListUser_load_v1')
     return result.recordset
 
    } catch (error) {
        throw error
    } 
 }

module.exports.RolePermissionmoveRuleInRole=async(body)=>{
    try {
        const{PermisionGroupCode,RoleId}=body;
        let pool= await sql.connect(sqlconfig)
        let result=await pool.request()
        .input('GroupUserCode',sql.VarChar(10),RoleId)
        .input('PermisionGroupCode',sql.VarChar(10),PermisionGroupCode)
        .execute('wacoal_AuthorizationOnUserGroup_InsertRuleInRole_web_V1')
       return result.rowsAffected
    } catch (error) {
        throw error
    }
}

module.exports.RolePermissiondeleteRuleInRole=async(body)=>{
    try {
        const{PermisionGroupCode,RoleId}=body;
        let pool= await sql.connect(sqlconfig)
        let result=await pool.request()
        .input('GroupUserCode',sql.VarChar(10),RoleId)
        .input('PermisionGroupCode',sql.VarChar(10),PermisionGroupCode)
        .execute('wacoal_AuthorizationOnUserGroup_DeleteRuleInRole_web_V1')
        return result.rowsAffected
    } catch (error) {
        throw error
    }
}

module.exports.RolePermissionMoveUserInrRole=async(body)=>{
    try {
        const{UserId,RoleId}=body;
        let pool= await sql.connect(sqlconfig)
        let result=await pool.request()
        .input('GroupUserCode',sql.VarChar(10),RoleId)
        .input('UserID',sql.BigInt,parseInt(UserId))
        .execute('wacoal_Role_InsertUser_Web_V1')
        return result.rowsAffected
    } catch (error) {
        throw error
    }
}

module.exports.RolePermissionDeleteUserInRole=async(body)=>{
    try {
        const{UserId,RoleId}=body;
        let pool= await sql.connect(sqlconfig)
        let result=await pool.request()
        .input('GroupUserCode',sql.VarChar(10),RoleId)
        .input('UserID',sql.BigInt,parseInt(UserId))
        .execute('wacoal_Role_DeleteUser_Web_V1')
        return result.rowsAffected
    } catch (error) {
        throw error
    }
}






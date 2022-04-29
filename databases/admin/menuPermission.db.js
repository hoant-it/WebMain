const sql=require('mssql')
const sqlconfig= require('../dbconfig')

module.exports.wacoal_ListMenu_By_Rule_Load_Web_v2 =async(params)=>{
    const{ruleCode}=params
    try {
        let pool = await sql.connect(sqlconfig)
        let result= await pool.request()
        .input('PermisionGroupCode',sql.VarChar(10),ruleCode)
        .execute('wacoal_ListMenu_By_Rule_Load_Web_v2')
        return result.recordset
    } catch (error) {
        throw error
    }
}

module.exports.wacoal_PermisionGroupCode_load_Web_v2 =async()=>{
    try {
        let pool = await sql.connect(sqlconfig)
        let result= await pool.request()
        .execute('wacoal_PermisionGroupCode_load_Web_v2')
        return result.recordset
    } catch (error) {
        throw error
    }
}

module.exports.MenupermissionUpdateRule=async(body)=>{
    try {
        const{RuleCode,RuleName,Status}=body;
        let pool = await sql.connect(sqlconfig)
        if(Status === 'submitInsert'){
            let result= await pool.request()
            .input('PermisionGroupCode',sql.VarChar(10),RuleCode)
            .input('PermisionGroupDescription',sql.VarChar(100),RuleName)
            .execute('ListPermisionGroup_Insert_Web_V1')
           return  result.rowsAffected
        }
        if(Status === 'submitUpdate'){
            let result= await pool.request()
            .input('PermisionGroupCode',sql.VarChar(10),RuleCode)
            .input('PermisionGroupDescription',sql.VarChar(100),RuleName)
            .execute('wacoal_ListPermisionGroup_Update')
           return  result.rowsAffected
        }
        
    } catch (error) {
        throw error
    }
}

module.exports.MenupermissionDeleteRule= async(body)=>{
    try {
        const{RuleCode}=body
        let pool = await sql.connect(sqlconfig)
        let result= await pool.request()
        .input('PermisionGroupCode',sql.VarChar(10),RuleCode)
        .execute('wacoal_ListPermisionGroup_Delete_Web_V1')
        return result.rowsAffected
        
    } catch (error) {
        throw error
    }
}

module.exports.MenuListLoadWeb= async(params)=>{
    try {
        const{ruleCode}=params
        let pool= await sql.connect(sqlconfig)
        let result= await pool.request()
        .input('PermisionGroupCode',sql.VarChar(10),ruleCode)
        .execute('wacoal_ListMenu_Load_web_V1')
        return result.recordset
        
    } catch (error) {
        throw error
    }
    
}

module.exports.MenuPermissionUpdate=async(body)=>{
    let lMes={}
    try {
        const {SourceDataTask_ID,TargetDataTask_ID,TargetHas_Items,DropInsideItem,Rulecode,Status}=body;
        let pool= await sql.connect(sqlconfig)
        if (Status === "") {
          lMes.reload = false;
          if (DropInsideItem) {
            if (TargetHas_Items) {
              let result = await pool
                .request()
                .input("MenuCode", sql.VarChar(10), SourceDataTask_ID)
                .input("MenuParent", sql.VarChar(10), TargetDataTask_ID)
                .input("PermisionGroupCode", sql.VarChar(10), Rulecode)
                .execute("wacoal_MenuInPermision_dropInsideItem_v2");
              if (result.rowsAffected[0] === 1) {
                lMes.status = true;
                lMes.mes = "";
                return lMes;
              } else {
                lMes.status = false;
                lMes.mes = "Không thể di chuyển vào nút lá";
                return lMes;
              }
            } else {
              lMes.status = false;
              lMes.mes = "Không thể di chuyển vào nút lá";
              return lMes;
            } 
          } else {
            let result = await pool
              .request()
              .input("sourceMenuCode", sql.VarChar(10), SourceDataTask_ID)
              .input("targetMenuCode", sql.VarChar(10), TargetDataTask_ID)
              .input("PermisionGroupCode", sql.VarChar(10), Rulecode)
              .execute("wacoal_MenuInPermision_dropOutsideItem_web_v2");
            if (result.rowsAffected[0] === 1 && result.rowsAffected[1] === 1) {
              lMes.status = true;
              lMes.mes = "";
              return lMes;
            } else {
              lMes.status = false;
              lMes.mes = "Lỗi";
              return lMes;
            }
          }
        }
        

        if(Status==='submitMoveInside'){
            lMes.reload=true
            if(TargetHas_Items){
                let result = await pool
                .request()
                .input("MenuCode", sql.VarChar(10), SourceDataTask_ID)
                .input("MenuParent", sql.VarChar(10), TargetDataTask_ID)
                .input("PermisionGroupCode", sql.VarChar(10), Rulecode)
                .execute("wacoal_MenuInPermision_dropInsideItem_fromGrid_web_v1");
                if(result.rowsAffected[0]>0 && result.rowsAffected[1]>0){
                    lMes.status = true;
                    lMes.mes = ""
                    return lMes;
                }else{
                    lMes.status = false;
                    lMes.mes = "Lỗi"
                    return lMes;
                }
            }else{
                lMes.status = false;
                lMes.mes = "Không thể di chuyển vào nút lá";
                return lMes;
            }
        }

        if(Status==='submitMoveOutSide'){
            lMes.reload=true
            let result = await pool
            .request()
            .input("sourceMenuCode", sql.VarChar(10), SourceDataTask_ID)
            .input("targetMenuCode", sql.VarChar(10), TargetDataTask_ID)
            .input("PermisionGroupCode", sql.VarChar(10), Rulecode)
            .execute("wacoal_MenuInPermision_dropOutsideItem_fromGrid_web_v2");
            if(result.rowsAffected[0]>0 && result.rowsAffected[1]>0 && result.rowsAffected[3]>0 ){
                lMes.status = true;
                lMes.mes = ""
                return lMes;
            }else{
                lMes.status = false;
                lMes.mes = "Lỗi"
                return lMes;
            }
        }

        if(Status === 'submitDelete'){
            lMes.reload=true
            let result = await pool
            .request()
            .input("MenuCode", sql.VarChar(10), TargetDataTask_ID)
            .input("PermisionGroupCode", sql.VarChar(10), Rulecode)
            .execute("wacoal_MenuInPermision_Delete_web_v1");
            if(result.rowsAffected[3]>0){
                lMes.status = true
                lMes.mes = ""
                return lMes;
            }else{
                lMes.status = false;
                lMes.mes = "Lỗi"
                return lMes;
            }
        }
        
    } catch (error) {
        lMes.reload=false
        lMes.status = false
        lMes.mes = "Lỗi: "+error
        return lMes;
    }
}




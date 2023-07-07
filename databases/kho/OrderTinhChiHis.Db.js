const sql = require("mssql");
const sqlConfig = require("../dbconfig");

module.exports.KHOCHIHEADER_ORDERNO_load_web_wacoal_v1= async()=>{
    let pool= await sql.connect(sqlConfig)
    try {
        let result= await pool.request()
        .execute('KHOCHIHEADER_ORDERNO_load_web_wacoal_v1')
        return result.recordset
    } catch (error) {
        throw error
    }
}

module.exports.KHOCHIHEADER_GROUPKH_Load_web_wacoal_V1= async(params)=>{
    let pool= await sql.connect(sqlConfig)
    const {order}=params;
    try {
        let result= await pool.request()
        .input('ORDERNO',sql.NVarChar(50),order)
        .execute('KHOCHIHEADER_GROUPKH_Load_web_wacoal_V1')
       
        return result.recordset
    } catch (error) {
        throw error
    }
}

module.exports.KHOCHIDETAIL_Load_By_Order_GroupKH_web_wacoal_V1= async(params)=>{
    let pool= await sql.connect(sqlConfig)
    const{order,groupKH}=params
    try {
        let result= await pool.request()
        .input('ORDERNO',sql.NVarChar(50),order)
        .input('GROUPKH',sql.NVarChar(50),groupKH)
        .execute('KHOCHIDETAIL_Load_By_Order_GroupKH_web_wacoal_V1')
        return result.recordset
    } catch (error) {
        throw error
    }
}

module.exports.KHOCHIDETAILGROUP_Load_web_wacoal_V2= async(params)=>{
    let pool= await sql.connect(sqlConfig)
    const{order,groupKH}=params
    try {
        let result= await pool.request()
        .input('ORDERNO',sql.NVarChar(50),order)
        .input('GROUPKH',sql.NVarChar(50),groupKH)
        .execute('KHOCHIDETAILGROUP_Load_web_wacoal_V2')
        return result.recordset
    } catch (error) {
        throw error
    }
}

module.exports.KHOCHIHEADER_TIMECREATE_USERCREATE_load_web_wacoal_V1= async(body)=>{
    let pool= await sql.connect(sqlConfig)
    const{orderNo,groupKH}=body
    try {
        let result=await pool.request()
        .input('ORDERNO',sql.NVarChar(50),orderNo)
        .input('GROUPKH',sql.NVarChar(50),groupKH)
        .execute('KHOCHIHEADER_TIMECREATE_USERCREATE_load_web_wacoal_V1')
        return result.recordset

    } catch (error) {
        throw error
    }
}
const sql= require('mssql');
const sqlConfig = require("../dbconfig");

module.exports.ListPositions_Load_Web_V1= async()=>{
    try {
        let pool=await sql.connect(sqlConfig);
        let result=(await pool).request()
        .execute('ListPositions_Load_Web_V1')
        return (await result).recordset;
    } catch (error) {
        throw error
    }
}

module.exports.ListPositions_PositionsCodeGetNext= async()=>{
    try {
        let pool=await sql.connect(sqlConfig);
        let result=(await pool).request()
        .execute('ListPositions_PositionsCodeGetNext')
        return (await result).recordset;
    } catch (error) {
        throw error
    }
}


module.exports.ListPositionsSavetoDatabase=async(body)=>{
    try {
        const {PositionsCode,PositionsName,PositionsDescription,Status}=body
        if(Status==="submitInsert"){
            let pool=await sql.connect(sqlConfig);
            let result=(await pool).request()
            .input('PositionsCode',sql.VarChar(10),PositionsCode)
            .input('PositionsName',sql.NVarChar(200),PositionsName)
            .input('PositionsDescription',sql.NVarChar(200),PositionsDescription)
            .execute('ListPositions_Insert_Web_V1')
            return (await result).rowsAffected
        }
        if(Status==="submitEdit"){
            let pool=await sql.connect(sqlConfig);
            let result=(await pool).request()
            .input('PositionsCode',sql.VarChar(10),PositionsCode)
            .input('PositionsName',sql.NVarChar(200),PositionsName)
            .input('PositionsDescription',sql.NVarChar(200),PositionsDescription)
            .execute('ListPositions_Update_Web_V1')
            return (await result).rowsAffected
        }
        
    } catch (error) {
        throw error
    }
}


module.exports.PositionListDelete= async(body)=>{
    try {
        const{PositionsCode}=body;
        let pool=await sql.connect(sqlConfig);
        let result=(await pool).request()
        .input('PositionsCode',sql.VarChar(10),PositionsCode)
        .execute('ListPositions_Delete_Web_V1')
        return (await result).rowsAffected
    } catch (error) {
        throw error
    }
}
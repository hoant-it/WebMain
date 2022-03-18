const sql = require('mssql');
const { mountpath } = require('../app');
const sqlConfig = require('./dbconfig');
async function GetData(){
    try {
        // let pool = await sql.connect(sqlConfig);
        console.log('sql server connected...')
    } catch (error) {
        console.log('error' +error)
    }
}
module.exports.GetDataByQuery = async(query) =>{
    try {
        console.log(sqlConfig);
        let pool = await sql.connect(sqlConfig);
        let res = await pool.request().query(query);
        // console.log(res.recordset);
        return res.recordset;
        
    } catch (error) {
        console.log('error' +error)
        
    }
}


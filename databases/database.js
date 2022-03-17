const sql = require('mssql')
const sqlConfig = require('./dbconfig');


//   sql.on('error', err =>{
//       console.log(err.message)
//   })

async function GetData(){
    try {
        // let pool = await sql.connect(sqlConfig);
        console.log('sql server connected...')
    } catch (error) {
        console.log('error' +error)
    }
}


async function GetDataByQuery(){
    try {
        let pool = await sql.connect(sqlConfig);
        let res = await pool.request().query('SELECT TOP 10 * FROM dbo.CONGDOAN_MAHANG');
        // console.log(res.recordset);
        return res.recordset;
        
    } catch (error) {
        console.log('error' +error)
        
    }
}

module.exports = {
    GetData: GetData,
    GetDataByQuery:GetDataByQuery,
}
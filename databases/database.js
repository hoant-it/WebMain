const sql = require('mssql');
const sqlConfig = require('./dbconfig');

// module.exports.GetData = async() =>{
//     try {
//         // let pool = await sql.connect(sqlConfig);
//         console.log('sql server connected...')
//     } catch (error) {
//         console.log('error' +error)
//     }
// }
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







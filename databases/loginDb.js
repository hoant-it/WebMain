const sql = require('mssql')
const sqlConfig = require('./dbconfig');
sql.on('error', err => {
    // ... error handler
    console.log(err);
})

module.exports.sp_Wacoal_Web_ListUserGetRole= async(userName) =>{
    try {
        let pool = await sql.connect(sqlConfig)
        let res = await pool.request()
        .input('UserName', sql.NVarChar, userName)
        .execute('sp_Wacoal_Web_ListUserGetRole')
        // console.log(res.recordset);
        return res.recordset
        
    } catch (error) {
        // return error
        console.log('error' +error)
        pool.close();
    }

}

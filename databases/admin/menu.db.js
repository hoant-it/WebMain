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
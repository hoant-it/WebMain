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

const tvp=new sql.Table();

tvp.columns.add('a', sql.NVarChar(50))
tvp.columns.add('b',sql.Int)

tvp.rows.add('hello tvp',777)

const req = new sql.Request()
req.input('tvp',tvp)
req.execute('MyCustomStoredProcedure',(err,result) =>{
    console.log(result.recordset)
})




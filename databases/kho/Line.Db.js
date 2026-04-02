const sql=require("mssql")
const sqlconfig= require('../dbconfig')

module.exports.wacoal_Line_Load_Web_V1= async()=>{
    try {
        let pool= await sql.connect(sqlconfig)
        let result= await pool.request()
        .execute('wacoal_Line_Load_Web_V1')
        return result.recordset
        
    } catch (error) {
        throw error
    }
}

module.exports.LineUpdate = async (body, userName) => {
  const { line,lineOld, status } = body;
  try {
    let pool = await sql.connect(sqlconfig);
    if (status === "submitInsert") {
      await pool
        .request()
        .input("MACHUYEN", sql.NVarChar(50), line)       
        .input("UserName", sql.NVarChar(50), userName)
        .execute("wacoal_Line_Insert_Web_V1");
    }
    if(status==="submitEdit"){
        await pool
        .request()
        .input("MACHUYEN", sql.NVarChar(50), line)       
        .input("UserName", sql.NVarChar(50), userName)
        .input("LineOld", sql.NVarChar(50), lineOld)
        .execute("wacoal_Line_Update_Web_V1");
    }
  } catch (error) {
    throw error
  }
};



module.exports.Line_Delete_Web_V1=async(body)=>{
    try {
        const{line}=body
        let pool=await sql.connect(sqlconfig)
        await pool.request()
        .input('MACHUYEN',sql.NVarChar(50),line)        
        .execute('Line_Delete_Web_V1')
        
    } catch (error) {
        throw error
    }
  

}
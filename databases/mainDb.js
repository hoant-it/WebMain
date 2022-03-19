const sql = require("mssql");
const sqlConfig = require("./dbconfig");
sql.on("error", (err) => {
  // ... error handler
  console.log(err);
});

module.exports.sp_Wacoal_Web_ListUserGetRole = async (userName) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      .input("UserName", sql.NVarChar, userName)
      // .input('aaa', sql.NVarChar, userName)
      .execute("sp_Wacoal_Web_ListUserGetRole");
    // console.log(res.recordset);
    return res.recordset;
  } catch (error) {
    // return error
    console.log("error" + error);
    pool.close();
  }
};

module.exports.GetdataType = async () => {
  const tvp = new sql.Table();

  tvp.columns.add("a", sql.NVarChar(50));
  tvp.columns.add("b", sql.Int);

  tvp.rows.add("hello tvp", 777);

  let pool = await sql.connect(sqlConfig);
  let res = await pool.request();
  res.input("tvp", tvp);
  res.execute("MyCustomStoredProcedure", (err, result) => {
    console.dir(result.recordsets[0][0]);
  });
};

module.exports.InsertdataType = async (arr) => {
  try {
    const tvp = new sql.Table();
    tvp.columns.add("a", sql.NVarChar(50));
    tvp.columns.add("b", sql.Int);
    // tvp.columns.add("c", sql.Int);
    arr.forEach((item) => {
      tvp.rows.add(item.a, item.b);
    });
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      .input("tvp", tvp)
      .execute("MyCustomStoredProcedureInsert"
    //   , (err, result) => {
    //       if(err){
    //         console.log(err);
    //       }else{
    //         console.log(result.rowsAffected);
    //       }
      
    //   }
      )
    // console.log(res)
  } catch (error) {
    //   return error;
    console.log("error" + error);
    pool.close();
  }
};

module.exports.sp_Wacoal_LoadMenuWeb_V1 = async (iDAuthorization,userInGroupID) =>{
  try {
      let pool= await sql.connect(sqlConfig);
      let res= await pool.request()
      .input("IDAuthorization",sql.BigInt,iDAuthorization)
      .input("UserInGroupID",sql.BigInt,userInGroupID)
      .execute("sp_Wacoal_LoadMenuWeb_V1")
      return res.recordset
      
  } catch (error) {
      console.log("error" + error);
      pool.close();
  }

}

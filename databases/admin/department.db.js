const sql = require("mssql");
const sqlconfig = require("../dbconfig");

module.exports.ListDepartment_Load_Web_V1 = async () => {
  try {
    let pool = await sql.connect(sqlconfig);
    let result = await pool.request().execute("ListDepartment_Load_Web_V1");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

module.exports.ListCompany_Load_Web_V1 = async () => {
  try {
    let pool = await sql.connect(sqlconfig);
    let result = await pool.request().execute("ListCompany_Load_Web_V1");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

module.exports.ListDepartmentPostUpdate = async (body) => {
  try {
    const { DepartmentCode, DepartmentName, CompanyCode, Status } = body;
    let pool = await sql.connect(sqlconfig);
    if (Status === "submitInsert") {
      let result = await pool
        .request()
        .input("DepartmentCode", sql.VarChar(10), DepartmentCode)
        .input("DepartmentName", sql.NVarChar(200), DepartmentName)
        .input("CompanyCode", sql.VarChar(2), CompanyCode)
        .execute("ListDepartment_Insert_Web_V1");
      return result.rowsAffected[0] > 0;
    }
    if (Status === "submitEdit") {
      let result = await pool
        .request()
        .input("DepartmentCode", sql.VarChar(10), DepartmentCode)
        .input("DepartmentName", sql.NVarChar(200), DepartmentName)
        .input("CompanyCode", sql.VarChar(2), CompanyCode)
        .execute("ListDepartment_Update_Web_V1");
      return result.rowsAffected[0] > 0;
    }
  } catch (error) {
    throw error;
  }
};

module.exports.ListDepartmentDelete = async (body) => {
  try {
    const { DepartmentCode } = body;
    let pool = await sql.connect(sqlconfig);
    let result = await pool
      .request()
      .input("DepartmentCode", sql.VarChar(10), DepartmentCode)
      .execute("ListDepartment_Delete_Web_V1");
    return result.rowsAffected[0] > 0;
  } catch (error) {
    throw error;
  }
};

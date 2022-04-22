const sql= require('mssql');
const sqlConfig = require("../dbconfig");


module.exports.ListCompany_Load_Web_V1 = async () =>{
    try {
        let pool= await sql.connect(sqlConfig);
        let result= await pool.request()
        .execute('ListCompany_Load_Web_V1')
        return result.recordset
        
    } catch (error) {
        throw error
    }
}

module.exports.CompanySavetodatabase = async(body) =>{
    var mes={}
    const {CompanyCode,CompanyName,Adrress,PhoneNumber,Fax,PersonRepresent,Positions,BankName,BankAddress,BankAccount,MaSoThue,Tax,Email,Status}=body
    try {
      let pool = await sql.connect(sqlConfig);
      if (Status === "submitInsert") {
        let result = await pool
          .request()
          .input("CompanyCode", sql.NVarChar(2), CompanyCode)
          .input("CompanyName", sql.NVarChar(200), CompanyName)
          .input("Adrress", sql.NVarChar(200), Adrress)
          .input("PhoneNumber", sql.NVarChar(50), PhoneNumber)
          .input("Fax", sql.NVarChar(50), Fax)
          .input("PersonRepresent", sql.NVarChar(50), PersonRepresent)
          .input("Positions", sql.NVarChar(100), Positions)
          .input("BankName", sql.NVarChar(100), BankName)
          .input("BankAddress", sql.NVarChar(100), BankAddress)
          .input("BankAccount", sql.NVarChar(100), BankAccount)
          .input("MaSoThue", sql.NVarChar(100), MaSoThue)
          .input("Tax", sql.NVarChar(100), Tax)
          .input("Email", sql.NVarChar(100), Email)
          .execute("ListCompany_Insert_Web_V1");
        //   console.log(result.rowsAffected);
        if (result.rowsAffected[0] == 1) {
          mes = "ok";
        } else {
          mes = "Lỗi";
        }
        return mes;
      }
      if (Status === "submitEdit") {
        let result = await pool
          .request()
          .input("CompanyCode", sql.NVarChar(2), CompanyCode)
          .input("CompanyName", sql.NVarChar(200), CompanyName)
          .input("Adrress", sql.NVarChar(200), Adrress)
          .input("PhoneNumber", sql.NVarChar(50), PhoneNumber)
          .input("Fax", sql.NVarChar(50), Fax)
          .input("PersonRepresent", sql.NVarChar(50), PersonRepresent)
          .input("Positions", sql.NVarChar(100), Positions)
          .input("BankName", sql.NVarChar(100), BankName)
          .input("BankAddress", sql.NVarChar(100), BankAddress)
          .input("BankAccount", sql.NVarChar(100), BankAccount)
          .input("MaSoThue", sql.NVarChar(100), MaSoThue)
          .input("Tax", sql.NVarChar(100), Tax)
          .input("Email", sql.NVarChar(100), Email)
          .execute("ListCompany_Update_Web_V1");
        //   console.log(result.rowsAffected);
        if (result.rowsAffected[0] == 1) {
          mes = "ok";
        } else {
          mes = "Lỗi";
        }
        return mes;
      }
    } catch (error) {
      mes = "Lỗi: " + error;
      return mes;
    }
}

module.exports.CompanyDeleteData = async (body) => {
  const { CompanyCode } = body;
  var send = {};
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .input("CompanyCode", sql.NChar(2), CompanyCode)
      .execute("ListCompany_Delete_Web_V1");
    if (result.rowsAffected[0] === 1) {
      send.mes = "ok";
    } else {
      send.mes = "Lỗi";
    }
  } catch (error) {
    send.mes = "Lỗi: " + error;
  }
  return send;
};
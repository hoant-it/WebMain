const sql = require("mssql");
const sqlConfig = require("../dbconfig");
const del = require("del");
const xlsx = require("xlsx");

module.exports.wacoal_KEHANG_Load_By_Id_Web_V1 = async (ID) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .input("ID", sql.BigInt, ID)
      .execute("wacoal_KEHANG_Load_By_Id_Web_V1");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

module.exports.wacoal_KEHANG_Load_By_Id_Web_V2 = async (ID) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .input("ID", sql.VarChar(10), ID)
      .execute("wacoal_KEHANG_Load_By_Id_Web_V2");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

module.exports.wacoal_KEHANG_Web_Load_V1 = async () => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().execute("wacoal_KEHANG_Web_Load_V1");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

module.exports.wacoal_KHONL_Web_Load_V1 = async (params) => {
  try {
    const { SHEFTID } = params;
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .input("SHEFTID", sql.BigInt, SHEFTID)
      .execute("wacoal_KHONL_Web_Load_V1");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

module.exports.wacoal_KHONL_Web_Load_V2 = async (params) => {
  try {
    const { OKEID } = params;
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .input("OKEID", sql.VarChar(10), OKEID)
      .execute("wacoal_KHONL_Web_Load_V2");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

module.exports.SaveKeHangToDatabase = async (body, userName) => {
  try {
    const {
      btnSave,
      keHang,
      txtNL,
      txtOrder,
      txtColor,
      txtQty,
      txtUnit,
      txtQtyTon,
      txtQtyXuat,
      khoId,
    } = body;
    let pool = await sql.connect(sqlConfig);
    if (btnSave == "submitInsert") {
      await pool
        .request()
        .input("SHEFTID", sql.BigInt, keHang)
        .input("MATERIAL", sql.NVarChar(50), txtNL)
        .input("ORDERNO", sql.NVarChar(50), txtOrder)
        .input("COLOR", sql.NVarChar(50), txtColor)
        .input("QUANTITY", sql.Numeric(9, 3), txtQty)
        .input("UNIT", sql.NVarChar(50), txtUnit)
        .input("UserName", sql.NVarChar(50), userName)
        .execute("wacoal_KeHang_Insert_web_v1");
    }
    if (btnSave == "submitEdit") {
      await pool
        .request()
        .input("KHONLID", sql.BigInt, khoId)
        .input("QUANTITYXUAT", sql.Numeric(9, 3), txtQtyXuat)
        .input("UserName", sql.NVarChar(50), userName)
        .execute("wacoal_KHONLXUAT_Insert_Web_V1");
    }
  } catch (error) {
    throw error;
  }
};

module.exports.SaveKeHangToDatabaseV2 = async (body, userName) => {
  try {
    const {
      btnSave,
      keHang,
      txtNL,
      txtOrder,
      txtColor,
      txtQty,
      txtUnit,
      txtQtyTon,
      txtQtyXuat,
      khoId,
    } = body;
    let pool = await sql.connect(sqlConfig);
    if (btnSave == "submitInsert") {
      await pool
        .request()
        .input("OKEID", sql.VarChar(10), keHang)
        .input("MATERIAL", sql.NVarChar(50), txtNL)
        .input("ORDERNO", sql.NVarChar(50), txtOrder)
        .input("COLOR", sql.NVarChar(50), txtColor)
        .input("QUANTITY", sql.Numeric(9, 3), txtQty)
        .input("UNIT", sql.NVarChar(50), txtUnit)
        .input("UserName", sql.NVarChar(50), userName)
        .execute("wacoal_KeHang_Insert_web_v2");
    }
    if (btnSave == "submitEdit") {
      await pool
        .request()
        .input("KHONLID", sql.BigInt, khoId)
        .input("QUANTITYXUAT", sql.Numeric(9, 3), txtQtyXuat)
        .input("UserName", sql.NVarChar(50), userName)
        .execute("wacoal_KHONLXUAT_Insert_Web_V2");
    }
  } catch (error) {
    throw error;
  }
};

module.exports.wacoal_KHONLXUAT_Load_By_KHONLID_web_V1 = async (params) => {
  try {
    const { KHONLID } = params;
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .input("KHONLID", sql.BigInt, KHONLID)
      .execute("wacoal_KHONLXUAT_Load_By_KHONLID_web_V1");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};
module.exports.wacoal_KHONLXUAT_Load_By_KHONLID_web_V2 = async (params) => {
  try {
    const { KHONLID } = params;
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .input("KHONLID", sql.BigInt, KHONLID)
      .execute("wacoal_KHONLXUAT_Load_By_KHONLID_web_V2");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

module.exports.uploadKeHang = async (filename, userId) => {
  let lError = { errMes: "th??nh c??ng", statusErr: true };
  try {
    let pool = await sql.connect(sqlConfig);
    const filePath = `./public/uploads/${filename}`;
    const workbook = await xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const workbookHeaders = await xlsx.readFile(filePath, { sheetRows: 1 });
    const columnsArrayHeaders = await xlsx.utils.sheet_to_json(
      workbookHeaders.Sheets[workbook.SheetNames[0]],
      { header: 1 }
    )[0];
    const formatHeader = [
      "KEID",
      "MATERIAL",
      "ORDERNO",
      "COLOR",
      "QUANTITY",
      "UNIT",
    ];
    if (columnsArrayHeaders.length !== formatHeader.length) {
      lError.errMes = `L???i: format c???t kh??ng ????ng`;
      lError.statusErr = false;
    }
    for (let i = 0; i < columnsArrayHeaders.length; i++) {
      let excelheaderName = columnsArrayHeaders[i];
      let formatheaderName = formatHeader[i];
      if (excelheaderName !== formatheaderName) {
        lError.errMes = `L???i: format T??n C???t kh??ng ????ng ( ${excelheaderName} # ${formatheaderName} )`;
        lError.statusErr = false;
        return lError;
      }
    }
    let jsonPagesArray = [];
    sheet_name_list.forEach(function (sheet) {
      const jsonPage = {
        name: sheet,
        content: JSON.parse(
          JSON.stringify(
            xlsx.utils.sheet_to_json(workbook.Sheets[sheet], { defval: "" })
          )
        ),
      };
      jsonPagesArray.push(jsonPage);
    });

    for (let i = 0; i < jsonPagesArray[0].content.length; i++) {
      var contentValue = jsonPagesArray[0].content[i];
      let KEID = contentValue.KEID;
      let MATERIAL = contentValue.MATERIAL;
      let ORDERNO = contentValue.ORDERNO;
      let COLOR = contentValue.COLOR;
      let QUANTITY = contentValue.QUANTITY;
      let UNIT = contentValue.UNIT;

      await pool
        .request()
        .input("KEID", sql.BigInt, parseInt(KEID))
        .input("MATERIAL", sql.NVarChar(50), MATERIAL)
        .input("ORDERNO", sql.NVarChar, ORDERNO)
        .input("COLOR", sql.NVarChar(50), COLOR)
        .input("QUANTITY", sql.Numeric(9, 3), parseFloat(QUANTITY))
        .input("UNIT", sql.NVarChar(50), UNIT)
        .input("UserName", sql.NVarChar(50), userId)
        .execute("wacoal_KHONL_upload_web_V1");
      // console.log(ress.rowsAffected);
    }
    await del([`./public/uploads/${filename}`]);
    return lError;
  } catch (error) {
    lError.errMes = "L???i: " + error;
    lError.statusErr = false;
    return lError;
  }
};

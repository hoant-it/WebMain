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

module.exports.wacoal_KHONL_Web_Load_V3 = async (params) => {
  try {
    const { OKEID,ORDERNO,MATERIAL } = params;
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .input("OKEID", sql.VarChar(10), OKEID)
      .input("ORDERNO", sql.VarChar(50), ORDERNO)
      .input("MATERIAL", sql.VarChar(50), MATERIAL)
      .execute("wacoal_KHONL_Web_Load_V3");
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
      txtKHONL_V3,
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
        .input("ORDERNO", sql.NVarChar(50), txtKHONL_V3)
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
      txtKHONL_V3,
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
        .input("ORDERNO", sql.NVarChar(50), txtKHONL_V3)
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



module.exports.SaveKeHangToDatabaseV3 = async(body,userName)=>{
  const {
    btnSave,
    keHang,
    txtNL,
    txtKHONL_V3,
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
      .input("ORDERNO", sql.NVarChar(50), txtKHONL_V3)
      .input("COLOR", sql.NVarChar(50), txtColor)
      .input("QUANTITY", sql.Numeric(9, 3), txtQty)
      .input("UNIT", sql.NVarChar(50), txtUnit)
      .input("UserName", sql.NVarChar(50), userName)
      .execute("wacoal_KeHang_Insert_web_v2");
  }

  if (btnSave == "submitEdit") {
    await pool
    .request()
    .input("KHONLID", sql.NVarChar(100), khoId)
    .input("QUANTITYXUAT", sql.Numeric(9, 3), txtQtyXuat)
    .input("UserName", sql.NVarChar(50), userName)
    .execute("wacoal_KHONLXUAT_Insert_Web_V3"); 
  }


  

}

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

module.exports.wacoal_KHONLXUAT_Load_By_KHONLID_web_V3 = async (params) => {
  try {
    const { KHONLID } = params;
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .input("KHONLID", sql.BigInt, KHONLID)
      .execute("wacoal_KHONLXUAT_Load_By_KHONLID_web_V3");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};




module.exports.uploadKeHang = async (filename, userId) => {
  let lError = { errMes: "thành công", statusErr: true };
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
      lError.errMes = `Lỗi: format cột không đúng`;
      lError.statusErr = false;
    }
    for (let i = 0; i < columnsArrayHeaders.length; i++) {
      let excelheaderName = columnsArrayHeaders[i];
      let formatheaderName = formatHeader[i];
      if (excelheaderName !== formatheaderName) {
        lError.errMes = `Lỗi: format Tên Cột không đúng ( ${excelheaderName} # ${formatheaderName} )`;
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
    lError.errMes = "Lỗi: " + error;
    lError.statusErr = false;
    return lError;
  }
};


module.exports.uploadKeHangv4 = async (filename, userId) => {
  let lError = { errMes: "thành công", statusErr: true };
  let pool = await sql.connect(sqlConfig);
  try {
   
    const filePath = `./public/uploads/${filename}`;
    const workbook = await xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const workbookHeaders = await xlsx.readFile(filePath, { sheetRows: 1 });
    let tKHONL_V3= new sql.Table();
    tKHONL_V3.columns.add("ID", sql.BigInt);
    tKHONL_V3.columns.add("ORDERNO", sql.NVarChar(50));
    tKHONL_V3.columns.add("MATERIAL", sql.NVarChar(50));
    tKHONL_V3.columns.add("COLOR", sql.NVarChar(50));
    tKHONL_V3.columns.add("OKEID", sql.VarChar(10));
    tKHONL_V3.columns.add("CTN", sql.NVarChar(10));
    tKHONL_V3.columns.add("QUANTITY", sql.Numeric(9,3));
    tKHONL_V3.columns.add("UNIT", sql.NVarChar(50));
    tKHONL_V3.columns.add("USERCREATE", sql.NVarChar(50));
    tKHONL_V3.columns.add("TIMECREATE", sql.NVarChar(50));
    tKHONL_V3.columns.add("USERUPDATE", sql.NVarChar(50));
    tKHONL_V3.columns.add("TIMEUPDATE", sql.NVarChar(50));

    const columnsArrayHeaders = await xlsx.utils.sheet_to_json(
      workbookHeaders.Sheets[workbook.SheetNames[0]],
      { header: 1 }
    )[0];
    const formatHeader = [
      "ID",
      "ORDERNO",
      "MATERIAL",
      "COLOR",
      "CTN",
      "QUANTITY",
      "UNIT",
      "OKEID"
    ];
    if (columnsArrayHeaders.length !== formatHeader.length) {
      lError.errMes = `Lỗi: format cột không đúng`;
      lError.statusErr = false;
    }
    for (let i = 0; i < columnsArrayHeaders.length; i++) {
      let excelheaderName = columnsArrayHeaders[i];
      let formatheaderName = formatHeader[i];
      if (excelheaderName !== formatheaderName) {
        lError.errMes = `Lỗi: format Tên Cột không đúng ( ${excelheaderName} # ${formatheaderName} )`;
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
      let ID=contentValue.ID
      let ORDERNO = contentValue.ORDERNO;
      // let KEID = contentValue.KEID;
      let MATERIAL = contentValue.MATERIAL;
     
      let COLOR = contentValue.COLOR;
      let CTN = contentValue.CTN.toString();
      let QUANTITY = contentValue.QUANTITY;
      let UNIT = contentValue.UNIT;
      let OKEID=contentValue.OKEID

      tKHONL_V3.rows.add(
        ID,
        ORDERNO,
        MATERIAL,
        COLOR,
        OKEID,
        CTN,
        QUANTITY,
        UNIT,
        userId,
        "",
        userId,
        ""
      );

      }
     pool = await sql.connect(sqlConfig);
     await pool
      .request()
      .input("typeKhoNL", tKHONL_V3)
      .execute("KhoNLInserByType");
    await del([`./public/uploads/${filename}`]);
    return lError;
  } catch (error) {
    lError.errMes = "Lỗi: " + error;
    lError.statusErr = false;
    return lError;
  }
};
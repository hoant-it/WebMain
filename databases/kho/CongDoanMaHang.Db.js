const sql = require("mssql");
const sqlConfig = require("../dbconfig");
const del = require("del");
const xlsx = require("xlsx");

module.exports.wacoal_MaHang_Select_V1 = async () => {
  try {
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      .execute("wacoal_MaHang_Select_V1");
    return res.recordset;
  } catch (error) {
    throw error
  }
};

module.exports.wacoal_TinhChi_MaHang_V3 = async (maHang) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      .input("MAHANG", sql.NVarChar(50), maHang)
      .execute("wacoal_TinhChi_MaHang_V3");
    return res.recordset;
  } catch (error) {
    throw error
  }
};

module.exports.CONGDOAN_MAHANG_New_Web_Load_V1 = async () => {
  try {
    let pool = await sql.connect(sqlConfig);
    let res = await pool.request().execute("CONGDOAN_MAHANG_New_Web_Load_V1");
    return res.recordset;
  } catch (error) {
    return res.error;
  }
};

module.exports.wacoal_MauNL_LoaiChi_Moi_Load_Web_V1 = async () => {
  try {
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      .execute("wacoal_MauNL_LoaiChi_Moi_Load_Web_V1");
    return res.recordset;
  } catch (error) {
    return res.error;
  }
};

module.exports.CongDoanMaHangInput = async (filename, userId) => {
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
      "MAHANG",
      "MAUMH",
      "CONGDOAN",
      "TENCONGDOAN",
      "KYHIEUMAY",
      "LOAIMAY",
      "MAVITRICHI",
      "LOAICHI",
      "BIENDO",
      "MATDO",
      "MAUNL",
      "MAMAUCHI",
      "CHIEUDAI_CONGDOAN",
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

    var MaHang, MauMH;
    MaHang = jsonPagesArray[0].content[0].MAHANG;
    MauMH = jsonPagesArray[0].content[0].MAUMH;

    await pool
      .request()
      .input("MAHANG", sql.NVarChar(50), MaHang)
      .input("MAUMH", sql.NVarChar(50), MauMH)
      .input('UserName',sql.NVarChar(50),userId)
      .input('statusErr',sql.Bit,1)
      .execute("CONGDOAN_MAHANG_Delete_Before_Import_Excel_Web_V3");

    for (let i = 0; i < jsonPagesArray[0].content.length; i++) {
      var contentValue = jsonPagesArray[0].content[i];
      let MAHANG = contentValue.MAHANG;
      let MAUMH = contentValue.MAUMH;
      let CONGDOAN = contentValue.CONGDOAN;
      let TENCONGDOAN = contentValue.TENCONGDOAN.replace(/\n|\r/g, "");
      let KYHIEUMAY = contentValue.KYHIEUMAY;
      let LOAIMAY = contentValue.LOAIMAY;
      let MAVITRICHI = contentValue.MAVITRICHI;
      let LOAICHI = contentValue.LOAICHI;
      let BIENDO = contentValue.BIENDO === "" ? 0 : contentValue.BIENDO;
      let MATDO = contentValue.MATDO === "" ? 0 : contentValue.MATDO;
      let MAUNL = contentValue.MAUNL;
      let MAMAUCHI = contentValue.MAMAUCHI;
      let CHIEUDAI_CONGDOAN =
        contentValue.CHIEUDAI_CONGDOAN === ""
          ? 0
          : contentValue.CHIEUDAI_CONGDOAN;

      await pool
        .request()
        .input("MAHANG", sql.NVarChar(50), MAHANG)
        .input("MAUMH", sql.NVarChar(50), MAUMH)
        .input("CONGDOAN", sql.BigInt, CONGDOAN)
        .input("TENCONGDOAN", sql.NVarChar(sql.MAX), TENCONGDOAN)
        .input("KYHIEUMAY", sql.NVarChar(sql.MAX), KYHIEUMAY)
        .input("LOAIMAY", sql.NVarChar(50), LOAIMAY)
        .input("MAVITRICHI", sql.NVarChar(5), MAVITRICHI)
        .input("LOAICHI", sql.NVarChar(50), LOAICHI)
        .input("BIENDO", sql.Numeric(9, 3), BIENDO)
        .input("MATDO", sql.Numeric(9, 3), MATDO)
        .input("MAUNL", sql.NVarChar(50), MAUNL)
        .input("MAMAUCHI", sql.NVarChar(50), MAMAUCHI.toString())
        .input("CHIEUDAI_CONGDOAN", sql.Numeric(9, 3), CHIEUDAI_CONGDOAN)
        .input("UserName", sql.NVarChar(50), userId)
        .execute("wacoal_CONGDOAN_MAHANG_Insert_V3");
    }
    await del([`./public/uploads/${filename}`]);
    return lError;
  } catch (error) {
    lError.errMes = "Lỗi: " + error;
    lError.statusErr = false;
    await pool
      .request()
      .input("MAHANG", sql.NVarChar(50), MaHang)
      .input("MAUMH", sql.NVarChar(50), MauMH)
      .input('UserName',sql.NVarChar(50),userId)
      .input('statusErr',sql.Bit,0)
      .execute("CONGDOAN_MAHANG_Delete_Before_Import_Excel_Web_V3");
  
    return lError;
  }
};

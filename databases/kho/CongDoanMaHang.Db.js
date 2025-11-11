const sql = require("mssql");
const sqlConfig = require("../dbconfig");
const del = require("del");
const xlsx = require("xlsx");
const path =require("path")

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

module.exports.wacoal_MauNL_LoaiChi_Moi_MH_Load_Web_V1 = async () => {
  try {
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      .execute("wacoal_MauNL_LoaiChi_Moi_MH_Load_Web_V1");
    return res.recordset;
  } catch (error) {
    return res.error;
  }
};

module.exports.CongDoanMaHangInput = async (filename, userId) => {
  let lError = { errMes: "thành công", statusErr: true };
  let pool = await sql.connect(sqlConfig);
  try {
    const destinationPath= path.join(__dirname,"../../public/uploads/")
    const filePath = `${destinationPath}${filename}`;
    
    // const filePath = `./public/uploads/${filename}`;
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

          if(
          (LOAIMAY.includes("ZIGZAG") && BIENDO==0)
          ){
            lError.errMes = "Lỗi: Công đoạn "+ CONGDOAN +" "+TENCONGDOAN+" "+LOAIMAY+" Biên Độ <=0" ;
            lError.statusErr = false;
            await pool
            .request()
            .input("MAHANG", sql.NVarChar(50), MaHang)
            .input("MAUMH", sql.NVarChar(50), MauMH)
            .input('UserName',sql.NVarChar(50),userId)
            .input('statusErr',sql.Bit,0)
            .execute("CONGDOAN_MAHANG_Delete_Before_Import_Excel_Web_V3");
            return lError;
          } else if(LOAIMAY.includes("INTERLOCK") || LOAIMAY.includes("VATSO")){
            if((BIENDO==0 || MATDO==0)){
              lError.errMes = "Lỗi: Công đoạn "+ CONGDOAN +" "+TENCONGDOAN+" "+LOAIMAY+" Biên Độ hoặc Mật Độ <=0" ;
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

          }
          
           
          

      await pool
        .request()
        .input("MAHANG", sql.NVarChar(50), MAHANG)
        .input("MAUMH", sql.NVarChar(50), MAUMH)
        .input("CONGDOAN", sql.Numeric(9, 3), Number(CONGDOAN))
        .input("TENCONGDOAN", sql.NVarChar(sql.MAX), TENCONGDOAN)
        .input("KYHIEUMAY", sql.NVarChar(sql.MAX), KYHIEUMAY)
        .input("LOAIMAY", sql.NVarChar(50), LOAIMAY)
        .input("MAVITRICHI", sql.NVarChar(5), MAVITRICHI)
        .input("LOAICHI", sql.NVarChar(50), LOAICHI)
        .input("BIENDO", sql.Numeric(9, 3), BIENDO)
        .input("MATDO", sql.Numeric(9, 3), MATDO)
        .input("MAUNL", sql.NVarChar(50), MAUNL)
        .input("MAMAUCHI", sql.NVarChar(50), MAMAUCHI.toString())
        .input("CHIEUDAI_CONGDOAN", sql.Numeric(9, 3), Number(CHIEUDAI_CONGDOAN))
        .input("UserName", sql.NVarChar(50), userId)
        .execute("wacoal_CONGDOAN_MAHANG_Insert_V3");
    }
    await del([`./public/uploads/${filename}`]);
    return lError;
  } catch (error) {
    await pool
      .request()
      .input("MAHANG", sql.NVarChar(50), MaHang)
      .input("MAUMH", sql.NVarChar(50), MauMH)
      .input('UserName',sql.NVarChar(50),userId)
      .input('statusErr',sql.Bit,0)
      .execute("CONGDOAN_MAHANG_Delete_Before_Import_Excel_Web_V3");
    lError.errMes = "Lỗi: " + error;
    lError.statusErr = false;
  
    return lError;
  }
};

module.exports.CongDoanMaHangInput_V2 = async (filename, userId) => {
  let lError = { errMes: "thành công", statusErr: true };
  let pool = await sql.connect(sqlConfig);
  let transaction;
  try {
    transaction = new sql.Transaction(pool);
    await transaction.begin();

    const destinationPath = path.join(__dirname, "../../public/uploads/");
    const filePath = `${destinationPath}${filename}`;
    const workbook = await xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const workbookHeaders = await xlsx.readFile(filePath, { sheetRows: 1 });
    const columnsArrayHeaders = await xlsx.utils.sheet_to_json(
      workbookHeaders.Sheets[workbook.SheetNames[0]],
      { header: 1 }
    )[0];
    const formatHeader = [
      "MAHANG", "MAUMH", "CONGDOAN", "TENCONGDOAN", "KYHIEUMAY", "LOAIMAY",
      "MAVITRICHI", "LOAICHI", "BIENDO", "MATDO", "MAUNL", "MAMAUCHI", "CHIEUDAI_CONGDOAN"
    ];
    if (columnsArrayHeaders.length !== formatHeader.length) {
      lError.errMes = `Lỗi: format cột không đúng`;
      lError.statusErr = false;
      await transaction.rollback();
      return lError;
    }
    for (let i = 0; i < columnsArrayHeaders.length; i++) {
      let excelheaderName = columnsArrayHeaders[i];
      let formatheaderName = formatHeader[i];
      if (excelheaderName !== formatheaderName) {
        lError.errMes = `Lỗi: format Tên Cột không đúng ( ${excelheaderName} # ${formatheaderName} )`;
        lError.statusErr = false;
        await transaction.rollback();
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
    // lay chuoi size
    const match = filename.match(/\(([^)]+)\)/);
    const sizeCup = match ? match[1] : null;
    if (!sizeCup) {
      lError.errMes = "Lỗi: " + error;
      lError.statusErr = false;
      await transaction.rollback();
      return lError;
    }

    const arrSizeCup = sizeCup.split('-');

    for (const sizeCup of arrSizeCup) {
      await transaction.request()
        .input("MAHANG", sql.NVarChar(50), MaHang)
        .input("MAUMH", sql.NVarChar(50), MauMH)
        .input("SIZECUP", sql.NVarChar(50), sizeCup)
        .input('UserName', sql.NVarChar(50), userId)
        .input('statusErr', sql.Bit, 1)
        .execute("CONGDOAN_MAHANG_Delete_Before_Import_Excel_Web_V4");

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

        if (
          (LOAIMAY.includes("ZIGZAG") && BIENDO == 0)
        ) {
          lError.errMes = "Lỗi: Công đoạn " + CONGDOAN + " " + TENCONGDOAN + " " + LOAIMAY + " Biên Độ <=0";
          lError.statusErr = false;
        await transaction.request()
        .input("MAHANG", sql.NVarChar(50), MaHang)
        .input("MAUMH", sql.NVarChar(50), MauMH)
        .input("SIZECUP", sql.NVarChar(50), sizeCup)
        .input('UserName', sql.NVarChar(50), userId)
        .input('statusErr', sql.Bit, 1)
        .execute("CONGDOAN_MAHANG_Delete_Before_Import_Excel_Web_V4");
          await transaction.rollback();
          return lError;
        } else if (LOAIMAY.includes("INTERLOCK") || LOAIMAY.includes("VATSO")) {
          if ((BIENDO == 0 || MATDO == 0)) {
            lError.errMes = "Lỗi: Công đoạn " + CONGDOAN + " " + TENCONGDOAN + " " + LOAIMAY + " Biên Độ hoặc Mật Độ <=0";
            lError.statusErr = false;
               await transaction.request()
        .input("MAHANG", sql.NVarChar(50), MaHang)
        .input("MAUMH", sql.NVarChar(50), MauMH)
        .input("SIZECUP", sql.NVarChar(50), sizeCup)
        .input('UserName', sql.NVarChar(50), userId)
        .input('statusErr', sql.Bit, 1)
        .execute("CONGDOAN_MAHANG_Delete_Before_Import_Excel_Web_V4");
            await transaction.rollback();
            return lError;
          }
        }
        if(TENCONGDOAN){
              await transaction.request()
          .input("MAHANG", sql.NVarChar(50), MAHANG)
          .input("MAUMH", sql.NVarChar(50), MAUMH)
          .input("CONGDOAN", sql.Numeric(9, 3), Number(CONGDOAN))
          .input("TENCONGDOAN", sql.NVarChar(sql.MAX), TENCONGDOAN)
          .input("KYHIEUMAY", sql.NVarChar(sql.MAX), KYHIEUMAY)
          .input("LOAIMAY", sql.NVarChar(50), LOAIMAY)
          .input("MAVITRICHI", sql.NVarChar(5), MAVITRICHI)
          .input("LOAICHI", sql.NVarChar(50), LOAICHI)
          .input("BIENDO", sql.Numeric(9, 3), BIENDO)
          .input("MATDO", sql.Numeric(9, 3), MATDO)
          .input("MAUNL", sql.NVarChar(50), MAUNL)
          .input("MAMAUCHI", sql.NVarChar(50), MAMAUCHI.toString())
          .input("CHIEUDAI_CONGDOAN", sql.Numeric(9, 3), Number(CHIEUDAI_CONGDOAN))
          .input("UserName", sql.NVarChar(50), userId)
          .input("SIZECUP", sql.NVarChar(50), sizeCup)
          .execute("[wacoal_CONGDOAN_MAHANG_Insert_V4]");

        }

    
      }
    }

    await del([`./public/uploads/${filename}`]);
    await transaction.commit();
    return lError;
  } catch (error) {
    if (transaction) {
      try { await transaction.rollback(); } catch (e) {
        console.error('Rollback transaction failed:', rollbackError);
      lError.errMes = "Lỗi khi rollback transaction: " + rollbackError + " | Lỗi gốc: " + error;
      lError.statusErr = false;
      return lError;
      }
    }
    await pool.request()
      .input("MAHANG", sql.NVarChar(50), MaHang)
        .input("MAUMH", sql.NVarChar(50), MauMH)
        .input("SIZECUP", sql.NVarChar(50), sizeCup)
        .input('UserName', sql.NVarChar(50), userId)
        .input('statusErr', sql.Bit, 1)
        .execute("CONGDOAN_MAHANG_Delete_Before_Import_Excel_Web_V4");
    lError.errMes = "Lỗi: " + error;
    lError.statusErr = false;
    return lError;
  }
};

module.exports.CONGDOAN_MAHANG_Load_By_MaHang_Web_Wacoal_V1 = async (params) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      .input('MAHANG',sql.NVarChar(50),params.MaHang)
      .execute("CONGDOAN_MAHANG_Load_By_MaHang_Web_Wacoal_V1");
    return res.recordset;
  } catch (error) {
    return res.error;
  }
};

module.exports.CONGDOAN_MAHANG_Load_By_MaHang_Web_Wacoal_V2 = async (params) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      .input('MAHANG',sql.NVarChar(50),params.MaHang)
      .execute("CONGDOAN_MAHANG_Load_By_MaHang_Web_Wacoal_V2");
    return res.recordset;
  } catch (error) {
    return res.error;
  }
};

module.exports.LOAIMAY_New_load_Wacoal_Web_V1 = async (params) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      .execute("LOAIMAY_New_load_Wacoal_Web_V1");
    return res.recordset;
  } catch (error) {
    return res.error;
  }
};

module.exports.LOAIMAY_New_load_Wacoal_Web_V2 = async (params) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      .execute("LOAIMAY_New_load_Wacoal_Web_V2");
    return res.recordset;
  } catch (error) {
    return res.error;
  }
};

module.exports.LoaiChi_New_load_Wacoal_Web_V1 = async (params) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      .execute("LoaiChi_New_load_Wacoal_Web_V1");
    return res.recordset;
  } catch (error) {
    return res.error;
  }
};

module.exports.LoaiChi_New_load_Wacoal_Web_V2 = async (params) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      .execute("LoaiChi_New_load_Wacoal_Web_V2");
    return res.recordset;
  } catch (error) {
    return res.error;
  }
};













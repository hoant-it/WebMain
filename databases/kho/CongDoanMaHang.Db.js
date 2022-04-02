const sql = require("mssql");
const sqlConfig = require("../dbconfig");

module.exports.wacoal_MaHang_Select_V1 = async () => {
  try {
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      //   .input("UserName", sql.NVarChar, userName)
      // .input('aaa', sql.NVarChar, userName)
      .execute("wacoal_MaHang_Select_V1");
    // console.log(res.recordset);
    return res.recordset;
  } catch (error) {
    // return error
    console.log("error" + error);
    pool.close();
  }
};

module.exports.wacoal_TinhChi_MaHang_V1 = async (maHang) => {
  try {
    console.log(maHang);
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      .input("MAHANG", sql.NVarChar(50), maHang)
      .execute("wacoal_TinhChi_MaHang_V1");
    return res.recordset;
  } catch (error) {
    console.log("error" + error);
    pool.close();
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
      const filePath = `./public/uploads/${filename}`;
      const workbook = xlsx.readFile(filePath);
      const sheet_name_list = workbook.SheetNames;
      const workbookHeaders = xlsx.readFile(filePath, { sheetRows: 1 });
      let tCDMH = new sql.Table();
      tCDMH.columns.add("MAHANG", sql.NVarChar(50));
      tCDMH.columns.add("MAUMH", sql.NVarChar(10));
      tCDMH.columns.add("CONGDOAN", sql.NVarChar(50));
      tCDMH.columns.add("UnitNo", sql.NVarChar(50));
      tCDMH.columns.add("Style", sql.NVarChar(50));
      tCDMH.columns.add("Cup", sql.NVarChar(50));
      tCDMH.columns.add("Size", sql.NVarChar(50));
      tCDMH.columns.add("Color", sql.NVarChar(50));
      tCDMH.columns.add("OrderQty", sql.Int);
      tCDMH.columns.add("Note", sql.NVarChar(50));
      tCDMH.columns.add("TIMECREATE", sql.NVarChar(50));
      tCDMH.columns.add("USERCREATE", sql.NVarChar(50));
      tCDMH.columns.add("TIMEUPDATE", sql.NVarChar(50));
      tCDMH.columns.add("USERUPDATE", sql.NVarChar(50));
    
      const columnsArrayHeaders = xlsx.utils.sheet_to_json(workbookHeaders.Sheets[workbook.SheetNames[0]], { header: 1 })[0];
      const formatHeader = ["MAHANG", "MAUMH", "CONGDOAN", "TENCONGDOAN", "KYHIEUMAY", "LOAIMAY", "MAVITRICHI", "LOAICHI",
       "BIENDO", "MATDO","MAUNL","MAMAUCHI","CHIEUDAI_CONGDOAN"];
      for(let i =0; i<columnsArrayHeaders.length;i++){
        let excelheaderName=columnsArrayHeaders[i];
        let formatheaderName=formatHeader[i];
        if(excelheaderName!==formatheaderName){
          lError.errMes = `Lỗi: format Header không đúng ( ${excelheaderName} # ${formatheaderName} )`;
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
      for(let i =0 ; i<jsonPagesArray[0].content.length;i++){
        var contentValue=jsonPagesArray[0].content[i]
        tOrder.rows.add(
          contentValue.Classification,
          contentValue.MY.toString(),
          contentValue.Order,
          contentValue.UnitNo,
          contentValue.Style,
          contentValue.Cup,
          contentValue.Size,
          contentValue.Color,
          contentValue.OrderQty,
          contentValue.Note,
          '',
          userId,
          '',
          ''
          )
      }
      // console.log(tOrder)
      let pool = await sql.connect(sqlConfig);
      let ress = await pool
        .request()
        .input("tOrder", tOrder)
        .execute("OrderInserByType");
      if (ress.rowsAffected[5] > 0 || ress.rowsAffected[4] > 0) {
        return lError;
      } else {
        lError.errMes = "Lỗi ";
        lError.statusErr = false;
        return lError;
      }
  
      // console.log(res.recordset);
      // return lError;
    } catch (error) {
      lError.errMes = "Lỗi: " + error;
      lError.statusErr = false;
      return lError;
    }
  };

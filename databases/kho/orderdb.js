const sql = require("mssql");
const sqlConfig = require("../dbconfig");
const xlsx = require("xlsx");
const del = require('del')

module.exports.DONHANGITEM_3_MY_SearchBox_Web_V1 = async () => {
  try {
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      //   .input("UserName", sql.NVarChar, userName)
      // .input('aaa', sql.NVarChar, userName)
      .execute("DONHANGITEM_3_MY_SearchBox_Web_V1");
    // console.log(res.recordset);
    return res.recordset;
  } catch (error) {
    // return error
    console.log("error" + error);
    pool.close();
  }
};

module.exports.DONHANGITEM_3_Load_Web_V1 = async (MY) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let res = await pool
      .request()
      //   .input("UserName", sql.NVarChar, userName)
      .input("MY", sql.NVarChar, MY)
      .execute("DONHANGITEM_3_Load_Web_V1");
    // console.log(res.recordset);
    return res.recordset;
  } catch (error) {
    // return error
    console.log("error" + error);
    pool.close();
  }
};

module.exports.OrderInsertByType = async (filename, userId) => {
  let lError = { errMes: "thành công", statusErr: true };
  try {
    const filePath = `./public/uploads/${filename}`;
    const workbook = xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const workbookHeaders = xlsx.readFile(filePath, { sheetRows: 1 });
    let tOrder = new sql.Table();
    tOrder.columns.add("Classification", sql.NVarChar(50));
    tOrder.columns.add("MY", sql.NVarChar(10));
    tOrder.columns.add("Order", sql.NVarChar(50));
    tOrder.columns.add("UnitNo", sql.NVarChar(50));
    tOrder.columns.add("Style", sql.NVarChar(50));
    tOrder.columns.add("Cup", sql.NVarChar(50));
    tOrder.columns.add("Size", sql.NVarChar(50));
    tOrder.columns.add("Color", sql.NVarChar(50));
    tOrder.columns.add("OrderQty", sql.Int);
    tOrder.columns.add("Note", sql.NVarChar(50));
    tOrder.columns.add("TIMECREATE", sql.NVarChar(50));
    tOrder.columns.add("USERCREATE", sql.NVarChar(50));
    tOrder.columns.add("TIMEUPDATE", sql.NVarChar(50));
    tOrder.columns.add("USERUPDATE", sql.NVarChar(50));
  
    const columnsArrayHeaders = xlsx.utils.sheet_to_json(workbookHeaders.Sheets[workbook.SheetNames[0]], { header: 1 })[0];
    const formatHeader = ["Classification", "MY", "Order", "UnitNo", "Style", "Cup", "Size", "Color", "OrderQty", "Note",];
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
      del([`./public/uploads/${filename}`]);
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

sql.on("error", (err) => {
  lError.errMes = "Lỗi: " + err;
  lError.statusErr = false;
  return lError;
  // ... error handler
});

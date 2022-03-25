const sql = require("mssql");
const sqlConfig = require("../dbconfig");
const xlsx = require("xlsx");

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
  try {
    const filePath = `./public/uploads/${filename}`;
    const workbook = xlsx.readFile(filePath);
    const workSheet = workbook.Sheets[workbook.SheetNames[0]];
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
    // const post = {Classification,MY,Order,UnitNo,Style,Cup,Size,Color,OrderQty,Note};
    let post = {};
    let posts = [];
    let lError = {errMes:"thành công",statusErr:true};
    const cellName = [
      { cell: "A1", name: "Classification", sortCell: "A" },
      { cell: "B1", name: "MY", sortCell: "B" },
      { cell: "C1", name: "Order", sortCell: "C" },
      { cell: "D1", name: "UnitNo", sortCell: "D" },
      { cell: "E1", name: "Style", sortCell: "E" },
      { cell: "F1", name: "Cup", sortCell: "F" },
      { cell: "G1", name: "Size", sortCell: "G" },
      { cell: "H1", name: "Color", sortCell: "H" },
      { cell: "I1", name: "OrderQty", sortCell: "I" },
      { cell: "J1", name: "Note", sortCell: "J" },
    ];
    let index= 0;

    for (let cell in workSheet) {
      // if(index===2){
      //   console.log(cell)
      // }
      if (cell === cellName[0].cell && workSheet[cell].v !== cellName[0].name) {
        lError.errMes =
          "Lỗi:Excel file sai tên cột " +
          workSheet[cell].v +
          " # " +
          cellName[0].name;
        lError.statusErr = false;
        return lError;
      }
      if (cell === cellName[1].cell && workSheet[cell].v !== cellName[1].name) {
        lError.errMes =
          "Lỗi:Excel file sai tên cột " +
          workSheet[cell].v +
          " # " +
          cellName[1].name;
        lError.statusErr = false;
        return lError;
      }
      if (cell === cellName[2].cell && workSheet[cell].v !== cellName[2].name) {
        lError.errMes =
          "Lỗi:Excel file sai tên cột " +
          workSheet[cell].v +
          " # " +
          cellName[2].name;
        lError.statusErr = false;
        return lError;
      }
      if (cell === cellName[3].cell && workSheet[cell].v !== cellName[3].name) {
        lError.errMes =
          "Lỗi:Excel file sai tên cột " +
          workSheet[cell].v +
          " # " +
          cellName[3].name;
        lError.statusErr = false;
        return lError;
      }
      if (cell === cellName[4].cell && workSheet[cell].v !== cellName[4].name) {
        lError.errMes =
          "Lỗi:Excel file sai tên cột " +
          workSheet[cell].v +
          " # " +
          cellName[4].name;
        lError.statusErr = false;
        return lError;
      }
      if (cell === cellName[5].cell && workSheet[cell].v !== cellName[5].name) {
        lError.errMes =
          "Lỗi:Excel file sai tên cột " +
          workSheet[cell].v +
          " # " +
          cellName[5].name;
        lError.statusErr = false;
        return lError;
      }
      if (cell === cellName[6].cell && workSheet[cell].v !== cellName[6].name) {
        lError.errMes =
          "Lỗi:Excel file sai tên cột " +
          workSheet[cell].v +
          " # " +
          cellName[6].name;
        lError.statusErr = false;
        return lError;
      }
      if (cell === cellName[7].cell && workSheet[cell].v !== cellName[7].name) {
        lError.errMes =
          "Lỗi:Excel file sai tên cột " +
          workSheet[cell].v +
          " # " +
          cellName[7].name;
        lError.statusErr = false;
        return lError;
      }
      if (cell === cellName[8].cell && workSheet[cell].v !== cellName[8].name) {
        lError.errMes =
          "Lỗi:Excel file sai tên cột " +
          workSheet[cell].v +
          " # " +
          cellName[8].name;
        lError.statusErr = false;
        return lError;
      }
      if (cell === cellName[9].cell && workSheet[cell].v !== cellName[9].name) {
        lError.errMes =
          "Lỗi:Excel file sai tên cột " +
          workSheet[cell].v +
          " # " +
          cellName[9].name;
        lError.statusErr = false;
        return lError;
      }
      const cellAsString = cell.toString();
      if (cellAsString[1] !== "r" && cellAsString !== "m" && index>cellName.length ) {
        if (cellAsString[0] === cellName[0].sortCell) {
          post.Classification = workSheet[cell].v;
        }
        if (cellAsString[0] === cellName[1].sortCell) {
          post.MY = workSheet[cell].v.toString();
        }
        if (cellAsString[0] === cellName[2].sortCell) {
          post.Order = workSheet[cell].v;
        }
        if (cellAsString[0] === cellName[3].sortCell) {
          post.UnitNo = workSheet[cell].v;
        }
        if (cellAsString[0] === cellName[4].sortCell) {
          post.Style = workSheet[cell].v;
        }
        if (cellAsString[0] === cellName[5].sortCell) {
          post.Cup = workSheet[cell].v;
        }
        if (cellAsString[0] === cellName[6].sortCell) {
          post.Size = workSheet[cell].v;
        }
        if (cellAsString[0] === cellName[7].sortCell) {
          post.Color = workSheet[cell].v;
        }
        if (cellAsString[0] === cellName[8].sortCell) {
          post.OrderQty = workSheet[cell].v;
        }
        if (cellAsString[0] === cellName[9].sortCell) {
          post.Note = workSheet[cell].v;
          posts.push(post);
          tOrder.rows.add(
            post.Classification,
            post.MY,
            post.Order,
            post.UnitNo,
            post.Style,
            post.Cup,
            post.Size,
            post.Color,
            post.OrderQty,
            post.Note,
            "",
            userId,
            "",
            ""
          );
          post = {};
        }
      }
      index++
    }

    // console.log(tOrder.rows.length);
    // console.log(tOrder);
    let pool = await sql.connect(sqlConfig);
   let ress= await pool.request()
      // .input("tOrder", tOrder)
      .execute("OrderInserByType" 
      // ).then(result=>{
      //   console.log(result.rowsAffected);
      //   lError.errMes = "thành công";
      //   lError.statusErr = true;
      //   return lError;
      // }).catch(err=>{
      //   lError.errMes = "Lỗi: " + error;
      //   lError.statusErr = false;
      //   return lError;
      // }
      )
      if(ress.rowsAffected[5]>0 || ress.rowsAffected[4]>0){
        return lError
      } else{
        lError.errMes = "Lỗi "
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

sql.on('error', err => {
  lError.errMes = "Lỗi: " + err;
  lError.statusErr = false;
  return lError;
  // ... error handler
})

const db = require("../../databases/kho/orderdb");
const xlsx = require("xlsx");
const del = require("del");
module.exports.OrderLoad = async (req, res) => {
  res.render("kho/Order", {
    title: "Order",
    userId: req.signedCookies.userId,
    html: "",
  });
};

module.exports.DONHANGITEM_3_MY_SearchBox_Web_V1 = async (req, res) => {
  try {
    await db.DONHANGITEM_3_MY_SearchBox_Web_V1().then((result) => {
      res.json({
        data: result,
      });
    });
  } catch (error) {
    res.json({
      data: {},
      message: `Query Failed. Error: ${error}`,
    });
  }
};

module.exports.DONHANGITEM_3_Load_Web_V2 = async (req, res) => {
  const { MY } = req.params;
  try {
    await db.DONHANGITEM_3_Load_Web_V2(MY).then((result) => {
      res.json({
        data: result,
      });
    });
  } catch (error) {
    res.json({
      data: {},
      message: error,
    });
  }
};

module.exports.OrderInserByType = async (req, res) => {
  let lError = {};
  try {
    await db
      .OrderInsertByType(req.file.filename, req.signedCookies.userId)
      .then((result) => {
        res.send(result);
      });
  } catch (error) {
    lError.errMes = "Lỗi: " + error;
    lError.statusErr = false;
    res.send(lError);
  }
};

module.exports.DONHANGITEM_DRAFT_Load_Web_V2 = async (req, res) => {
  try {
    let result = await db.DONHANGITEM_DRAFT_Load_Web_V2(req.params);
    res.json({
      data: result,
    });
  } catch (error) {
    res.json({
      data: [],
    });
  }
};

module.exports.DONHANGITEM_DRAFT_MY_SearchBox_Web_V1 = async (req, res) => {
  try {
    let result = await db.DONHANGITEM_DRAFT_MY_SearchBox_Web_V1();
    res.json({
      data: result,
    });
  } catch (error) {
    res.json({
      data: [],
    });
  }
};

module.exports.OrderDraftImportExcel = async (req, res) => {
  let lError = {};
  try {
    var filename = req.file.filename;
    const destinationPath= path.join(__dirname,"../../public/uploads/")
    const filePath = `${destinationPath}${filename}`;

    let filePathDel = "./public/uploads/" + filename;

    // doc file excel
    const workbook = await xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    //lay header cua excel file
    const workbookHeaders = await xlsx.readFile(filePath, { sheetRows: 1 });
    //tao mang tu workbookHeaders
    const columnsArrayHeaders = await xlsx.utils.sheet_to_json(
      workbookHeaders.Sheets[workbook.SheetNames[0]],
      { header: 1 }
    )[0];
    const formatHeader = [
      "Classification",
      "OrderNo",
      "UnitNo",
      "Style",
      "Cup",
      "Size",
      "Color",
      "OrderQty",
      "Note",
      "MY",
      "TIMECREATE",
      "USERCREATE",
      "TIMEUPDATE",
      "USERUPDATE",
      "DRAFT",
    ];
    if (columnsArrayHeaders.length != formatHeader.length) {
      lError.errMes = "Lỗi: Định dạng cột sai";
      lError.statusErr = false;
      return res.send(lError);
    }
    for (let i = 0; i < columnsArrayHeaders.length; i++) {
      let excelheaderName = columnsArrayHeaders[i];
      let formatheaderName = formatHeader[i];
      if (excelheaderName !== formatheaderName) {
        lError.errMes = `Lỗi: format Header không đúng ( ${excelheaderName} # ${formatheaderName} )`;
        lError.statusErr = false;
        return res.send(lError);
      }
    }

    //do du lieu tu file excel vao mang jsonPagesArray
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

    var arrContent = jsonPagesArray[0].content;
    var arrContentEmptyColor = arrContent.filter((item) => {
      return item.Color == "" || item.Style == "";
    });
    if (arrContentEmptyColor.length > 0) {
      lError.errMes = "Lỗi: Màu hoặc Mã Hàng Trống";
      lError.statusErr = false;
      return res.send(lError);
    }

    for (let i = 0; i < jsonPagesArray[0].content.length; i++) {
      await db.DONHANGITEM_DRAFT_Insert_Web_V1(
        jsonPagesArray[0].content[i],
        req.signedCookies.userId
      );
    }
    // console.log(super_array);
    del([filePathDel]);
    lError.errMes = "Nhập file excel" + filename + " thành công";
    lError.statusErr = true;
    return res.send(lError);
  } catch (error) {
    lError.errMes = "Lỗi " + error;
    lError.statusErr = false;
    return res.send(lError);
  }
};

module.exports.OrderImportExcel = async (req, res) => {
  let lError = {};
  try {
    var filename = req.file.filename;
    const destinationPath= path.join(__dirname,"../../public/uploads/")
    const filePath = `${destinationPath}${filename}`;

    let filePathDel = "./public/uploads/" + filename;

    // doc file excel
    const workbook = await xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    //lay header cua excel file
    const workbookHeaders = await xlsx.readFile(filePath, { sheetRows: 1 });
    //tao mang tu workbookHeaders
    const columnsArrayHeaders = await xlsx.utils.sheet_to_json(
      workbookHeaders.Sheets[workbook.SheetNames[0]],
      { header: 1 }
    )[0];
    const formatHeader = [
      "Classification",
      "OrderNo",
      "UnitNo",
      "Style",
      "Cup",
      "Size",
      "Color",
      "OrderQty",
      "Note",
      "MY",
      "TIMECREATE",
      "USERCREATE",
      "TIMEUPDATE",
      "USERUPDATE",
    ];
    if (columnsArrayHeaders.length != formatHeader.length) {
      lError.errMes = "Lỗi: Định dạng cột sai";
      lError.statusErr = false;
      return res.send(lError);
    }
    for (let i = 0; i < columnsArrayHeaders.length; i++) {
      let excelheaderName = columnsArrayHeaders[i];
      let formatheaderName = formatHeader[i];
      if (excelheaderName !== formatheaderName) {
        lError.errMes = `Lỗi: format Header không đúng ( ${excelheaderName} # ${formatheaderName} )`;
        lError.statusErr = false;
        return res.send(lError);
      }
    }

    //do du lieu tu file excel vao mang jsonPagesArray
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

    var arrContent = jsonPagesArray[0].content;
    var arrContentEmptyColor = arrContent.filter((item) => {
      return item.Color == "" || item.Style == ""; //loc nhung hinh chu nhat co chieu dai lon hon 5
    });
    if (arrContentEmptyColor.length > 0) {
      lError.errMes = "Lỗi: Màu hoặc Mã Hàng Trống";
      lError.statusErr = false;
      return res.send(lError);
    }

    for (let i = 0; i < jsonPagesArray[0].content.length; i++) {
      await db.DONHANGITEM_3_Insert_Web_V1(
        jsonPagesArray[0].content[i],
        req.signedCookies.userId
      );
    }

    // console.log(super_array);
    del([filePathDel]);
    lError.errMes = "Nhập file excel" + filename + " thành công";
    lError.statusErr = true;
    return res.send(lError);
  } catch (error) {
    lError.errMes = "Lỗi " + error;
    lError.statusErr = false;
    return res.send(lError);
  }
};

module.exports.OrderUpdate=async(req,res)=>{
  let lError={}
  try {
    await db.OrderUpdate(req.body,req.signedCookies.userId)
    lError.errMes='Thành công'
    lError.statusErr=true;
    res.send(lError)
  } catch (error) {
    lError.errMes='Lỗi: '+error
    lError.statusErr=false;
    res.send(lError)
  }
}

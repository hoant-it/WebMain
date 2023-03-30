const sql = require("mssql");
const sqlConfig = require("../dbconfig");
const del = require("del");
const xlsx = require("xlsx");

module.exports.GiaCongDayVaiInput = async (filename, userId) => {
    let lError = { errMes: "thành công", statusErr: true };
    let pool = await sql.connect(sqlConfig);
    try {
      
      const filePath = `./public/uploads/${filename}`;
      const workbook = await xlsx.readFile(filePath);
      const sheet_name_list = workbook.SheetNames;
      const workbookHeaders = await xlsx.readFile(filePath, { sheetRows: 1 });
      const columnsArrayHeaders = await xlsx.utils.sheet_to_json(
        workbookHeaders.Sheets[workbook.SheetNames[0]],
        { header: 1 }
      )[0];

      let tGCDV= new sql.Table();
      tGCDV.columns.add("MAHANG", sql.NVarChar(50));
      tGCDV.columns.add("MAUMH", sql.NVarChar(10));
      tGCDV.columns.add("MAUNL", sql.NVarChar(10));
      tGCDV.columns.add("MAMAUCHI", sql.NVarChar(10));
      tGCDV.columns.add("QUYCACH", sql.VarChar(10));
      tGCDV.columns.add("CONGDOAN", sql.NVarChar(10));
      tGCDV.columns.add("TENCONGDOAN", sql.NVarChar(50));
      tGCDV.columns.add("KYHIEUMAY", sql.NVarChar(sql.MAX));
      tGCDV.columns.add("LOAIMAY", sql.NVarChar(50));
      tGCDV.columns.add("MAVITRICHI", sql.VarChar(5));
      tGCDV.columns.add("LOAICHI", sql.NVarChar(50));
      tGCDV.columns.add("BIENDO", sql.Numeric(9,3));
      tGCDV.columns.add("MATDO", sql.Numeric(9,3));
      tGCDV.columns.add("VITRI", sql.Int);
      tGCDV.columns.add("BERONGDAYVAI", sql.Int);
      tGCDV.columns.add("MET_PCS", sql.Numeric(9,3));
      tGCDV.columns.add("GHICHU", sql.NVarChar(200));

      const formatHeader = [
        "MAHANG",
        "MAUMH",
        "MAUNL",
        "MAMAUCHI",
        "QUYCACH",
        "CONGDOAN",
        "TENCONGDOAN",
        "KYHIEUMAY",
        "LOAIMAY",
        "MAVITRICHI",
        "LOAICHI",
        "BIENDO",
        "MATDO",
        "VITRI",
        "BERONGDAYVAI",
        "MET_PCS",
        "GHICHU",
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
        let MAHANG = contentValue.MAHANG;
        let MAUMH = contentValue.MAUMH;
        let MAUNL = contentValue.MAUNL;
        let MAMAUCHI = contentValue.MAMAUCHI.toString();
        let QUYCACH=contentValue.QUYCACH
        let CONGDOAN = contentValue.CONGDOAN;
        let TENCONGDOAN = contentValue.TENCONGDOAN.replace(/\n|\r/g, "");
        let KYHIEUMAY = contentValue.KYHIEUMAY;
        let LOAIMAY = contentValue.LOAIMAY;
        let MAVITRICHI = contentValue.MAVITRICHI;
        let LOAICHI = contentValue.LOAICHI;
        let BIENDO = contentValue.BIENDO === "" ? 0 : contentValue.BIENDO;
        let MATDO = contentValue.MATDO === "" ? 0 : contentValue.MATDO;
        let VITRI=contentValue.VITRI === "" ? 0 : contentValue.VITRI;
        let BERONGDAYVAI=contentValue.BERONGDAYVAI === "" ? 0 : contentValue.BERONGDAYVAI;
        let MET_PCS=contentValue.MET_PCS === "" ? 0 : contentValue.MET_PCS;
        let GHICHU=contentValue.GHICHU.replace(/\n|\r/g, "");

        tGCDV.rows.add(MAHANG,
            MAUMH,
            MAUNL,
            MAMAUCHI,
            QUYCACH,
            CONGDOAN,
            TENCONGDOAN,
            KYHIEUMAY,
            LOAIMAY,
            MAVITRICHI,
            LOAICHI,
            BIENDO,
            MATDO,
            VITRI,
            BERONGDAYVAI,
            MET_PCS,
            GHICHU)
      }

      await pool.request()
      .input('tyleGCDV',tGCDV)
      .input('UserName',sql.NVarChar(50),userId)
      .execute('wacoal_GIACONGDAYVAI_Input_By_Type_Web_V1')

      await del([`./public/uploads/${filename}`]);
      return lError;
    } catch (error) {
      lError.errMes = "Lỗi: " + error;
      lError.statusErr = false;
      return lError;
    }
  };

  module.exports.wacoal_GiaCongDayVai_MaHang_V1 = async (maHang) => {
    try {
      let pool = await sql.connect(sqlConfig);
      let res = await pool
        .request()
        .input("MAHANG", sql.NVarChar(50), maHang)
        .execute("wacoal_GiaCongDayVai_MaHang_V1");
      return res.recordset;
    } catch (error) {
      throw error
    }
  };

  module.exports.wacoal_MaHang_GCDV_Select_V1 = async (maHang) => {
    try {
      let pool = await sql.connect(sqlConfig);
      let res = await pool
        .request()
        .execute("wacoal_MaHang_GCDV_Select_V1");
      return res.recordset;
    } catch (error) {
      throw error
    }
  };

  module.exports.wacoal_GiaCongDayVai_MaHang_CT_V1 = async (maHang) => {
    try {
      let pool = await sql.connect(sqlConfig);
      let res = await pool
        .request()
        .input("MAHANG", sql.NVarChar(50), maHang)
        .execute("wacoal_GiaCongDayVai_MaHang_CT_V1");
      return res.recordset;
    } catch (error) {
      throw error
    }
  };

  
  module.exports.Order_TinhChi_GCDV_Web_V1=async(params)=>{
    const{order,groupKH}=params;
    try {
        let pool=await sql.connect(sqlConfig)
        let result=await pool.request()
        .input('ORDERNO',sql.NVarChar(50),order)
        .input('GROUPKH',sql.NVarChar(50),groupKH)
        .execute('Order_TinhChi_GCDV_Web_V1')
        return result.recordset
    } catch (error) {
        throw error
    }
  }

  module.exports.wacoal_OrderTinhChi_ChiTiet_MaHang_GCDV_Load_Web_V1=async(params)=>{
    const{order,groupKH}=params;
    try {
        let pool=await sql.connect(sqlConfig)
        let result=await pool.request()
        .input('ORDERNO',sql.NVarChar(50),order)
        .input('GROUPKH',sql.NVarChar(50),groupKH)
        .execute('wacoal_OrderTinhChi_ChiTiet_MaHang_GCDV_Load_Web_V1')
        return result.recordset
    } catch (error) {
        throw error
    }
  }


  

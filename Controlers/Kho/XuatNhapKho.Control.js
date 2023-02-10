const db = require("../../databases/kho/XuatNhapKho.Db");
const xlsx = require("xlsx");
const del = require("del");

module.exports.XuatNhapKhoLoad = async (req, res) => {
    res.render("kho/XuatNhapKho", {
      title: "XuatNhapKho",
      userId: req.signedCookies.userId,
      html: "",
    });
  };


  module.exports.LOAICHIITEM_Load_Web_Wacoal_V1= async(req,res)=>{
    
    try {
      result= await db.LOAICHIITEM_Load_Web_Wacoal_V1()
      res.status(200).json({
       data:result
      })
    } catch (error) {
      res.status(403).json({
        data:[]
       })
    }
 
  }

  module.exports.MAUCHIMAUNL_Load_MAUCHI_By_LOAICHI_Web_wacoal_V1= async(req,res)=>{
    
    try {
      result= await db.MAUCHIMAUNL_Load_MAUCHI_By_LOAICHI_Web_wacoal_V1(req.params)
      res.status(200).json({
       data:result
      })
    } catch (error) {
      res.status(403).json({
        data:[]
       })
    }
 
  }

  module.exports.KHOCHITON_Insert_Web_Wacoal_V1=async(req,res)=>{
    let lMes={}
    try {
     await db.KHOCHITON_Insert_Web_Wacoal_V1(req.body,req.signedCookies.userId)
     lMes.status=true;
     lMes.mes="thành công"
    
      
    } catch (error) {
      lMes.status=false;
     lMes.mes="Err: "+error
    }
    res.send(lMes)
  }

  // module.exports.KHOCHITON_Insert_Web_Wacoal_V2=async(req,res)=>{
  //   let lMes={}
  //   try {
  //    await db.KHOCHITON_Insert_Web_Wacoal_V2(req.body,req.signedCookies.userId)
  //    lMes.status=true;
  //    lMes.mes="thành công"
    
      
  //   } catch (error) {
  //     lMes.status=false;
  //    lMes.mes="Err: "+error
  //   }
  //   res.send(lMes)
  // }

  module.exports.KHOCHITON_Insert_Web_Wacoal_V3=async(req,res)=>{
    let lMes={}
    try {
     await db.KHOCHITON_Insert_Web_Wacoal_V3(req.body,req.signedCookies.userId)
     lMes.status=true;
     lMes.mes="thành công"
    
      
    } catch (error) {
      lMes.status=false;
     lMes.mes="Err: "+error
    }
    res.send(lMes)
  }

  module.exports.KHOCHITON_Load_Web_Wacoal_V1= async(req,res)=>{
    
    try {
      result= await db.KHOCHITON_Load_Web_Wacoal_V1()
      res.status(200).json({
       data:result
      })
    } catch (error) {
      res.status(403).json({
        data:[]
       })
    }
 
  }

  module.exports.KHOCHITON_Load_Web_Wacoal_V2= async(req,res)=>{
    
    try {
      result= await db.KHOCHITON_Load_Web_Wacoal_V2()
      res.status(200).json({
       data:result
      })
    } catch (error) {
      res.status(403).json({
        data:[]
       })
    }
 
  }

  

  module.exports.CONGDOAN_MAHANG_LOAICHI_load_By_MAHANG_web_wacoal_v1= async(req,res)=>{
    
    try {
      result= await db.CONGDOAN_MAHANG_LOAICHI_load_By_MAHANG_web_wacoal_v1(req.params)
      res.status(200).json({
       data:result
      })
    } catch (error) {
      res.status(403).json({
        data:[]
       })
    }
 
  }

  module.exports.CONGDOAN_MAHANG_MAMAUCHI_Load_By_MAHANG_LOAICHI_web_wacoal_v1= async(req,res)=>{
    
    try {
      result= await db.CONGDOAN_MAHANG_MAMAUCHI_Load_By_MAHANG_LOAICHI_web_wacoal_v1(req.params)
      res.status(200).json({
       data:result
      })
    } catch (error) {
      res.status(403).json({
        data:[]
       })
    }
 
  }
  
  module.exports.KHOCHITON_LichSuNhap_web_wacoal_v1= async(req,res)=>{
    
    try {
      result= await db.KHOCHITON_LichSuNhap_web_wacoal_v1()
      res.status(200).json({
       data:result
      })
    } catch (error) {
      res.status(403).json({
        data:[]
       })
    }
 
  }

  module.exports.KHOCHITON_LichSuXuat_web_wacoal_v1= async(req,res)=>{
    
    try {
      result= await db.KHOCHITON_LichSuXuat_web_wacoal_v1()
      res.status(200).json({
       data:result
      })
    } catch (error) {
      res.status(403).json({
        data:[]
       })
    }
 
  }

  module.exports.NhapKhoImportExcel = async (req, res) => {
    let lError = {};
    try {
      var filename = req.file.filename;
      let filePath = "./public/uploads/" + filename;
  
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
        "LOAICHI",
        "MAUCHI",
        "SLCUONNHAP",
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
        return item.LOAICHI == "" || item.MAUCHI == "";
      });
      if (arrContentEmptyColor.length > 0) {
        lError.errMes = "Lỗi: Loại chỉ hoặc Màu Chỉ trống";
        lError.statusErr = false;
        return res.send(lError);
      }
  
      for (let i = 0; i < jsonPagesArray[0].content.length; i++) {
        let loaiChi=jsonPagesArray[0].content[i].LOAICHI
        let mauChi=jsonPagesArray[0].content[i].MAUCHI
        let slNhap=parseInt(jsonPagesArray[0].content[i].SLCUONNHAP) 
        let slNhapMet=0;
        if(loaiChi==='WA' || loaiChi==='WB'){
          slNhapMet=slNhap*7000
        }else{
          slNhapMet=slNhap*5000
        }
        const data={
          loaiChi:loaiChi,
          mauChi:mauChi,
          slNhap:slNhap,
          slXuat:0,
          maHang:'',
          slNhapMet:slNhapMet,
          slXuatMet:0
        }
        await db.KHOCHITON_Insert_Web_Wacoal_V3(
          data,
          req.signedCookies.userId
        );
      }
      // console.log(super_array);
      del([filePath]);
      lError.errMes = "Nhập file excel" + filename + " thành công";
      lError.statusErr = true;
      return res.send(lError);
    } catch (error) {
      lError.errMes = "Lỗi " + error;
      lError.statusErr = false;
      return res.send(lError);
    }
  };


  
  
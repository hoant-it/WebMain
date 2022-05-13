
const db= require('../../databases/kho/MauChiMauNL.Db')
const xlsx = require('xlsx');
const del = require("del");

module.exports.MauChiMauNLLoad= async (req, res ) => {
    res.render('kho/MauChiMauNL',{
        title:'Màu Chỉ Theo Màu Nguyên Liệu',
        userId:req.signedCookies.userId,
        html:'',
    })
}

module.exports.wacoal_MAUCHIMAUNL_Load_Web_V1= async(req,res)=>{
    try {
        let result= await db.wacoal_MAUCHIMAUNL_Load_Web_V1()

        res.json({
            data:result
        })
        
    } catch (error) {
        res.json({
            data:[]
        })
    }
}

module.exports.MauChiMauNLInputajax = async (req, res) => {
    let lError = { errMes: "thành công", statusErr: true };
    try {
    var filename=req.file.filename;
    let filePath='./public/uploads/'+filename+'';
    const workbook = await xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const workbookHeaders = await xlsx.readFile(filePath, { sheetRows: 1 });
    const columnsArrayHeaders = await xlsx.utils.sheet_to_json(
        workbookHeaders.Sheets[workbook.SheetNames[0]],
        { header: 1 }
      )[0];
      const formatHeader = ["MAUNL", "LOAICHI", "MAUCHI"]
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

      for (var i = 0; i < jsonPagesArray[0].content.length; i++) {
        arrJS=jsonPagesArray[0].content[i];
        if(arrJS.MAUCHI=='')continue;
        await db.wacoal_MAUCHIMAUNL_Import_excel_Web_V1(arrJS.MAUNL,arrJS.LOAICHI,arrJS.MAUCHI,req.signedCookies.userId)
        }
        del(['./public/excel/' + filename]);
        return res.send(lError); 
    } catch (error) {
        lError.errMes = 'Lỗi' +error
        lError.statusErr = false;
        return res.send(lError);
    }
}

module.exports.MauChiMauNLUpdate=async(req,res)=>{
  let lError={}
  try {
    await db.MauChiMauNLUpdate(req.body,req.signedCookies.userId)
    lError.errMes='Thành công'
    lError.statusErr=true;
    res.send(lError)
  } catch (error) {
    lError.errMes='Lỗi: '+error
    lError.statusErr=false;
    res.send(lError)
  }
}

module.exports.wacoal_LOAICHIITEM_Load_V1=async(req,res)=>{
  try {
    let result= await db.wacoal_LOAICHIITEM_Load_V1()
    res.json({
      data:result
    })
  } catch (error) {
    res.json({
      data:[]
    })
  }

}

module.exports.MAUCHIMAUNL_Delete_Web_V1=async(req,res)=>{
  let lError={}
  try {
    await db.MAUCHIMAUNL_Delete_Web_V1(req.body)
    lError.errMes='Thành công'
    lError.statusErr=true;
    res.send(lError)
    
  } catch (error) {
    lError.errMes='Lỗi: '+error
    lError.statusErr=false;
    res.send(lError)
  }
}
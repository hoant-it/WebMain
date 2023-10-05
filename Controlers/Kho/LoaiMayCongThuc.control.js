
const db= require('../../databases/kho/LoaiMayCongThuc.Db')
const xlsx = require('xlsx');
const del = require("del");

module.exports.LoaiMayCongThucLoad= async (req, res ) => {
    res.render('kho/LoaiMayCongThuc',{
        title:'Loại Máy Công Thức tính chỉ',
        userId:req.signedCookies.userId,
        html:'',
    })
}

module.exports.wacoal_LOAIMAYCT_Load_Web_V1= async(req,res)=>{
    try {
        let result= await db.wacoal_LOAIMAYCT_Load_Web_V1()

        res.json({
            data:result
        })
        
    } catch (error) {
        res.json({
            data:[]
        })
    }
}



module.exports.LOAIMAYCTUpdate=async(req,res)=>{
  let lError={}
  try {
    await db.LOAIMAYCTUpdate(req.body,req.signedCookies.userId)
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

module.exports.wacoal_LOAIMAYCT_Delete_Web_V1=async(req,res)=>{
  let lError={}
  try {
    await db.wacoal_LOAIMAYCT_Delete_Web_V1(req.body,req.signedCookies.userId)
    lError.errMes='Thành công'
    lError.statusErr=true;
    res.send(lError)
    
  } catch (error) {
    lError.errMes='Lỗi: '+error
    lError.statusErr=false;
    res.send(lError)
  }
}
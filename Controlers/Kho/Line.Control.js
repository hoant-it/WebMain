const db= require('../../databases/kho/Line.Db')
// const xlsx = require('xlsx');
// const del = require("del");

module.exports.Line= async (req, res ) => {
    res.render('kho/Line',{
        title:'Line',
        userId:req.signedCookies.userId,
        html:'',
    })
}

module.exports.wacoal_Line_Load_Web_V1= async(req,res)=>{
    try {
        let result= await db.wacoal_Line_Load_Web_V1()

        res.json({
            data:result
        })
        
    } catch (error) {
        res.json({
            data:[]
        })
    }
}

module.exports.LineUpdate=async(req,res)=>{
  let lError={}
  try {
    await db.LineUpdate(req.body,req.signedCookies.userId)
    lError.errMes='Thành công'
    lError.statusErr=true;
    res.send(lError)
  } catch (error) {
    lError.errMes='Lỗi: '+error
    lError.statusErr=false;
    res.send(lError)
  }
}

module.exports.Line_Delete_Web_V1=async(req,res)=>{
  let lError={}
  try {
    await db.Line_Delete_Web_V1(req.body)
    lError.errMes='Thành công'
    lError.statusErr=true;
    res.send(lError)
    
  } catch (error) {
    lError.errMes='Lỗi: '+error
    lError.statusErr=false;
    res.send(lError)
  }
}
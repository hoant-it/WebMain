const db=require('../../databases/kho/KeHang.Db')

module.exports.kehangLoad = async (req,res) =>{
    res.render('kho/kehang',{
        title:'Quản Lý Ô Kệ',
        userId:req.signedCookies.userId,
        html:"",
    })
  }

  module.exports.wacoal_KEHANG_Load_By_Id_Web_V1=async(req,res)=>{
    lMes={}
    try {
        let ID =req.params.ID
        let result= await db.wacoal_KEHANG_Load_By_Id_Web_V1(ID)
        lMes.keHangName=result[0].SHEFTDES
        lMes.status=true
        res.send(lMes);
        
    } catch (error) {
        lMes.keHangName=error
        lMes.status=false
        res.send(lMes);
    }
}

module.exports.wacoal_KEHANG_Web_Load_V1=async(req,res)=>{
    try {
        let result= await db.wacoal_KEHANG_Web_Load_V1()
        res.json({
            data:result
        })
    } catch (error) {
        res.json({
            data:[]
        })
    }
}

module.exports.wacoal_KHONL_Web_Load_V1=async(req,res)=>{
    try {
        let result= await db.wacoal_KHONL_Web_Load_V1(req.params)
        res.json({
            data:result
        })
    } catch (error) {
        res.json({
            data:[]
        })
    }
}

module.exports.SaveKeHangToDatabase=async(req,res)=>{
    let lError={statusErr:true,errMes:'Thành Công'}
    try {
        await db.SaveKeHangToDatabase(req.body,req.signedCookies.userId)
        res.send(lError)
    } catch (error) {
        lError.statusErr=false
        lError.errMes='Lỗi '+error
        res.send(lError)
    }
}

module.exports.wacoal_KHONLXUAT_Load_By_KHONLID_web_V1=async(req,res)=>{
    try {
        let result= await db.wacoal_KHONLXUAT_Load_By_KHONLID_web_V1(req.params)
        res.json({
            data:result
        })
    } catch (error) {
        res.json({
            data:[]
        })
    }
}

module.exports.uploadKeHang = async(req,res)=>{
    let lError={}
    try {
        let result= await db.uploadKeHang(req.file.filename,req.signedCookies.userId)
        res.send(result);
    } catch (error) {
        lError.errMes = "Lỗi: " + error;
        lError.statusErr = false;
        res.send(lError)
    }
}
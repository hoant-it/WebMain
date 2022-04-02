var db= require('../../databases/kho/CongDoanMaHang.Db')

module.exports.CongDoanMaHangLoad= async (req, res ) => {
    res.render('kho/CongDoanMaHang',{
        title:'Cong Doan Ma Hang',
        userId:req.signedCookies.userId,
        html:'',
    })
}

module.exports.wacoal_MaHang_Select_V1 = async(req, res) =>{
    try {
       await  db.wacoal_MaHang_Select_V1().then(result=>{
           res.json({
               data:result,
               message:`ok`
           })
       })
        
    } catch (error) {
        res.json({
            data:{},
            message:`Err ${error}`
        })
    
    }
}

module.exports.wacoal_TinhChi_MaHang_V1 = async(req, res) =>{
    const{MAHANG}= req.params
    // console.log('mahang ' + MAHANG)
    
    try {
       await  db.wacoal_TinhChi_MaHang_V1(MAHANG).then(result=>{
           res.json({
               data:result,
               message:`ok`
           })
       })
        
    } catch (error) {
        res.json({
            data:{},
            message:`Err ${error}`
        })
    
    }
}

module.exports.CONGDOAN_MAHANG_New_Web_Load_V1 = async(req,res) =>{
    try {
         await db.CONGDOAN_MAHANG_New_Web_Load_V1().then(result=>{
            res.json({
                data:result,
                message:'ok'
           })
         });
    } catch (error) {
        res.json({
            data:{},
            message:'Err: '+error
       })
        
    }
}

module.exports.wacoal_MauNL_LoaiChi_Moi_Load_Web_V1 = async(req,res) =>{
    try {
        await db.wacoal_MauNL_LoaiChi_Moi_Load_Web_V1().then(result=>{
            res.json({
                data:result,
                message:'ok'
            })
        })
        
    } catch (error) {
        res.json({
            data:{},
            message:'Err: '+error
        })
        
    }
}
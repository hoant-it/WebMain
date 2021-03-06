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
        const result= await db.wacoal_MaHang_Select_V1()
        res.json({
            data:result
        })
    } catch (error) {
        const dataErr=[{
            MAHANG: 'Err',
            MAHANGNAME_VN: 'Err',
            MAHANGNAME_EN: 'Err',
            TIMECREATE: '',
            USERCREATE: '',
            TIMEUPDATE: '',
            USERUPDATE: ''
          }]
        res.json({
            data:dataErr
        })
    }
}

module.exports.wacoal_TinhChi_MaHang_V2 = async(req, res) =>{
    const{MAHANG}= req.params
    try {
       await  db.wacoal_TinhChi_MaHang_V2(MAHANG).then(result=>{
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

module.exports.CongDoanMaHangInput = async(req,res)=>{
    let lError={}
    try {
        let result= await db.CongDoanMaHangInput(req.file.filename,req.signedCookies.userId)
        res.send(result);
    } catch (error) {
        lError.errMes = "L???i: " + error;
        lError.statusErr = false;
        res.send(lError)
    }
}



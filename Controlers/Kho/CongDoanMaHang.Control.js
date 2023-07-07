var db= require('../../databases/kho/CongDoanMaHang.Db')

module.exports.CongDoanMaHangLoad= async (req, res ) => {
    res.render('kho/CongDoanMaHang',{
        title:'Cong Doan Ma Hang',
        userId:req.signedCookies.userId,
        html:'',
    })
}

module.exports.CongDoanMaHangV3= async (req, res ) => {
    res.render('kho/CongDoanMaHangV3',{
        title:'Cong Doan Ma Hang',
        userId:req.signedCookies.userId,
        html:'',
    })
}

module.exports.CongDoanMaHangV4= async (req, res ) => {
    res.render('kho/CongDoanMaHangV4',{
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

module.exports.wacoal_TinhChi_MaHang_V3 = async(req, res) =>{
    const{MAHANG}= req.params
    try {
       await  db.wacoal_TinhChi_MaHang_V3(MAHANG).then(result=>{
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

module.exports.wacoal_MauNL_LoaiChi_Moi_MH_Load_Web_V1 = async(req,res) =>{
    try {
        await db.wacoal_MauNL_LoaiChi_Moi_MH_Load_Web_V1().then(result=>{
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
        lError.errMes = "Lỗi: " + error;
        lError.statusErr = false;
        res.send(lError)
    }
}

module.exports.CONGDOAN_MAHANG_Load_By_MaHang_Web_Wacoal_V1 = async(req,res) =>{
    try {
        await db.CONGDOAN_MAHANG_Load_By_MaHang_Web_Wacoal_V1(req.params).then(result=>{
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

module.exports.LOAIMAY_New_load_Wacoal_Web_V1 = async(req,res) =>{
    try {
        await db.LOAIMAY_New_load_Wacoal_Web_V1(req.params).then(result=>{
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

module.exports.LoaiChi_New_load_Wacoal_Web_V1 = async(req,res) =>{
    try {
        await db.LoaiChi_New_load_Wacoal_Web_V1(req.params).then(result=>{
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





const db = require("../../databases/kho/GiaCongDayVai.Db");

module.exports.GiaCongDayVaiLoad= async(req,res)=>{
    res.render("kho/GiaCongDayVai", {
        title: "Gia Công Dây Vai",
        userId: req.signedCookies.userId,
        html: "",
      });
}

module.exports.GiaCongDayVaiInput = async(req,res)=>{
    let lError={}
    try {
        let result= await db.GiaCongDayVaiInput(req.file.filename,req.signedCookies.userId)
        res.send(result);
    } catch (error) {
        lError.errMes = "Lỗi: " + error;
        lError.statusErr = false;
        res.send(lError)
    }
}



module.exports.wacoal_GiaCongDayVai_MaHang_V1 = async(req, res) =>{
    const{MAHANG}= req.params
    try {
       await  db.wacoal_GiaCongDayVai_MaHang_V1(MAHANG).then(result=>{
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

module.exports.wacoal_MaHang_GCDV_Select_V1 = async(req, res) =>{
    try {
       await  db.wacoal_MaHang_GCDV_Select_V1().then(result=>{
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

module.exports.wacoal_GiaCongDayVai_MaHang_CT_V1 = async(req, res) =>{
    const{MAHANG}= req.params
    try {
       await  db.wacoal_GiaCongDayVai_MaHang_CT_V1(MAHANG).then(result=>{
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

module.exports.GCDVOrderTinhChi = async (req,res) =>{
    res.render('kho/GCDVOrderTinhChi',{
        title:'Tính Chỉ Gia Công Dây Vai',
        userId:req.signedCookies.userId,
        html:"",
    })
  }

  module.exports.Order_TinhChi_GCDV_Web_V1=async(req,res)=>{
    try {
      let result=await db.Order_TinhChi_GCDV_Web_V1(req.params)
      res.json({
          data:result
      })
    } catch (error) {
      res.json({
          data:[]
      })
    }
  
  }

  module.exports.wacoal_OrderTinhChi_ChiTiet_MaHang_GCDV_Load_Web_V1=async(req,res)=>{
    try {
      let result=await db.wacoal_OrderTinhChi_ChiTiet_MaHang_GCDV_Load_Web_V1(req.params)
      res.json({
          data:result
      })
    } catch (error) {
      res.json({
          data:[]
      })
    }
  
  }


  module.exports.wacoal_MaHang_GCDV_Select_V1 = async(req, res) =>{
    try {
        const result= await db.wacoal_MaHang_GCDV_Select_V1()
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

module.exports.GCDV_Load_By_MaHang_Web_Wacoal_V1 = async(req,res) =>{
    console.log("params:" +req.params)
    try {
        await db.GCDV_Load_By_MaHang_Web_Wacoal_V1(req.params).then(result=>{
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

module.exports.wacoal_TinhChi_GCDV_MaHang_V1 = async(req, res) =>{
    const{MaHang}= req.params
    try {
       await  db.wacoal_TinhChi_GCDV_MaHang_V1(MaHang).then(result=>{
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
  

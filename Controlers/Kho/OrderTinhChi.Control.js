const db=require('../../databases/kho/OrderTinhChi.Db')

module.exports.OrderTinhChiLoad = async (req,res) =>{
    res.render('kho/KhoOderTinhChiGridViewDev',{
        title:'Tính Chỉ Theo Đơn Hàng',
        userId:req.signedCookies.userId,
        html:"",
    })
  }

  module.exports.Khowacoal_KHACHHANG_load_Web_V1=async(req,res)=>{
      try {
        let result=await db.Khowacoal_KHACHHANG_load_Web_V1()
        res.json({
            data:result
        })
      } catch (error) {
        res.json({
            data:[]
        })
      }

  }

  module.exports.wacoal_DONHANGHEAD_Load_Web_V1=async(req,res)=>{
    try {
      let result=await db.wacoal_DONHANGHEAD_Load_Web_V1()
      res.json({
          data:result
      })
    } catch (error) {
      res.json({
          data:[]
      })
    }

}

module.exports.khoOrderTinhchiGridviewMaHangMiss=async(req,res)=>{
    try {
      let result=await db.khoOrderTinhchiGridviewMaHangMiss(req.params)
      res.json({
          data:result
      })
    } catch (error) {
      res.json({
          data:[]
      })
    }

}

module.exports.Order_TinhChi_Web_V4=async(req,res)=>{
    try {
      let result=await db.Order_TinhChi_Web_V4(req.params)
      res.json({
          data:result
      })
    } catch (error) {
      res.json({
          data:[]
      })
    }

}

module.exports.OrderTinhChiPost=async(req,res)=>{
    try {
        let arrMaHangmiss=await db.OrderTinhChiPost(req.body)
        res.send(arrMaHangmiss)
    } catch (error) {
        res.send([])
    }
}

module.exports.OrderMaHangMiss=async(req,res)=>{
    try {
        let result=await db.OrderMaHangMiss(req.params)
         res.json({
          data:result
      })
    } catch (error) {
         res.json({
          data:[]
      })
    }
}

module.exports.wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V4=async(req,res)=>{
    try {
      let result=await db.wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V4(req.params)
      res.json({
          data:result
      })
    } catch (error) {
      res.json({
          data:[]
      })
    }

}


//tinh chi theo order V2


module.exports.OrderTinhChiLoadV2 = async (req,res) =>{
  res.render('kho/KhoOderTinhChiGridViewDevV2',{
      title:'Tính Chỉ Theo Đơn Hàng',
      userId:req.signedCookies.userId,
      html:"",
  })
}

module.exports.wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V5=async(req,res)=>{

  try {
    let userId=req.signedCookies.userId
    let result=await db.wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V5(req.params,userId)
    res.json({
        data:result
    })
  } catch (error) {
    res.json({
        data:[]
    })
  }

}

module.exports.Order_TinhChi_Web_V5=async(req,res)=>{
  try {
    let result=await db.Order_TinhChi_Web_V5(req.params,req.signedCookies.userId)
    res.json({
        data:result
    })
  } catch (error) {
    res.json({
        data:[]
    })
  }

}

module.exports.wacoal_KHOCHIHEADER_Load_Web_V1=async(req,res)=>{
  try {
    let result=await db.wacoal_KHOCHIHEADER_Load_Web_V1(req.body)
    res.send(result)
  } catch (error) {
    res.send([])
  }

}


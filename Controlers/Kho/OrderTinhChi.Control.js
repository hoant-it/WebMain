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




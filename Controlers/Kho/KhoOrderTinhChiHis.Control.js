const db= require('../../databases/kho/OrderTinhChiHis.Db')

module.exports.OrderTinhChiHisLoad = async (req,res) =>{
    res.render('kho/KhoOrderTinhChiHistory',{
        title:'Tính Chỉ Theo Đơn Hàng',
        userId:req.signedCookies.userId,
        html:"",
    })
  }

  module.exports.KHOCHIHEADER_ORDERNO_load_web_wacoal_v1= async(req,res)=>{
    try {
        let result= await db.KHOCHIHEADER_ORDERNO_load_web_wacoal_v1()
        return res.json({
            data:result

        })
    } catch (error) {
        return res.json({
            data:[]
        })
    }
  }

  module.exports.KHOCHIHEADER_GROUPKH_Load_web_wacoal_V1= async(req,res)=>{
    try {
        let result= await db.KHOCHIHEADER_GROUPKH_Load_web_wacoal_V1(req.params)
        return res.json({
            data:result

        })
    } catch (error) {
        return res.json({
            data:[]
        })
    }
  }

module.exports.KHOCHIDETAIL_Load_By_Order_GroupKH_web_wacoal_V1 = async(req,res)=>{
    try {
        let result= await db.KHOCHIDETAIL_Load_By_Order_GroupKH_web_wacoal_V1(req.params)
        return res.json({
            data:result
        })
    } catch (error) {
        return res.json({
            data:[]
        })
    }
}

module.exports.KHOCHIDETAILGROUP_Load_web_wacoal_V1 = async(req,res)=>{
    try {
        let result= await db.KHOCHIDETAILGROUP_Load_web_wacoal_V1(req.params)
        return res.json({
            data:result
        })
    } catch (error) {
        return res.json({
            data:[]
        })
    }
}

module.exports.KHOCHIHEADER_TIMECREATE_USERCREATE_load_web_wacoal_V1 = async(req,res)=>{

    try {
        let result= await db.KHOCHIHEADER_TIMECREATE_USERCREATE_load_web_wacoal_V1(req.body)
        return res.send(result)
    } catch (error) {
        return res.send([])
    }
}


  

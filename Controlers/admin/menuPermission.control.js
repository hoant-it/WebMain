const db= require('../../databases/admin/menuPermission.db')

module.exports.MenuPermissionLoad=async(req,res)=>{
    res.render('admin/MenuPermission',{
        title: "MenuPermission List",
        userId: req.signedCookies.userId,
        html: "",
    })
}

module.exports.wacoal_ListMenu_By_Rule_Load_Web_v2= async(req,res)=>{
    try {
        let data= await db.wacoal_ListMenu_By_Rule_Load_Web_v2(req.params)
        res.json({
            data:data
        })
    } catch (error) {
        res.json({
            data:[]
        })
    }
}

module.exports.wacoal_PermisionGroupCode_load_Web_v2= async(req,res)=>{
    try {
        let data= await db.wacoal_PermisionGroupCode_load_Web_v2()
        res.json({
            data:data
        })
    } catch (error) {
        res.json({
            data:[]
        })
    }
}


module.exports.MenupermissionUpdateRule = async(req,res)=>{
    lMes={}
    try {
        let result= await db.MenupermissionUpdateRule(req.body)
        if(result[0]===1){
            lMes.status=true
            lMes.mes="Cập Nhật thành công"
            res.send(lMes)
        }else{
            lMes.status=false
            lMes.mes="lỗi: "
            res.send(lMes) 
        }
        
    } catch (error) {
        lMes.status=false
        lMes.mes="lỗi: "+error
        res.send(lMes)
    }
}

module.exports.MenupermissionDeleteRule = async(req,res)=>{
    lMes={}
    try {
        let result= await db.MenupermissionDeleteRule(req.body)
        if(result[0]===1){
            lMes.status=true
            lMes.mes="Xóa thành công"
            res.send(lMes)
        }else{
            lMes.status=false
            lMes.mes="lỗi: "
            res.send(lMes) 
        }
        
    } catch (error) {
        lMes.status=false
        lMes.mes="lỗi: "+error
        res.send(lMes)
    }
}


module.exports.MenuListLoadWeb=async(req,res)=>{
    try {
        let result= await db.MenuListLoadWeb(req.params)
        res.json({
            data:result
        })
        
    } catch (error) {
        res.json({
            data:[]
        })
        
    }
}

module.exports.MenuPermissionUpdate= async(req,res)=>{
    let lMes={}
    try {
        lMes= await db.MenuPermissionUpdate(req.body)
        res.send(lMes)
    } catch (error) {
        lMes.reload=false
        lMes.status = false
        lMes.mes = "Lỗi: "+error
        res.send(lMes)
    }
}
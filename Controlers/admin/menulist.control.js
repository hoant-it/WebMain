const db= require('../../databases/admin/menu.db')

module.exports.MenuLoad=async(req,res)=>{
    res.render('admin/ListMenu',{
        title: "Menu List",
        userId: req.signedCookies.userId,
        html: "",
    })
}

module.exports.wacoal_ListMenu_Load_website_v1=async(req,res)=>{
    try {
        let data= await db.wacoal_ListMenu_Load_website_v1()
        res.json({
            data:data
        })
        
    } catch (error) {
        res.json({
            data:[]
        })
    }
}

module.exports.sp_CNY_Menu_CreateMenuCode= async(req,res)=>{
    lMes={}
    try {
        let data= await db.sp_CNY_Menu_CreateMenuCode()
        lMes.status=true
        lMes.data=data;
        res.send(lMes)
        
    } catch (error) {
        lMes.status=false
        lMes.data=[];
        res.send(lMes)
    }
}

module.exports.saveToDatabase = async(req,res)=>{
    lMes={}
    try {
        let result= await db.saveToDatabase(req.body)
        if(result[0]==1){
            lMes.status=true
            lMes.mes="Cập nhật thành công"
            res.send(lMes)
        } else{
            lMes.status=false
            lMes.mes="Lỗi"
            res.send(lMes)
        }
    } catch (error) {
        lMes.status=false
            lMes.mes="Lỗi: "+error
            res.send(lMes)
    }
}

module.exports.MenuListDelete = async(req,res)=>{
    lMes={}
    try {
        let result= await db.MenuListDelete(req.body)
        if(result[0]==1){
            lMes.status=true
            lMes.mes="Cập nhật thành công"
            res.send(lMes)
        } else{
            lMes.status=false
            lMes.mes="Lỗi"
            res.send(lMes)
        }
    } catch (error) {
        lMes.status=false
            lMes.mes="Lỗi: "+error
            res.send(lMes)
    }
}
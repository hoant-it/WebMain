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
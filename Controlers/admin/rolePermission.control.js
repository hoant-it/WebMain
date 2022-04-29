const db= require('../../databases/admin/rolePermission.db')

module.exports.RolePermissionLoad= async(req,res)=>{
    res.render('admin/RolePermission',{
        title: "RolePermission List",
        userId: req.signedCookies.userId,
        html: "",
    })
}

module.exports.wacoal_ListUserGroup_Load_Web_V2=async(req,res)=>{
    try {
        let result= await db.wacoal_ListUserGroup_Load_Web_V2()
        res.json({
            data:result
        })
        
    } catch (error) {
        res.json({
            data:[]
        })
    }
 
}
module.exports.RolePermissionUpdate=async(req,res)=>{
    let lMes={}
    try {
        let result=await db.RolePermissionUpdate(req.body)
        if(result){
            lMes.status=true
            lMes.mes="Cập nhật thành công"
            res.send(lMes)
        }else{
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

module.exports.RolePermissionDelete=async(req,res)=>{
   let lMes={}
    try {
        let result=await db.RolePermissionDelete(req.body)
        if(result){
            lMes.status=true
            lMes.mes="Xóa thành công"
            res.send(lMes)
        }else{
            lMes.status=false
            lMes.mes="Lỗi: "
            res.send(lMes)
        }
     
    } catch (error) {
        lMes.status=false
        lMes.mes="Lỗi: "+error
        res.send(lMes)
        
    }
}

module.exports.RuleInRoleLoad=async(req,res)=>{
    try {
        let result= await db.RuleInRoleLoad(req.params)
        res.json({
            data:result
        })
        
    } catch (error) {
        res.json({
            data:[]
        })
        
    }
  
}

module.exports.ListPermisionGroupLoad=async(req,res)=>{
    try {
        let result= await db.ListPermisionGroupLoad(req.params)
        res.json({
            data:result
        })
        
    } catch (error) {
        res.json({
            data:[]
        })
        
    }
  
}

module.exports.UserInRoleLoad=async(req,res)=>{
    try {
        let result= await db.UserInRoleLoad(req.params)
        res.json({
            data:result
        })
        
    } catch (error) {
        res.json({
            data:[]
        })
        
    }
  
}

module.exports.UserListLoad=async(req,res)=>{
    try {
        let result= await db.UserListLoad(req.params)
        res.json({
            data:result
        })
        
    } catch (error) {
        res.json({
            data:[]
        })
        
    }
  
}

module.exports.RolePermissionmoveRuleInRole=async(req,res)=>{
    lMes={}
    try {
        let result= await db.RolePermissionmoveRuleInRole(req.body)
       if(result){
           lMes.status=true
           lMes.mes=''
       }else{
        lMes.status=false
        lMes.mes='Lỗi'
       }
       res.send(lMes)
    } catch (error) {
        lMes.status=false
        lMes.mes='Lỗi: '+error
        res.send(lMes)
    }
}

module.exports.RolePermissiondeleteRuleInRole=async(req,res)=>{
    lMes={}
    try {
        let result= await db.RolePermissiondeleteRuleInRole(req.body)
       if(result){
           lMes.status=true
           lMes.mes=''
       }else{
        lMes.status=false
        lMes.mes='Lỗi'
       }
       res.send(lMes)
    } catch (error) {
        lMes.status=false
        lMes.mes='Lỗi: '+error
        res.send(lMes)
    }
}

module.exports.RolePermissionMoveUserInrRole=async(req,res)=>{
    lMes={}
    try {
        let result= await db.RolePermissionMoveUserInrRole(req.body)
       if(result){
           lMes.status=true
           lMes.mes=''
       }else{
        lMes.status=false
        lMes.mes='Lỗi'
       }
       res.send(lMes)
    } catch (error) {
        lMes.status=false
        lMes.mes='Lỗi: '+error
        res.send(lMes)
    }
}

module.exports.RolePermissionDeleteUserInRole=async(req,res)=>{
    lMes={}
    try {
        let result= await db.RolePermissionDeleteUserInRole(req.body)
       if(result){
           lMes.status=true
           lMes.mes=''
       }else{
        lMes.status=false
        lMes.mes='Lỗi'
       }
       res.send(lMes)
    } catch (error) {
        lMes.status=false
        lMes.mes='Lỗi: '+error
        res.send(lMes)
    }
}







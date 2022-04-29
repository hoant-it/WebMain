const db=require('../../databases/admin/department.db')

module.exports.DepartmentLoad= async(req,res)=>{
    res.render('admin/Department',{
        title: "RolePermission List",
        userId: req.signedCookies.userId,
        html: "",
    })
}

module.exports.ListDepartment_Load_Web_V1=async(req,res)=>{
    try {
        let result=await db.ListDepartment_Load_Web_V1()
        res.json({
            data:result
        })
        
    } catch (error) {
        res.json({
            data:[]
        })
    }
}

module.exports.ListCompany_Load_Web_V1=async(req,res)=>{
    try {
        let result=await db.ListCompany_Load_Web_V1()
        res.json({
            data:result
        })
        
    } catch (error) {
        res.json({
            data:[]
        })
    }
}

module.exports.ListDepartmentPostUpdate= async(req,res)=>{
    lMes={}
    try {
        let result= await db.ListDepartmentPostUpdate(req.body)
        if(result){
            lMes.status=true
            lMes.mes="Cập Nhật thành công"
            res.send(lMes)
        }else{
            lMes.status=false
            lMes.mes="Lỗi"
            res.send(lMes)
        }
    } catch (error) {
        lMes.status=false
        lMes.mes="Lỗi:" +error
        res.send(lMes)
    }
}

module.exports.ListDepartmentDelete=async(req,res)=>{
    lMes={}
    try {
        let result= await db.ListDepartmentDelete(req.body)
        if(result){
            lMes.status=true
            lMes.mes="Cập Nhật thành công"
            res.send(lMes)
        }else{
            lMes.status=false
            lMes.mes="Lỗi"
            res.send(lMes)
        }
    } catch (error) {
        lMes.status=false
        lMes.mes="Lỗi:" +error
        res.send(lMes)
    }
}

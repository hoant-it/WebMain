const db =require('../../databases/admin/user.db')

module.exports.UserListLoad=async(req,res)=>{
    res.render('admin/UserList',{
        title: "User List",
        userId: req.signedCookies.userId,
        html: "",
    })
}

module.exports.wacoal_GetUserList_Web_V1=async(req,res)=>{
    try {
        let data= await db.wacoal_GetUserList_Web_V1()
        res.json({
            data:data
        })
    } catch (error) {
        res.json({
            data:[]
        })
    }
}
module.exports.ListDepartment_Load_Web_V1=async(req,res)=>{
    try {
        let data= await db.ListDepartment_Load_Web_V1()
        res.json({
            data:data
        })
    } catch (error) {
        res.json({
            data:[]
        })
    }
}

module.exports.UserListSavetoDatabase= async(req,res)=>{
    lMes={}
    try {
        let result=await db.UserListSavetoDatabase(req.body,req.signedCookies.userId)
        console.log(result)
        if(result[0]===1){
            lMes.status=true
            lMes.mes='cập nhật thành công'
            res.send(lMes)
        }else{
            lMes.status=false
            lMes.mes='Err'
            res.send(lMes)
        }
    } catch (error) {
        lMes.status=false
        lMes.mes='Err:' +error
        res.send(lMes)
    }
}

module.exports.deleteData=async(req,res)=>{
    lMes={}
    try {
        let result=await db.deleteData(req.body)
        console.log(result)
        if(result[0]===1){
            lMes.status=true
            lMes.mes='cập nhật thành công'
            res.send(lMes)
        }else{
            lMes.status=false
            lMes.mes='Err'
            res.send(lMes)
        }
    } catch (error) {
        lMes.status=false
        lMes.mes='Err:' +error
        res.send(lMes)
    }

}

module.exports.resetPass=async(req,res)=>{
    lMes={}
    try {
        let result=await db.resetPass(req.body)
        console.log(result)
        if(result[0]===1){
            lMes.status=true
            lMes.mes='cập nhật thành công'
            res.send(lMes)
        }else{
            lMes.status=false
            lMes.mes='Err'
            res.send(lMes)
        }
    } catch (error) {
        lMes.status=false
        lMes.mes='Err:' +error
        res.send(lMes)
    }

}
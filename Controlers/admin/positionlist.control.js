const db= require('../../databases/admin/position.db')


module.exports.PositionListLoad= async(req,res)=>{
    res.render('admin/PoisitionList',{
        title: "Position List",
        userId: req.signedCookies.userId,
        html: "",
    })
}

module.exports.ListPositions_Load_Web_V1 = async(req,res)=>{
    try {
        let data= await db.ListPositions_Load_Web_V1();
        res.json({
            data:data
        })
        
    } catch (error) {
        res.json({
            data:[]
        })
        
    }
}

module.exports.ListPositions_PositionsCodeGetNext = async(req,res)=>{
    lMes={}
    try {
        let data= await db.ListPositions_PositionsCodeGetNext();
        lMes.status=true
        lMes.data=data;
       res.send(lMes);
    } catch (error) {
        lMes.status=false
        lMes.data=[];
       res.send(lMes);
    }
}

module.exports.ListPositionsSavetoDatabase= async(req,res)=>{
    lMes={}
    try {
        let result=await db.ListPositionsSavetoDatabase(req.body)
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

module.exports.PositionListDelete=async(req,res)=>{
    lMes={}
    try {
        let result= await db.PositionListDelete(req.body);
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
        lMes.mes='Err '+error
        res.send(lMes)
    }
}
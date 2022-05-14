module.exports.QTKTLoad = async (req,res) =>{
    res.render('kithuat/QTKT',{
        title:'Quy Trình Kỹ Thuật',
        userId:req.signedCookies.userId,
        html:"",
    })
  }
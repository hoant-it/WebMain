module.exports.QTKTLoad = async (req,res) =>{
    res.render('kithuat/QTKT',{
        title:'Quy Trình Kỹ Thuật',
        userId:req.signedCookies.userId,
        html:"",
    })
  }

  module.exports.XEM_TT_ORDER_KHSX_3M = async (req,res) =>{
    res.render('kithuat/XEM_TT_ORDER_KHSX_3M',{
        title:'Quy Trình Kỹ Thuật',
        userId:req.signedCookies.userId,
        html:"",
    })
  }
  module.exports.DATNPL = async (req,res) =>{
    res.render('kithuat/DATNPL',{
        title:'Quy Trình Kỹ Thuật',
        userId:req.signedCookies.userId,
        html:"",
    })
  }
  module.exports.MAYMAU = async (req,res) =>{
    res.render('kithuat/MAYMAU',{
        title:'Quy Trình Kỹ Thuật',
        userId:req.signedCookies.userId,
        html:"",
    })
  }

  module.exports.GHICHU_NPL = async (req,res) =>{
    res.render('kithuat/GHICHU_NPL',{
        title:'Quy Trình Kỹ Thuật',
        userId:req.signedCookies.userId,
        html:"",
    })
  }

  
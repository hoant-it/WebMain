module.exports.LamBangHDGiacSD= async(req,res) =>{
    res.render('Cat/LamBangHDGiacSD', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}

module.exports.CadCaiDatDuLieuMoiWacoalCad= async(req,res) =>{
    res.render('Cat/CadCaiDatDuLieuMoiWacoalCad', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}

module.exports.CadCaiDatDuLieuMoiGemini= async(req,res) =>{
    res.render('Cat/CadCaiDatDuLieuMoiGemini', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}


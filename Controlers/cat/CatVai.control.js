module.exports.SDQTVai= async(req,res) =>{
    res.render('Cat/SDQTVai', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}

module.exports.KhoiDongMay= async(req,res) =>{
    res.render('Cat/KhoiDongMay', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}

module.exports.ChuanBiBanVai= async(req,res) =>{
    res.render('Cat/ChuanBiBanVai', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}

module.exports.CatVaiChinhHuongCatWacoalCard= async(req,res) =>{
    res.render('Cat/CatVaiChinhHuongCatWacoalCard', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}

module.exports.CatVaiChinhHuongCatGeMiNi= async(req,res) =>{
    res.render('Cat/CatVaiChinhHuongCatGeMiNi', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}
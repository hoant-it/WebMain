module.exports.CatLinningSDQT= async(req,res) =>{
    res.render('Cat/CatLinningSDQT', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}

module.exports.CatLinningKhoiDongMay= async(req,res) =>{
    res.render('Cat/CatLinningKhoiDongMay', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}

module.exports.CatLinningChuanBiVai= async(req,res) =>{
    res.render('Cat/CatLinningChuanBiVai', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}


module.exports.CatLinningCHCGeminiCad= async(req,res) =>{
    res.render('Cat/CatLinningCHCGeminiCad', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}

module.exports.CatLinningCHCWacoalCad= async(req,res) =>{
    res.render('Cat/CatLinningCHCWacoalCad', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}
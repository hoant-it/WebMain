module.exports.traivai = async (req,res)=>{
    res.render('Cat/traivai', {
        title: 'Trai vai',
        userId: req.signedCookies.userId,
        html: ''
    })
}

module.exports.QtXacDinhGioXaNLMoi = async (req,res)=>{
    res.render('Cat/QtXacDinhGioXaNLMoi', {
        title: 'Trai vai',
        userId: req.signedCookies.userId,
        html: ''
    })
}

module.exports.ChuanBiTruocKhiTraiVai = async (req,res)=>{
    res.render('Cat/ChuanBiTruocKhiTraiVai', {
        title: 'Trai vai',
        userId: req.signedCookies.userId,
        html: ''
    })
}
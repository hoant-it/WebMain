module.exports.LamBangHDGiacSD= async(req,res) =>{
    res.render('Cat/LamBangHDGiacSD', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}
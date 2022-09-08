module.exports.CatLinningSDQT= async(req,res) =>{
    res.render('Cat/CatLinningSDQT', {
        title: 'Express',
        userId: req.signedCookies.userId,
        html: ''
    })
}
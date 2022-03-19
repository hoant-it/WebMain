

module.exports.OrderLoad= async (req, res ) => {
    res.render('kho/Order',{
        title:'',
        userId:req.signedCookies.userId,
        html:'',
    })
}
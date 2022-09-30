module.exports.MayQTSX= async(req,res) =>{
    res.render('May/MayQTSX',{
        title:'QT May',
        userId:req.signedCookies.userId,
       html:'',
    })
    }

    

    module.exports.NhanPLTuKho = async (req, res) => {
      res.render("May/NhanPLTuKho", {
        title: "QT May",
        userId: req.signedCookies.userId,
        html: "",
      });
    };

    module.exports.GiaoNLTungCD = async (req, res) => {
      res.render("May/GiaoNLTungCD", {
        title: "QT May",
        userId: req.signedCookies.userId,
        html: "",
      });
    };

        
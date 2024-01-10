module.exports.QTQLNVLLoad = async(req,res) =>{


    res.status(200).render('Kho/QTQLNVL',{
        title:'QTQL Nguyên Liệu',
        userId:req.signedCookies.userId,
       html:''
    })

    }

    module.exports.LienLacThieuDu= async(req, res) =>{
        res.render('kho/LienLacThieuDu',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }
    
    
    module.exports.LIENLACETDETAQTY= async(req, res) =>{
        res.render('kho/LIENLACETDETAQTY',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }
    
    module.exports.LIENLACLOINVL= async(req, res) =>{
        res.render('kho/LIENLACLOINVL',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }
    
    module.exports.LIENLACDIEUCHINHNGAYGUINVL= async(req, res) =>{
        res.render('kho/LIENLACDIEUCHINHNGAYGUINVL',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }
    
    module.exports.NHANHANG= async(req, res) =>{
        res.render('kho/NHANHANG',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }
    
    module.exports.SXNVLLENKE= async(req, res) =>{
        res.render('kho/SXNVLLENKE',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }
    
    module.exports.LAYHANG= async(req, res) =>{
        res.render('kho/LAYHANG',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }
    
    //KIEMTRACHATLUONG
    // module.exports.KIEMTRACHATLUONG= async(req, res) =>{
    //     res.render('kho/KIEMTRACHATLUONG',{
    //         title:'',
    //         userId:req.signedCookies.userId,
    //        html:''
    //     })
    // }
    
    //GIAOHANG
    module.exports.GIAOHANG= async(req, res) =>{
        res.render('kho/GIAOHANG',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }
    
    //QLNVLDU
    module.exports.QLNVLDU= async(req, res) =>{
        res.render('kho/QLNVLDU',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }
    

       //TinhChiChuyenMay
       module.exports.TinhChiChuyenMay= async(req, res) =>{
        res.render('kho/QuyTrinh/TinhChiChuyenMay',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.TinhChiDayVai= async(req, res) =>{
        res.render('kho/QuyTrinh/TinhChiDayVai',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.DatChi= async(req, res) =>{
        res.render('kho/QuyTrinh/DatChi',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.TinhChiLai= async(req, res) =>{
        res.render('kho/QuyTrinh/TinhChiLai',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.CapPhatChi= async(req, res) =>{
        res.render('kho/QuyTrinh/CapPhatChi',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QuanLyTonKhoChi= async(req, res) =>{
        res.render('kho/QuyTrinh/QuanLyTonKhoChi',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.KiemTraChatLuong= async(req, res) =>{
        res.render('kho/QuyTrinh/KiemTraChatLuong',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.SoanHangPhuLieu= async(req, res) =>{
        res.render('kho/QuyTrinh/SoanHangPhuLieu',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.InPhieuGiaoHangPhuLieu= async(req, res) =>{
        res.render('kho/InPhieuGiaoHangPhuLieu',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }


    

    

    

    
    


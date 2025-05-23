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

    module.exports.QTDC_I_2_1= async(req, res) =>{
        res.render('kho/QuyTrinh/QTDC_I_2_1',{
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

    module.exports.QTQLNVL_B8_NL= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_NL',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_QDGNL= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_QDGNL',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_QDGPL= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_QDGPL',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_NL_4A1= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_NL_4A1',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_NL_4A2= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_NL_4A2',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }
    module.exports.QTQLNVL_B8_NL_4A3= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_NL_4A3',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_NL_4B1= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_NL_4B1',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_NL_4B2= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_NL_4B2',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_NL_4B3= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_NL_4B3',{
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

    module.exports.DoiVoiMaHangMoi= async(req, res) =>{
        res.render('kho/QuyTrinh/DoiVoiMaHangMoi',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.DoiVoiMaHangMoiAVWAPS= async(req, res) =>{
        res.render('kho/QuyTrinh/DoiVoiMaHangMoiAVWAPS',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.DoiVoiMaHangMoiBVWBVC= async(req, res) =>{
        res.render('kho/QuyTrinh/DoiVoiMaHangMoiBVWBVC',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.DoiVoiMaHangMoiCWXAMPHIAWIV= async(req, res) =>{
        res.render('kho/QuyTrinh/DoiVoiMaHangMoiCWXAMPHIAWIV',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.DoiVoiMaHangMoiTAIWAN= async(req, res) =>{
        res.render('kho/QuyTrinh/DoiVoiMaHangMoiTAIWAN',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.NhanOrderTuKHSX= async(req, res) =>{
        res.render('kho/QuyTrinh/NhanOrderTuKHSX',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.NhanOrderTuKHSXAVWAPS= async(req, res) =>{
        res.render('kho/QuyTrinh/NhanOrderTuKHSXAVWAPS',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.NhanOrderTuKHSXBVWBVC= async(req, res) =>{
        res.render('kho/QuyTrinh/NhanOrderTuKHSXBVWBVC',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.NhanOrderTuKHSXCWX= async(req, res) =>{
        res.render('kho/QuyTrinh/NhanOrderTuKHSXCWX',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.NhanOrderTuKHSXAMPHI= async(req, res) =>{
        res.render('kho/QuyTrinh/NhanOrderTuKHSXAMPHI',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.NhanOrderTuKHSXTAIWAN= async(req, res) =>{
        res.render('kho/QuyTrinh/NhanOrderTuKHSXTAIWAN',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.NhanOrderTuKHSXWIV= async(req, res) =>{
        res.render('kho/QuyTrinh/NhanOrderTuKHSXWIV',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }


    module.exports.YeuCauKiThuat= async(req, res) =>{
        res.render('kho/QuyTrinh/YeuCauKiThuat',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.YeuCauKiThuatAmphiAWIV= async(req, res) =>{
        res.render('kho/QuyTrinh/YeuCauKiThuatAmphiAWIV',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.YeuCauKiThuatAVWAPSBVWBVC= async(req, res) =>{
        res.render('kho/QuyTrinh/YeuCauKiThuatAVWAPSBVWBVC',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.YeuCauKiThuatCWX= async(req, res) =>{
        res.render('kho/QuyTrinh/YeuCauKiThuatCWX',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.YeuCauKiThuatTAIWAN= async(req, res) =>{
        res.render('kho/QuyTrinh/YeuCauKiThuatTAIWAN',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.DoiVoiMaHangCuMauMoi= async(req, res) =>{
        res.render('kho/QuyTrinh/DoiVoiMaHangCuMauMoi',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.DoiVoiMHCuMauMoiAVWAPSBVWBVCAMPHICWXAWIV= async(req, res) =>{
        res.render('kho/QuyTrinh/DoiVoiMHCuMauMoiAVWAPSBVWBVCAMPHICWXAWIV',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.DoiVoiMHCuMauMoiTAIWAN= async(req, res) =>{
        res.render('kho/QuyTrinh/DoiVoiMHCuMauMoiTAIWAN',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.TinhCDCD_5_TW= async(req, res) =>{
        res.render('kho/QuyTrinh/TinhCDCD_5_TW',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.TinhCDCD_5= async(req, res) =>{
        res.render('kho/QuyTrinh/TinhCDCD_5',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.TinhChiChuyenMay_5_1= async(req, res) =>{
        res.render('kho/QuyTrinh/TinhChiChuyenMay_5_1',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    

    module.exports.TinhChiChuyenMay_6= async(req, res) =>{
        res.render('kho/QuyTrinh/TinhChiChuyenMay_6',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    

    module.exports.YeuCauKyThuatDoCDCD_4= async(req, res) =>{
        res.render('kho/QuyTrinh/YeuCauKyThuatDoCDCD_4',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.YeuCauKTDoCDCDTAIWAN= async(req, res) =>{
        res.render('kho/QuyTrinh/YeuCauKTDoCDCDTAIWAN',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.YeuCauKTDoCDCDAVWAPSCWXAMPHIAWIVBVWBVC= async(req, res) =>{
        res.render('kho/QuyTrinh/YeuCauKTDoCDCDAVWAPSCWXAMPHIAWIVBVWBVC',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVLB3= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB3',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVLB3IA= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB3IA',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVLB3IB= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB3IB',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVLB3IIA= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB3IIA',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVLB3IIB= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB3IIB',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVLB3IIIA= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB3IIIA',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVLB3IIIB= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB3IIIB',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVLB4= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB4',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVLB7= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB7',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_NL= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_NL',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    

    module.exports.QTQLNVLB8_1= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB8_1',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVLB8_1_I= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB8_1_I',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVLB8_1_I_B1= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB8_1_I_B1',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVLB8_1_IIA= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB8_1_IIA',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVLB8_1_IIB= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB8_1_IIB',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVLB10= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB10',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTDC_I_2_2= async(req, res) =>{
        res.render('kho/QuyTrinh/QTDC_I_2_2',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVLB8_1_I_B2= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVLB8_1_I_B2',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B11_2_QLCMDH= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B11_2_QLCMDH',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B11_2_QLNVLDH= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B11_2_QLNVLDH',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B13_NVLD= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B13_NVLD',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }
    module.exports.QTQLNVL_B13_CMD= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B13_CMD',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.DNPLDNCCTNTL_1= async(req, res) =>{
        res.render('kho/QuyTrinh/DNPLDNCCTNTL_1',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.DNPLDNCCTNTL_2= async(req, res) =>{
        res.render('kho/QuyTrinh/DNPLDNCCTNTL_2',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.DNPLDNCCTNTL_3= async(req, res) =>{
        res.render('kho/QuyTrinh/DNPLDNCCTNTL_3',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_KTCLVQMQRCV_QDKTMC= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_KTCLVQMQRCV_QDKTMC',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTDC_I_2_3= async(req, res) =>{
        res.render('kho/QuyTrinh/QTDC_I_2_3',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTDC_I_2_31= async(req, res) =>{
        res.render('kho/QuyTrinh/QTDC_I_2_31',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTDC_I_2_32= async(req, res) =>{
        res.render('kho/QuyTrinh/QTDC_I_2_32',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTDC_I_2_33= async(req, res) =>{
        res.render('kho/QuyTrinh/QTDC_I_2_33',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.DatThemLai_NVL= async(req, res) =>{
        res.render('kho/QuyTrinh/DatThemLai_NVL',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_DatThemLai_NVL_Nhat= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_DatThemLai_NVL_Nhat',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_DatThemLai_NVL_HK_EU= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_DatThemLai_NVL_HK_EU',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_DatThemLai_NVL_TW= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_DatThemLai_NVL_TW',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.PhaHanhDebitNote= async(req, res) =>{
        res.render('kho/QuyTrinh/PhaHanhDebitNote',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_PhaHanhDebitNote_WE= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_PhaHanhDebitNote_WE',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_PhaHanhDebitNote_WI_WB= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_PhaHanhDebitNote_WI_WB',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_PhaHanhDebitNote_CWX_HX_TW= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_PhaHanhDebitNote_CWX_HX_TW',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }
    module.exports.QTQLNVL_XNLNVNHDSCSVPL= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_XNLNVNHDSCSVPL',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.DNPLDNCCTNTL_4= async(req, res) =>{
        res.render('kho/QuyTrinh/DNPLDNCCTNTL_4',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }
    module.exports.DNPLDNCCTNTL_5= async(req, res) =>{
        res.render('kho/QuyTrinh/DNPLDNCCTNTL_5',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_NL_XKHSX= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_NL_XKHSX',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_NL_KTDSCB= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_NL_KTDSCB',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_NL_CDSPXKULX= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_NL_CDSPXKULX',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_NL_BCLDCD= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_NL_BCLDCD',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_ITQRKCCTTPLVDTVCV= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_ITQRKCCTTPLVDTVCV',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_ITQRKCCTTPLVDTVCV_ITQRKCTVLN= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_ITQRKCCTTPLVDTVCV_ITQRKCTVLN',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_ITQRKCCTTPLVDTVCV_DTQRVLNDTCCT= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_ITQRKCCTTPLVDTVCV_DTQRVLNDTCCT',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_ITQRKCCTTPLVDTVCV_VLNDCDSTQR= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_ITQRKCCTTPLVDTVCV_VLNDCDSTQR',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_ITQRKCCTTPLVDTVCV_ITQRKCTDVR= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_ITQRKCCTTPLVDTVCV_ITQRKCTDVR',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_ITQRKCCTTPLVDTVCV_DTQRCCT= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_ITQRKCCTTPLVDTVCV_DTQRCCT',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B2= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B2',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B2_1= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B2_1',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B2_2= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B2_2',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B14_CMD= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B14_CMD',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B5= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B5',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B5_1= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B5_1',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B5_2= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B5_2',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_ITQRKDSS= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_ITQRKDSS',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B6= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B6',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B9= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B9',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTDC_I_2_4= async(req, res) =>{
        res.render('kho/QuyTrinh/QTDC_I_2_4',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_QDGBNL= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_QDGBNL',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_QDGBNL_TH1= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_QDGBNL_TH1',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_QDGBNL_TH2= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_QDGBNL_TH2',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_QDGBNL_TH3= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_QDGBNL_TH3',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_QDGBNL_TH4= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_QDGBNL_TH4',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B10_QMQRCV= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B10_QMQRCV',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B7= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B7',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B12= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B12',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_NL_5= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_NL_5',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_NL_6= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_NL_6',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_NL_7_PSVCFVTM= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_NL_7_PSVCFVTM',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B1= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B1',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B13= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B13',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B13_1= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B13_1',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B13_2= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B13_2',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_TNLVK= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_TNLVK',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_ITQRKCCTTPLVDTVCV_DTQRVLNDCCCT= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_ITQRKCCTTPLVDTVCV_DTQRVLNDCCCT',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_QMQR_TLNVLVKQHTSB= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_QMQR_TLNVLVKQHTSB',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B8_QDGBNL_TH5= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B8_QDGBNL_TH5',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B10_QDKTNL= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B10_QDKTNL',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B10_QDKTNL_1= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B10_QDKTNL_1',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.QTQLNVL_B10_QDKTNL_2= async(req, res) =>{
        res.render('kho/QuyTrinh/QTQLNVL_B10_QDKTNL_2',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    module.exports.DNPLDNCCTNTL_6= async(req, res) =>{
        res.render('kho/QuyTrinh/DNPLDNCCTNTL_6',{
            title:'',
            userId:req.signedCookies.userId,
           html:''
        })
    }

    

    


    

    

    

    

    
    

    
    

    

    

    

    
    
    

    

    

    

    

    

    

    

    

    

    
    

    

    

    

    
    


    

    
    

    

    

    

    

    

    

    

    

    

    
    


    
    

    
    

    

    


    

    

    


    

    
    
    
    
    

    

    


    
    
    


    
    

    

    

    

    

    

    

    

    


    


    
    

    

    

    

    

    
    
    
    

    

    

    

    

    

    

    


    

    

    

    
    


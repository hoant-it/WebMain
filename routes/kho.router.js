const express = require('express');
const router = express.Router();
const nodemailer= require('nodemailer');
const upload= require('../MiddleWares/upload.middle');
const orderControl = require('../Controlers/Kho/Order.control')
const congdoanmahangControl = require('../Controlers/Kho/CongDoanMaHang.Control');
const MauChiMauNLControl=require('../Controlers/Kho/MauChiMauNL.Control')
const QTQLNVLControl=require('../Controlers/Kho/QTQLNVL.Control')
const OrderTinhChiControl=require('../Controlers/Kho/OrderTinhChi.Control')
const KeHangControl=require('../Controlers/Kho/KeHang.Control');
const { password } = require('../databases/dbconfig');
//Order
router.get('/Order',orderControl.OrderLoad);
router.get('/DONHANGITEM_3_MY_SearchBox_Web_V1',orderControl.DONHANGITEM_3_MY_SearchBox_Web_V1)
router.get('/DONHANGITEM_3_Load_Web_V1/:MY',orderControl.DONHANGITEM_3_Load_Web_V1 )
router.post('/Order', upload.single('filename'), orderControl.OrderInserByType)
router.post('/OrderImportExcel', upload.single('filename'), orderControl.OrderImportExcel)

router.get('/DONHANGITEM_DRAFT_Load_Web_V1/:MY',orderControl.DONHANGITEM_DRAFT_Load_Web_V1)
router.get('/DONHANGITEM_DRAFT_MY_SearchBox_Web_V1',orderControl.DONHANGITEM_DRAFT_MY_SearchBox_Web_V1)
router.post('/OrderDraftImportExcel',upload.single('filenameDraft'),orderControl.OrderDraftImportExcel)

//Cong Doan Ma Hang

router.get('/congodanmahanginputv2',congdoanmahangControl.CongDoanMaHangLoad)

router.get('/wacoal_MaHang_Select_V1', congdoanmahangControl.wacoal_MaHang_Select_V1)

router.get('/wacoal_TinhChi_MaHang_V2/:MAHANG', congdoanmahangControl.wacoal_TinhChi_MaHang_V2)
router.get('/CONGDOAN_MAHANG_New_Web_Load_V1', congdoanmahangControl.CONGDOAN_MAHANG_New_Web_Load_V1)
router.get('/wacoal_MauNL_LoaiChi_Moi_Load_Web_V1', congdoanmahangControl.wacoal_MauNL_LoaiChi_Moi_Load_Web_V1)
router.post('/congodanmahanginputv2',upload.single('filename'), congdoanmahangControl.CongDoanMaHangInput)

//Mau chi Mau NL
router.get('/MauChiMauNl',MauChiMauNLControl.MauChiMauNLLoad)
router.get('/wacoal_MAUCHIMAUNL_Load_Web_V1',MauChiMauNLControl.wacoal_MAUCHIMAUNL_Load_Web_V1)
router.post('/MauChiMauNlInput',upload.single('filename'), MauChiMauNLControl.MauChiMauNLInputajax)
router.post('/MauChiMauNLUpdate',MauChiMauNLControl.MauChiMauNLUpdate)
router.get('/wacoal_LOAICHIITEM_Load_V1',MauChiMauNLControl.wacoal_LOAICHIITEM_Load_V1)
router.post('/MAUCHIMAUNL_Delete_Web_V1',MauChiMauNLControl.MAUCHIMAUNL_Delete_Web_V1)

//QTQLNVL
router.get('/QTQLNVL',QTQLNVLControl.QTQLNVLLoad)
//LienLacThieuDu
router.get('/LienLacThieuDu',QTQLNVLControl.LienLacThieuDu)
//LIENLACETDETAQTY
router.get('/LIENLACETDETAQTY',QTQLNVLControl.LIENLACETDETAQTY)
//LIENLACLOINVL
router.get('/LIENLACLOINVL',QTQLNVLControl.LIENLACLOINVL)
//LIENLACDIEUCHINHNGAYGUINVL
router.get('/LIENLACDIEUCHINHNGAYGUINVL',QTQLNVLControl.LIENLACDIEUCHINHNGAYGUINVL)
//NHANHANG
router.get('/NHANHANG',QTQLNVLControl.NHANHANG)
//SXNVLLENKE
router.get('/SXNVLLENKE',QTQLNVLControl.SXNVLLENKE)
//LAYHANG
router.get('/LAYHANG',QTQLNVLControl.LAYHANG)
//KIEMTRACHATLUONG
router.get('/KIEMTRACHATLUONG',QTQLNVLControl.KIEMTRACHATLUONG)
//GIAOHANG
router.get('/GIAOHANG',QTQLNVLControl.GIAOHANG)
//QLNVLDU
router.get('/QLNVLDU',QTQLNVLControl.QLNVLDU)

//Tinh chi theo Order
router.get('/KhoOderTinhChiGridViewDev',OrderTinhChiControl.OrderTinhChiLoad)
router.get('/Khowacoal_KHACHHANG_load_Web_V1',OrderTinhChiControl.Khowacoal_KHACHHANG_load_Web_V1)
router.get('/wacoal_DONHANGHEAD_Load_Web_V1',OrderTinhChiControl.wacoal_DONHANGHEAD_Load_Web_V1)
router.get('/khoOrderTinhchiGridviewMaHangMiss/:Order/:KhachHang',OrderTinhChiControl.khoOrderTinhchiGridviewMaHangMiss)
router.get('/Order_TinhChi_Web_V3/:Order/:KhachHang',OrderTinhChiControl.Order_TinhChi_Web_V3)
router.post('/OrderTinhChiPost',OrderTinhChiControl.OrderTinhChiPost)
router.get('/wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V3/:Order/:KhachHang',OrderTinhChiControl.wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V3)

//ke hang
router.get('/kehang',KeHangControl.kehangLoad)
router.get('/wacoal_KEHANG_Load_By_Id_Web_V1/:ID',KeHangControl.wacoal_KEHANG_Load_By_Id_Web_V1)
router.get('/wacoal_KEHANG_Load_By_Id_Web_V2/:ID',KeHangControl.wacoal_KEHANG_Load_By_Id_Web_V2)

router.get('/wacoal_KEHANG_Web_Load_V1',KeHangControl.wacoal_KEHANG_Web_Load_V1)

router.get('/wacoal_KHONL_Web_Load_V1/:SHEFTID',KeHangControl.wacoal_KHONL_Web_Load_V1)
router.get('/wacoal_KHONL_Web_Load_V2/:OKEID',KeHangControl.wacoal_KHONL_Web_Load_V2)

router.post('/SaveKeHangToDatabase',KeHangControl.SaveKeHangToDatabase)
router.post('/SaveKeHangToDatabaseV2',KeHangControl.SaveKeHangToDatabaseV2)

router.get('/wacoal_KHONLXUAT_Load_By_KHONLID_web_V1/:KHONLID',KeHangControl.wacoal_KHONLXUAT_Load_By_KHONLID_web_V1)
router.get('/wacoal_KHONLXUAT_Load_By_KHONLID_web_V2/:KHONLID',KeHangControl.wacoal_KHONLXUAT_Load_By_KHONLID_web_V2)

router.post('/upload',upload.single('filename'),KeHangControl.uploadKeHang)



//send mail
router.post('/sendMail', async (req,res) =>{
    try {
        let transpoter= nodemailer.createTransport({
    //         host:"smtp-mail.outlook.com",
    //         secure:false,
    //         port:587,
    //         auth:{
    //             user:"hoanguyen@wacoal.com.vn",
    //             password:"hoanguyen!@#"
    //         },
    //         tls:{
    //             ciphers:'SSLv3'
    //         }
    service:"gmail",
    auth:{
    user:"portalwacoal@gmail.com",
    pass:"ixjzpgmqeueakucl"
    },
    // host:'192.168.79.4',
    // port:587,
    // secure:false,
    // auth:{
    //     user:'wacoal@wacoal.com.vn',
    //     password:"sE4M@1LWC!123"
    // }

    })
        // let transpoter=nodemailer.createTransport("SMTP",{
        //     service:'hotmail',
        //     auth:{
        //         user:"hoanguyen@wacoal.com.vn",
        //         password:"hoanguyen!@#"
        //     },
        // })

  


        await transpoter.sendMail({
            from:"portalwacoal@gmail.com",
            // from:"hoanguyen@wacoal.com.vn",
            
            to:"<hoanguyen@wacoal.com.vn>,<hoathaigm@gmail.com>",
           
            // cc:''
            subject:"V/v c???p nh???t ????n h??ng v??o h??? th???ng",
            // text:"Hello world?",
            html:`
            <h1> Ch??o c??c Bp </h1>
            <p> ????n h??ng ???? c???p nh???t h??? th???ng.  </p>
            <p> P/s: ????y l?? mail t??? ?????ng t??? h??? th???ng vui l??ng kh??ng Relly</p>
            <p> tks</p>
            `
            
        })
        res.json({
            mes: `th??nh c??ng`
        })
        
    } catch (error) {
        res.json({
            mes: `${error}`
        })
    }
})



module.exports=router;
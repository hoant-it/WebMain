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
const datChiControl= require('../Controlers/Kho/Datchi.Control')
const giaCongDayVaiControl= require('../Controlers/Kho/GiaCongDayVai.Control');
const khoOrderTinhChiHisControl= require('../Controlers/Kho/KhoOrderTinhChiHis.Control')
const XuatNhapKhoControl=require('../Controlers/Kho/XuatNhapKho.Control');

const LoaiMayCongThucControl=require('../Controlers/Kho/LoaiMayCongThuc.control')

//Order
router.get('/Order',orderControl.OrderLoad);
router.get('/DONHANGITEM_3_MY_SearchBox_Web_V1',orderControl.DONHANGITEM_3_MY_SearchBox_Web_V1)
router.get('/DONHANGITEM_3_Load_Web_V2/:MY',orderControl.DONHANGITEM_3_Load_Web_V2 )
router.post('/Order', upload.single('filename'), orderControl.OrderInserByType)
router.post('/OrderImportExcel', upload.single('filename'), orderControl.OrderImportExcel)

router.get('/DONHANGITEM_DRAFT_Load_Web_V2/:MY',orderControl.DONHANGITEM_DRAFT_Load_Web_V2)
router.get('/DONHANGITEM_DRAFT_MY_SearchBox_Web_V1',orderControl.DONHANGITEM_DRAFT_MY_SearchBox_Web_V1)
router.post('/OrderDraftImportExcel',upload.single('filenameDraft'),orderControl.OrderDraftImportExcel)

//Cong Doan Ma Hang

router.get('/congodanmahanginputv2',congdoanmahangControl.CongDoanMaHangLoad)

router.get('/CongDoanMaHangV3',congdoanmahangControl.CongDoanMaHangV3)

router.get('/CongDoanMaHangV4',congdoanmahangControl.CongDoanMaHangV4)


router.get('/wacoal_MaHang_Select_V1', congdoanmahangControl.wacoal_MaHang_Select_V1)

router.get('/wacoal_TinhChi_MaHang_V3/:MAHANG', congdoanmahangControl.wacoal_TinhChi_MaHang_V3)
router.get('/CONGDOAN_MAHANG_New_Web_Load_V1', congdoanmahangControl.CONGDOAN_MAHANG_New_Web_Load_V1)
router.get('/wacoal_MauNL_LoaiChi_Moi_Load_Web_V1', congdoanmahangControl.wacoal_MauNL_LoaiChi_Moi_Load_Web_V1)
router.get('/wacoal_MauNL_LoaiChi_Moi_MH_Load_Web_V1', congdoanmahangControl.wacoal_MauNL_LoaiChi_Moi_MH_Load_Web_V1)

router.get('/LOAIMAY_New_load_Wacoal_Web_V1', congdoanmahangControl.LOAIMAY_New_load_Wacoal_Web_V1)
router.get('/LoaiChi_New_load_Wacoal_Web_V1', congdoanmahangControl.LoaiChi_New_load_Wacoal_Web_V1)






router.post('/congodanmahanginputv2',upload.single('filename'), congdoanmahangControl.CongDoanMaHangInput)
router.get('/CONGDOAN_MAHANG_Load_By_MaHang_Web_Wacoal_V1/:MaHang',congdoanmahangControl.CONGDOAN_MAHANG_Load_By_MaHang_Web_Wacoal_V1)


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
// router.get('/KhoOderTinhChiGridViewDev',OrderTinhChiControl.OrderTinhChiLoad)
router.get('/Khowacoal_KHACHHANG_load_Web_V1',OrderTinhChiControl.Khowacoal_KHACHHANG_load_Web_V1)
router.get('/wacoal_DONHANGHEAD_Load_Web_V1',OrderTinhChiControl.wacoal_DONHANGHEAD_Load_Web_V1)
router.get('/khoOrderTinhchiGridviewMaHangMiss/:Order/:KhachHang',OrderTinhChiControl.khoOrderTinhchiGridviewMaHangMiss)
router.get('/Order_TinhChi_Web_V4/:Order/:KhachHang',OrderTinhChiControl.Order_TinhChi_Web_V4)
router.post('/OrderTinhChiPost',OrderTinhChiControl.OrderTinhChiPost)
router.get('/wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V4/:Order/:KhachHang',OrderTinhChiControl.wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V4)

//tinh chi theo order V2
// router.get('/KhoOderTinhChiGridViewDevV2',OrderTinhChiControl.OrderTinhChiLoadV2)
router.get('/KhoOderTinhChiGridViewDev',OrderTinhChiControl.OrderTinhChiLoadV2)
router.get('/wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V5/:order/:groupKH/:datchiStatus',OrderTinhChiControl.wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V5)
router.get('/Order_TinhChi_Web_V5/:order/:groupKH/:datchiStatus',OrderTinhChiControl.Order_TinhChi_Web_V5)
router.post('/wacoal_KHOCHIHEADER_Load_Web_V1',OrderTinhChiControl.wacoal_KHOCHIHEADER_Load_Web_V1)

//ke hang
router.get('/kehang',KeHangControl.kehangLoad)
// router.get('/wacoal_KEHANG_Load_By_Id_Web_V1/:ID',KeHangControl.wacoal_KEHANG_Load_By_Id_Web_V1)
router.get('/wacoal_KEHANG_Load_By_Id_Web_V2/:ID',KeHangControl.wacoal_KEHANG_Load_By_Id_Web_V2)

router.get('/wacoal_KEHANG_Web_Load_V1',KeHangControl.wacoal_KEHANG_Web_Load_V1)

// router.get('/wacoal_KHONL_Web_Load_V1/:SHEFTID',KeHangControl.wacoal_KHONL_Web_Load_V1)
router.get('/wacoal_KHONL_Web_Load_V2/:OKEID',KeHangControl.wacoal_KHONL_Web_Load_V2)
router.get('/wacoal_KHONL_Web_Load_V3/:OKEID/:ORDERNO/:MATERIAL',KeHangControl.wacoal_KHONL_Web_Load_V3)


router.post('/SaveKeHangToDatabase',KeHangControl.SaveKeHangToDatabase)
router.post('/SaveKeHangToDatabaseV2',KeHangControl.SaveKeHangToDatabaseV2)
router.post('/SaveKeHangToDatabaseV3',KeHangControl.SaveKeHangToDatabaseV3)

// router.get('/wacoal_KHONLXUAT_Load_By_KHONLID_web_V1/:KHONLID',KeHangControl.wacoal_KHONLXUAT_Load_By_KHONLID_web_V1)
router.get('/wacoal_KHONLXUAT_Load_By_KHONLID_web_V2/:KHONLID',KeHangControl.wacoal_KHONLXUAT_Load_By_KHONLID_web_V2)
router.get('/wacoal_KHONLXUAT_Load_By_KHONLID_web_V3/:KHONLID',KeHangControl.wacoal_KHONLXUAT_Load_By_KHONLID_web_V3)

router.post('/uploadKeHang',upload.single('filename'),KeHangControl.uploadKeHangv4)



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
            subject:"V/v cập nhật đơn hàng vào hệ thống",
            // text:"Hello world?",
            html:`
            <h1> Chào các Bp </h1>
            <p> Đơn hàng đã cập nhật hệ thống.  </p>
            <p> P/s: Đây là mail tự động từ hệ thống vui lòng không Relly</p>
            <p> tks</p>
            `
            
        })
        res.json({
            mes: `thành công`
        })
        
    } catch (error) {
        res.json({
            mes: `${error}`
        })
    }
})

//Dat chi
router.get('/DatChi',datChiControl.datChiLoad)
router.get('/wacoal_Datchi_MauMH_Load_Web_V1/:MAHANG',datChiControl.wacoal_Datchi_MauMH_Load_Web_V1)
router.get('/wacoal_CHUYEN_Load_Web_V1',datChiControl.wacoal_CHUYEN_Load_Web_V1)
router.get('/wacoal_DatChi_MH_Mau_SL_Web_V1/:MAHANG/:MAUMH/:Qty',datChiControl.wacoal_DatChi_MH_Mau_SL_Web_V1)
router.get('/wacoal_TinhChi_MaHang_Mau_SL_V2/:MAHANG/:MAUMH/:Qty',datChiControl.wacoal_TinhChi_MaHang_Mau_SL_V2)

//Gia Cong Day Vai
router.get('/giacongdayvai',giaCongDayVaiControl.GiaCongDayVaiLoad)
router.post('/giacongdayvai',upload.single('filename'), giaCongDayVaiControl.GiaCongDayVaiInput)
router.get('/wacoal_GiaCongDayVai_MaHang_V1/:MAHANG', giaCongDayVaiControl.wacoal_GiaCongDayVai_MaHang_V1)
router.get('/wacoal_MaHang_GCDV_Select_V1', giaCongDayVaiControl.wacoal_MaHang_GCDV_Select_V1)
router.get('/wacoal_GiaCongDayVai_MaHang_CT_V1/:MAHANG', giaCongDayVaiControl.wacoal_GiaCongDayVai_MaHang_CT_V1)
router.get('/wacoal_MaHang_GCDV_Select_V1',giaCongDayVaiControl.wacoal_MaHang_GCDV_Select_V1)




//tinh chi Gia Cong Day Vai V2
router.get('/GCDVOrderTinhChi',giaCongDayVaiControl.GCDVOrderTinhChi)
router.get('/Order_TinhChi_GCDV_Web_V2/:order/:groupKH',giaCongDayVaiControl.Order_TinhChi_GCDV_Web_V2)
router.get('/wacoal_OrderTinhChi_ChiTiet_MaHang_GCDV_Load_Web_V2/:order/:groupKH',giaCongDayVaiControl.wacoal_OrderTinhChi_ChiTiet_MaHang_GCDV_Load_Web_V2)

router.get('/GCDV_Load_By_MaHang_Web_Wacoal_V1/:MaHang',giaCongDayVaiControl.GCDV_Load_By_MaHang_Web_Wacoal_V1)
router.get('/wacoal_TinhChi_GCDV_MaHang_V1/:MaHang',giaCongDayVaiControl.wacoal_TinhChi_GCDV_MaHang_V1)





//Order tinh chi His
router.get('/ordertinhchihis',khoOrderTinhChiHisControl.OrderTinhChiHisLoad)
router.get('/KHOCHIHEADER_ORDERNO_load_web_wacoal_v1',khoOrderTinhChiHisControl.KHOCHIHEADER_ORDERNO_load_web_wacoal_v1)
router.get('/KHOCHIHEADER_GROUPKH_Load_web_wacoal_V1/:order',khoOrderTinhChiHisControl.KHOCHIHEADER_GROUPKH_Load_web_wacoal_V1)
router.get('/KHOCHIDETAIL_Load_By_Order_GroupKH_web_wacoal_V1/:order/:groupKH',khoOrderTinhChiHisControl.KHOCHIDETAIL_Load_By_Order_GroupKH_web_wacoal_V1)
router.get('/KHOCHIDETAILGROUP_Load_web_wacoal_V2/:order/:groupKH',khoOrderTinhChiHisControl.KHOCHIDETAILGROUP_Load_web_wacoal_V2)
router.post('/KHOCHIHEADER_TIMECREATE_USERCREATE_load_web_wacoal_V1',khoOrderTinhChiHisControl.KHOCHIHEADER_TIMECREATE_USERCREATE_load_web_wacoal_V1)

//Xuat Nhap Kho


router.get('/XuatNhapKho',XuatNhapKhoControl.XuatNhapKhoLoad)
router.get('/LOAICHIITEM_Load_Web_Wacoal_V1',XuatNhapKhoControl.LOAICHIITEM_Load_Web_Wacoal_V1)
router.get('/MAUCHIMAUNL_Load_MAUCHI_By_LOAICHI_Web_wacoal_V1/:LOAICHI',XuatNhapKhoControl.MAUCHIMAUNL_Load_MAUCHI_By_LOAICHI_Web_wacoal_V1)
// router.post('/KHOCHITON_Insert_Web_Wacoal_V1',XuatNhapKhoControl.KHOCHITON_Insert_Web_Wacoal_V1)
// router.post('/KHOCHITON_Insert_Web_Wacoal_V2',XuatNhapKhoControl.KHOCHITON_Insert_Web_Wacoal_V2)
router.post('/KHOCHITON_Insert_Web_Wacoal_V3',XuatNhapKhoControl.KHOCHITON_Insert_Web_Wacoal_V3)



router.get('/KHOCHITON_Load_Web_Wacoal_V1',XuatNhapKhoControl.KHOCHITON_Load_Web_Wacoal_V1)
router.get('/KHOCHITON_Load_Web_Wacoal_V2',XuatNhapKhoControl.KHOCHITON_Load_Web_Wacoal_V2)

router.get('/CONGDOAN_MAHANG_LOAICHI_load_By_MAHANG_web_wacoal_v1/:MAHANG',XuatNhapKhoControl.CONGDOAN_MAHANG_LOAICHI_load_By_MAHANG_web_wacoal_v1)
router.get('/CONGDOAN_MAHANG_MAMAUCHI_Load_By_MAHANG_LOAICHI_web_wacoal_v1/:MAHANG/:LOAICHI',XuatNhapKhoControl.CONGDOAN_MAHANG_MAMAUCHI_Load_By_MAHANG_LOAICHI_web_wacoal_v1)

router.get('/KHOCHITON_LichSuNhap_web_wacoal_v1',XuatNhapKhoControl.KHOCHITON_LichSuNhap_web_wacoal_v1)
router.get('/KHOCHITON_LichSuXuat_web_wacoal_v1',XuatNhapKhoControl.KHOCHITON_LichSuXuat_web_wacoal_v1)
router.post('/NhapKhoImportExcel',upload.single('filenameNhapKho'),XuatNhapKhoControl.NhapKhoImportExcel)
// router.post('/Order', upload.single('filename'), orderControl.OrderInserByType)


//Loai May Cong Thuc

router.get('/LoaiMayCongThuc',LoaiMayCongThucControl.LoaiMayCongThucLoad)
router.get('/wacoal_LOAIMAYCT_Load_Web_V1',LoaiMayCongThucControl.wacoal_LOAIMAYCT_Load_Web_V1)
router.post('/LOAIMAYCTUpdate',LoaiMayCongThucControl.LOAIMAYCTUpdate)
router.post('/wacoal_LOAIMAYCT_Delete_Web_V1',LoaiMayCongThucControl.wacoal_LOAIMAYCT_Delete_Web_V1)




module.exports=router;
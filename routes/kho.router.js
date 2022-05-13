const express = require('express');
const router = express.Router();
const upload= require('../MiddleWares/upload.middle');
const orderControl = require('../Controlers/Kho/Order.control')
const congdoanmahangControl = require('../Controlers/Kho/CongDoanMaHang.Control');
const MauChiMauNLControl=require('../Controlers/Kho/MauChiMauNL.Control')
const QTQLNVLControl=require('../Controlers/Kho/QTQLNVL.Control')
//Order
router.get('/Order',orderControl.OrderLoad);

router.get('/DONHANGITEM_3_MY_SearchBox_Web_V1',orderControl.DONHANGITEM_3_MY_SearchBox_Web_V1)

router.get('/DONHANGITEM_3_Load_Web_V1/:MY',orderControl.DONHANGITEM_3_Load_Web_V1 )

router.post('/Order', upload.single('filename'), orderControl.OrderInserByType)

//Cong Doan Ma Hang

router.get('/congodanmahanginputv2',congdoanmahangControl.CongDoanMaHangLoad)

router.get('/wacoal_MaHang_Select_V1', congdoanmahangControl.wacoal_MaHang_Select_V1)

router.get('/wacoal_TinhChi_MaHang_V1/:MAHANG', congdoanmahangControl.wacoal_TinhChi_MaHang_V1)
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


module.exports=router;
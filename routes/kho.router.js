const express = require('express');
const router = express.Router();
const upload= require('../MiddleWares/upload.middle');
const orderControl = require('../Controlers/Kho/Order.control')
const congdoanmahangControl = require('../Controlers/Kho/CongDoanMaHang.Control');

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




module.exports=router;
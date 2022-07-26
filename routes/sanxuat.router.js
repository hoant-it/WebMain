const express = require('express');
const router = express.Router();
const QTSXControl=require('../Controlers/sanxuat/QTSX.Control')

router.get('/QTSX',QTSXControl.QTSXLoad)

// NhanOrderTam
router.get('/NhanOrderTam',QTSXControl.NhanOrderTam);

// SepKHSXTam
router.get('/SepKHSXTam',QTSXControl.SepKHSXTam);

//XacNhanWideSCHE_DieuChinh
router.get('/XacNhanWideSCHE_DieuChinh',QTSXControl.XacNhanWideSCHE_DieuChinh);
//NhanOrderChinhThuc
router.get('/NhanOrderChinhThuc',QTSXControl.NhanOrderChinhThuc);
//SepKHSXChinhThuc
router.get('/SepKHSXChinhThuc',QTSXControl.SepKHSXChinhThuc);
//XacNhanBaLance
router.get('/XacNhanBaLance',QTSXControl.XacNhanBaLance);

module.exports=router;
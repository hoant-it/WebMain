const express = require('express');
const router = express.Router();
const upload= require('../MiddleWares/upload.middle');
const QTKTControl=require('../Controlers/kithuat/QTKT.Control')

router.get('/QTKT',QTKTControl.QTKTLoad)

router.get('/XEM_TT_ORDER_KHSX_3M',QTKTControl.XEM_TT_ORDER_KHSX_3M)
router.get('/DATNPL',QTKTControl.DATNPL)
router.get('/NhanTLKT_Pattern_Mau_Dich',QTKTControl.NhanTLKT_Pattern_Mau_Dich)
router.get('/MAYMAU',QTKTControl.MAYMAU)
router.get('/GHICHU_NPL',QTKTControl.GHICHU_NPL)
router.get('/LamBM_SWGD_HE_DoKichThuoc',QTKTControl.LamBM_SWGD_HE_DoKichThuoc)
router.get('/XNKQTuKH',QTKTControl.XNKQTuKH)
router.get('/LuuTLTK',QTKTControl.LuuTLTK)
router.get('/CungCapTLKT',QTKTControl.CungCapTLKT)
router.get('/HuyTLKT',QTKTControl.HuyTLKT)
router.get('/HopZizenkentoLan1GiaiThichMaHang',QTKTControl.HopZizenkentoLan1GiaiThichMaHang)

router.get('/LineLeaderChuyenMayMau',QTKTControl.LineLeaderChuyenMayMau)

router.get('/HopZizenkentoLan2',QTKTControl.HopZizenkentoLan2)
router.get('/HoanChinhTLKTSXDaiTra',QTKTControl.HoanChinhTLKTSXDaiTra)


module.exports=router;
const express = require('express');
const router = express.Router();
const upload= require('../MiddleWares/upload.middle');
const QTKTControl=require('../Controlers/kithuat/QTKT.Control')

router.get('/QTKT',QTKTControl.QTKTLoad)

router.get('/XEM_TT_ORDER_KHSX_3M',QTKTControl.XEM_TT_ORDER_KHSX_3M)
router.get('/DATNPL',QTKTControl.DATNPL)
router.get('/MAYMAU',QTKTControl.MAYMAU)
router.get('/GHICHU_NPL',QTKTControl.GHICHU_NPL)

module.exports=router;
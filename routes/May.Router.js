const express = require('express');
const router = express.Router();
const upload= require('../MiddleWares/upload.middle');
const MayControl=require('../Controlers/may/QTSX.Control')
router.get('/QTSX',MayControl.MayQTSX)

router.get('/NhanPLTuKho',MayControl.NhanPLTuKho)


module.exports=router;
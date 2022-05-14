const express = require('express');
const router = express.Router();
const upload= require('../MiddleWares/upload.middle');
const QTKTControl=require('../Controlers/kithuat/QTKT.Control')

router.get('/QTKT',QTKTControl.QTKTLoad)

module.exports=router;
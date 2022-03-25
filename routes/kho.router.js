const express = require('express');
const router = express.Router();
const upload= require('../MiddleWares/upload.middle');
const orderControl = require('../Controlers/Kho/Order.control')

//Order
router.get('/Order',orderControl.OrderLoad);

router.get('/DONHANGITEM_3_MY_SearchBox_Web_V1',orderControl.DONHANGITEM_3_MY_SearchBox_Web_V1)

router.get('/DONHANGITEM_3_Load_Web_V1/:MY',orderControl.DONHANGITEM_3_Load_Web_V1 )

router.post('/Order', upload.single('filename'), orderControl.OrderInserByType)


module.exports=router;
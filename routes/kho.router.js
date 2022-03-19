const express = require('express');
const router = express.Router();
const oderControl = require('../Controlers/Kho/Order.control')

//Order
router.get('/Order',oderControl.OrderLoad);



module.exports=router;
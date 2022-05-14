const express = require('express');
const router = express.Router();
const upload= require('../MiddleWares/upload.middle');
const kiemphamControl=require('../Controlers/kiempham/QTKP.Control')
router.get('/QTKP', kiemphamControl.QuyTrinhKiemPham);

// KIEMMAUSENPATSU
router.get('/KIEMMAUSENPATSU', kiemphamControl.KIEMMAUSENPATSU);

// LAM_HUONG_DAN_KIEM
router.get('/LAM_HUONG_DAN_KIEM', kiemphamControl.LAM_HUONG_DAN_KIEM);
// GIAI_THICH_BANG_HUONG_DAN_KIEM_TRA
router.get('/GIAI_THICH_BANG_HUONG_DAN_KIEM_TRA', kiemphamControl.GIAI_THICH_BANG_HUONG_DAN_KIEM_TRA);
// LEADER_KIEM_TRA
router.get('/LEADER_KIEM_TRA', kiemphamControl.LEADER_KIEM_TRA);
// CONG_NHAN_KIEM_SX_THAT
router.get('/CONG_NHAN_KIEM_SX_THAT', kiemphamControl.CONG_NHAN_KIEM_SX_THAT);
// GIAOHANG
router.get('/GIAOHANG', kiemphamControl.GIAOHANG);
// QD_XLSP_KHONG_PHU_HOP
router.get('/QD_XLSP_KHONG_PHU_HOP', kiemphamControl.QD_XLSP_KHONG_PHU_HOP);


module.exports=router;
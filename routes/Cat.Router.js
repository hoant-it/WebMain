const express = require('express')
const router = express.Router()
const upload= require('../MiddleWares/upload.middle')
const CatControl=require('../Controlers/cat/Cat.Control')
const CatRenControl=require('../Controlers/cat/CatRen.Control')
//SDTC
router.get('/SDTC',CatControl.CatSDTC)
//TDLCard
router.get('/TDLCard',CatControl.CatTDLCard)
//LLKHCard
router.get('/LLKHCard',CatControl.CatLHKHCard)
//CatMasterPattern
router.get('/CatMasterPattern',CatControl.CatMasterPattern)
//CatGKT_Router
router.get('/GKT',CatControl.CatGKT)

// QTGIAOCHUYEN
router.get('/QTGIAOCHUYEN',CatControl.QTGIAOCHUYEN)

//trai vai hem/panel
router.get('/TraiVaiHemPanel',CatRenControl.TraiVaiHemPanel)




//So do quy trinh cat ren
router.get('/SDQTCatRen',CatRenControl.SDQTCatRenGet)
//NHANRENSENPATSU
router.get('/NHANRENSENPATSU',CatRenControl.NHANRENSENPATSU)
// THAOXEPREN_HANGSENPATSU
router.get('/THAOXEPREN_HANGSENPATSU',CatRenControl.THAOXEPREN_HANGSENPATSU)
// GIACSODODINHMUCTUNGSIZE
router.get('/GIACSODODINHMUCTUNGSIZE',CatRenControl.GIACSODODINHMUCTUNGSIZE)
// LAMBANGHUONGDANCATREN
router.get('/LAMBANGHUONGDANCATREN',CatRenControl.LAMBANGHUONGDANCATREN)
// CAT_VA_KIEM_TRA_MC_VOI_PATTERN
router.get('/CAT_VA_KIEM_TRA_MC_VOI_PATTERN',CatRenControl.CAT_VA_KIEM_TRA_MC_VOI_PATTERN)
//GIAOKYTHUAT
router.get('/GIAOKYTHUAT',CatRenControl.GIAOKYTHUAT)
//LIENLACKHACHHANGXULY_RV
router.get('/LIENLACKHACHHANGXULY_RV',CatRenControl.LIENLACKHACHHANGXULY_RV)
// NHAN_XEPREN_MHLL
router.get('/NHAN_XEPREN_MHLL',CatRenControl.NHAN_XEPREN_MHLL)
//Quy trinh nhan nguyen lieu
router.get('/NhanNguyenLieu',CatRenControl.NhanNguyenLieu)

//KIEM_TRA_DM_TUNG_SIZE_SO_VOI_SL_ORDER
router.get('/KTDMTungSizeSoVoiSLOrder',CatRenControl.KIEM_TRA_DM_TUNG_SIZE_SO_VOI_SL_ORDER)

module.exports=router;
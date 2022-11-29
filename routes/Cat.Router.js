const express = require('express')
const router = express.Router()
const upload= require('../MiddleWares/upload.middle')
const CatControl=require('../Controlers/cat/Cat.Control')
const CatRenControl=require('../Controlers/cat/CatRen.Control')
const CatVaiControl= require('../Controlers/cat/CatVai.control')
const CatLinningControl= require('../Controlers/cat/CatLinning.control')
const catTraiVaiControl= require('../Controlers/cat/catTraiVai.control')
const CatQTGiacSDControl = require('../Controlers/cat/CatQTGiacSD.control')
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

// CAT_HEM_PANEL
router.get('/HemPanel',CatControl.CAT_HEM_PANEL)

//trai vai hem/panel
router.get('/TraiLinning',CatControl.TraiLinning)

//trai vai hem/panel
router.get('/TraiVaiHemPanel',CatRenControl.TraiVaiHemPanel)

//Quy trinh nhan nguyen lieu
router.get('/NhanNguyenLieu',CatRenControl.NhanNguyenLieu)

//Quy trinh nhan nguyen lieu
router.get('/XaVai',CatRenControl.XaVai)






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


//KIEM_TRA_DM_TUNG_SIZE_SO_VOI_SL_ORDER
router.get('/KTDMTungSizeSoVoiSLOrder',CatRenControl.KIEM_TRA_DM_TUNG_SIZE_SO_VOI_SL_ORDER)

// Ren_CatTheoBangHuongDanVaKiemTraMauCat
router.get('/Ren_CatTheoBangHuongDanVaKiemTraMauCat',CatRenControl.Ren_CatTheoBangHuongDanVaKiemTraMauCat)

// QT UI CWX
router.get('/QTUICWX',CatControl.QTUICWX)


//So do quy trinh vai
router.get('/SDQTCatVai',CatVaiControl.SDQTVai)
router.get('/KhoiDongMay',CatVaiControl.KhoiDongMay)
router.get('/ChuanBiBanVai',CatVaiControl.ChuanBiBanVai)
router.get('/CatVaiChinhHuongCatWacoalCard',CatVaiControl.CatVaiChinhHuongCatWacoalCard)
router.get('/CatVaiChinhHuongCatGeMiNi',CatVaiControl.CatVaiChinhHuongCatGeMiNi)



//Cat Linning SDQT
router.get('/CatLinningSDQT',CatLinningControl.CatLinningSDQT)
router.get('/CatLinningKhoiDongMay',CatLinningControl.CatLinningKhoiDongMay)
router.get('/CatLinningChuanBiVai',CatLinningControl.CatLinningChuanBiVai)
router.get('/CatLinningCHCGeminiCad',CatLinningControl.CatLinningCHCGeminiCad)
router.get('/CatLinningCHCWacoalCad',CatLinningControl.CatLinningCHCWacoalCad)
router.get('/CatLinningCat',CatLinningControl.CatLinningCat)

// trai vai
router.get('/SDTraivai',catTraiVaiControl.SDTraivai)
router.get('/ChuanBiTruocKhiTraiVai',catTraiVaiControl.ChuanBiTruocKhiTraiVai)
router.get('/QtXacDinhGioXaNLMoi',catTraiVaiControl.QtXacDinhGioXaNLMoi)
router.get('/TraiVai',catTraiVaiControl.TraiVai)
router.get('/KiemTraXuLyBanVai',catTraiVaiControl.KiemTraXuLyBanVai)



//quy trinh giac so do
router.get('/CatSDQtCad',CatControl.CatSDQtCad)
router.get('/LamBangHDGiacSD',CatQTGiacSDControl.LamBangHDGiacSD)
router.get('/CadCaiDatDuLieuMoiWacoalCad',CatQTGiacSDControl.CadCaiDatDuLieuMoiWacoalCad)
router.get('/CadCaiDatDuLieuMoiGemini',CatQTGiacSDControl.CadCaiDatDuLieuMoiGemini)


module.exports=router;
const express = require('express')
const router = express.Router()
const companyControl = require('../Controlers/admin/companylist.control')
const positionlistControl= require('../Controlers/admin/positionlist.control')
const userListControl= require('../Controlers/admin/userlist.control')
const menuListControl=require('../Controlers/admin/menulist.control')

/* GET home page. */
//company
router.get('/company', companyControl.CompanyListLoad)
router.post('/company', companyControl.CompanySavetodatabase)
router.post('/company/DeleteCompany', companyControl.CompanyListPostDelete)
router.get('/ListCompany_Load_Web_V1',companyControl.ListCompany_Load_Web_V1)

//positon
router.get('/positionlist',positionlistControl.PositionListLoad)
router.get('/ListPositions_Load_Web_V1',positionlistControl.ListPositions_Load_Web_V1)
router.get('/ListPositions_PositionsCodeGetNext',positionlistControl.ListPositions_PositionsCodeGetNext)
router.post('/positionlist',positionlistControl.ListPositionsSavetoDatabase)
router.post('/positionlist/Deletepositionlist',positionlistControl.PositionListDelete)

//userList
router.get('/userlistv2',userListControl.UserListLoad)
router.get('/wacoal_GetUserList_Web_V1',userListControl.wacoal_GetUserList_Web_V1)
router.get('/ListDepartment_Load_Web_V1',userListControl.ListDepartment_Load_Web_V1)
router.post('/saveData',userListControl.UserListSavetoDatabase)
router.post('/deleteData',userListControl.deleteData)
router.post('/resetPass',userListControl.resetPass)

//menulist
router.get('/listmenu',menuListControl.MenuLoad)
router.get('/wacoal_ListMenu_Load_website_v1',menuListControl.wacoal_ListMenu_Load_website_v1)


module.exports = router;
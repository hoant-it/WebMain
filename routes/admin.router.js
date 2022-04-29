const express = require('express')
const router = express.Router()
const companyControl = require('../Controlers/admin/companylist.control')
const positionlistControl= require('../Controlers/admin/positionlist.control')
const userListControl= require('../Controlers/admin/userlist.control')
const menuListControl=require('../Controlers/admin/menulist.control')
const menuPermissionControl= require('../Controlers/admin/menuPermission.control')
const rolePermissionControl= require('../Controlers/admin/rolePermission.control')
const departmentControl=require('../Controlers/admin/department.control')

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
router.get('/sp_CNY_Menu_CreateMenuCode',menuListControl.sp_CNY_Menu_CreateMenuCode)
router.post('/saveToDatabase',menuListControl.saveToDatabase)
router.post('/MenuListDelete',menuListControl.MenuListDelete)

//menuPermission
router.get('/menuPermission',menuPermissionControl.MenuPermissionLoad)
router.get('/wacoal_ListMenu_By_Rule_Load_Web_v2/:ruleCode',menuPermissionControl.wacoal_ListMenu_By_Rule_Load_Web_v2)
router.get('/wacoal_PermisionGroupCode_load_Web_v2',menuPermissionControl.wacoal_PermisionGroupCode_load_Web_v2)
router.post('/MenupermissionUpdateRule',menuPermissionControl.MenupermissionUpdateRule)
router.post('/MenupermissionDeleteRule',menuPermissionControl.MenupermissionDeleteRule)
router.get('/MenuListLoadWeb/:ruleCode',menuPermissionControl.MenuListLoadWeb)
router.post('/MenuPermissionUpdate',menuPermissionControl.MenuPermissionUpdate)

//rolePermission

router.get('/rolePermission',rolePermissionControl.RolePermissionLoad)
router.get('/wacoal_ListUserGroup_Load_Web_V2',rolePermissionControl.wacoal_ListUserGroup_Load_Web_V2)
router.post('/RolePermissionDelete',rolePermissionControl.RolePermissionDelete)
router.post('/RolePermissionUpdate',rolePermissionControl.RolePermissionUpdate)
router.get('/RuleInRoleLoad/:roleCode',rolePermissionControl.RuleInRoleLoad)
router.get('/ListPermisionGroupLoad/:roleCode',rolePermissionControl.ListPermisionGroupLoad)
router.get('/UserInRoleLoad/:roleCode',rolePermissionControl.UserInRoleLoad)
router.get('/UserListLoad',rolePermissionControl.UserListLoad)
router.post('/RolePermissionmoveRuleInRole',rolePermissionControl.RolePermissionmoveRuleInRole)
router.post('/RolePermissiondeleteRuleInRole',rolePermissionControl.RolePermissiondeleteRuleInRole)
router.post('/RolePermissionMoveUserInrRole',rolePermissionControl.RolePermissionMoveUserInrRole)
router.post('/RolePermissionDeleteUserInRole',rolePermissionControl.RolePermissionDeleteUserInRole)

//Department

router.get('/department',departmentControl.DepartmentLoad)
router.get('/ListDepartment_Load_Web_V1',departmentControl.ListDepartment_Load_Web_V1)
router.get('/ListCompany_Load_Web_V1',departmentControl.ListCompany_Load_Web_V1)
router.post('/ListDepartmentPostUpdate',departmentControl.ListDepartmentPostUpdate)
router.post('/ListDepartmentDelete',departmentControl.ListDepartmentDelete)












module.exports = router;
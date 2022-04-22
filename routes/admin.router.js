const express = require('express');
const router = express.Router();
const companyControl = require('../Controlers/admin/companylist.control');


/* GET home page. */
//company
router.get('/company', companyControl.CompanyListLoad)
router.post('/company', companyControl.CompanySavetodatabase)
router.post('/company/DeleteCompany', companyControl.CompanyListPostDelete)
router.get('/ListCompany_Load_Web_V1',companyControl.ListCompany_Load_Web_V1)

//positon
router.get('/positionlist')
module.exports = router;
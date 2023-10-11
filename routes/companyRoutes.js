const express = require("express");
const companyRouter = express.Router();
const { createCompany,companyDetails, companyList, searchCompany } = require("../controllers/companyController");
const { createCompanyValidation } = require("../validation/company/companyDataValidation");
const { userAuthentication } = require("../middlewares/authToken");
const { companyUpload } = require("../middlewares/companyImageStorage");
const authoriseAdmin = require("../middlewares/authorization");

companyRouter.post("/addcompany",companyUpload.single("companyPic"),userAuthentication,authoriseAdmin, createCompanyValidation, createCompany)
companyRouter.get("/details/:id", companyDetails)
companyRouter.get("/list",companyList)
companyRouter.post("/search",searchCompany)
module.exports = companyRouter

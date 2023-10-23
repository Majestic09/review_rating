const express = require("express");
const companyRouter = express.Router();
const {
  createCompany,
  companyDetails,
  companyList,
  searchCompany,
} = require("../controllers/companyController");
const { 
  createCompanyValidation,
} = require("../validation/company/companyDataValidation");
const authoriseAdmin = require("../middlewares/authorization");
const { tokenAuthentication } = require("../middlewares/authToken");
const { companyUpload } = require("../middlewares/companyImageStorage");

companyRouter.post(
  "/addcompany",
  companyUpload.single("companyPic"),
  tokenAuthentication,
  authoriseAdmin,
  createCompanyValidation,
  createCompany
);
companyRouter.get("/list", companyList);
companyRouter.post("/search", searchCompany);
companyRouter.get("/details/:id", companyDetails);

module.exports = companyRouter;

const { unlinkSync } = require("fs");
const companyModel = require("../models/companyModel");
const companyReviewModel = require("../models/companyReviewModel");

module.exports = {
  createCompany: async (req, res) => {
    try {
      const newCompany = new companyModel(req.body);
      newCompany.companyName = req.body.companyName
        .trim()
        .replace(/^[a-z]/, (match) => match.toUpperCase());
      console.log(newCompany);
      const checkCompany = await companyModel.findOne({
        companyName: req.body.companyName,
      });
      if (checkCompany != null) {
        req.file ? unlinkSync(req.file.path) : null;
        res.status(409).json({
          success: false,
          message: "This company is already exists",
        });
      } else {
        const filePath = `/uploads/company/${req.file.filename}`;
        newCompany.companyPic = filePath;
        const company = await newCompany.save();
        res.status(201).json({
          success: true,
          message: "Company created",
          addedCompany: company,
        });
      }
    } catch (error) {
      res.status(500).json({
        sucess: false,
        message: `Error occured : ${error.message}`,
      });
    }
  },

  companyDetails: async (req, res) => {
    companyID: req.params.id;
    userID: req.params.user;
    try {
      const companyData = await companyModel.findById(req.params.id);
      const reviewDataList = await companyReviewModel
        .find({ companyID: req.params.id })
        // console.log(companyData,reviewDataList,"*****")
        .populate({ path: "userID", select: "userName profilePic" });
      res.status(200).json({
        success: true,
        message: "Review list fetched Sucessfully",
        company: companyData,
        review: reviewDataList,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Review not found ${error.message}`,
      });
    }
  },

  companyList: async (req, res) => {
    try {
      const allCompanyData = await companyModel.find();
      res.status(200).json({
        success: true,
        message: "Got all company list",
        companyList: allCompanyData,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: `Company list not found`,
      });
    }
  },

  searchCompany: async (req, res) => {
    const searchData = req.body.companyCity;
    try {
      const searchCompanyData = await companyModel.find({
        companyCity: searchData,
      });
      res.status(200).json({
        success: true,
        message: `Got all companies ${searchData}`,
        companyList: searchCompanyData,
      });
    } catch (err) {
      res.status(403).json({
        success: false,
        error: err.message,
      });
    }
  },
};

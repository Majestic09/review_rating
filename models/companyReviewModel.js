const mongoose = require("mongoose");

const companyReviewSchema = mongoose.Schema({
  //userID : { type : mongoose.types.objectid} , refrencing ke liye liyaa hai
  companyReviewSubject: {
    type: String,
    required: true,
  },
  companyReview: {
    type: String,
    required: true,
  },
  companyReviewRating: {
    type: Number,
    required: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  companyID: {
    type: mongoose.Types.ObjectId,
    ref: "company",
    required: true,
  },
  isActive: {
    type: String,
    default: true,
  },
});
// user of create at and update at
companyReviewSchema.set("timestamps", true);

module.exports = mongoose.model("review", companyReviewSchema);

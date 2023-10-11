const joi = require("joi");

const reviewValSchema = {
  createReview: joi
    .object({
      companyReviewSubject: joi
        .string()
        .min(2)
        .max(30)
        .message({
          " string.min": "{#label} should contain at least {#limit} character",
          "string.max":
            "{#label} should contain not more than {#limit} character",
        })
        .required(),
      companyReview: joi.string().required(),
      companyReviewRating: joi.number().min(1).max(5).required(),
    })
    .unknown(true),
};
module.exports = reviewValSchema;

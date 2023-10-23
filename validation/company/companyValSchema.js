const joi = require("joi");

const companyValSchema = {
  createCompany: joi
    .object({
      companyName: joi
        .string()
        .min(2)
        .max(30)
        .message({
          " string.min": "{#label} should contain at least {#limit} character",
          "string.max":
            "{#label} should contain not more than {#limit} character",
        })
        .required(),
      companyLocation: joi.string().required(),
      companyCity: joi.string().required(),
    })
    .unknown(true),
};

module.exports = companyValSchema;

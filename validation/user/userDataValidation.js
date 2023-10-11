const userValSchema = require("./userValSchema");

module.exports = {
  registerUserValidation: async (req, res, next) => {
    let isValid = await userValSchema.registerUser.validate(req.body, {
      // returning all custom errors
      aboutEarly: false,
    });
    if (isValid.error) {
      res.status(403).json({
        success: false,
        message: isValid.error.details[0].message,
      });
    } else {
      next();
    }
  },

  loginUserValidation: async (req, res, next) => {
    let isValid = await userValSchema.loginUser.validate(req.body, {
      aboutEarly: false,
    });
    if (isValid.error) {
      res.status(403).json({
        success: false,
        message: isValid.error.details[0].message,
      });
    } else {
      next();
    }
  },
};

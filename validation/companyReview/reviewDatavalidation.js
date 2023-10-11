
const reviewValSchema = require("./reviewValSchema")

module.exports = {
    createCompanyValidation: async (req, res, next) => {
        let isValid = await reviewValSchema.createReview.validate(req.body, {
            abortEarly:false
        })
        if (isValid.error) {
            res.status(403).json({
                success: false,
                message:isValid.error.details[0].message
            })
        } else {
            next();
        }
    }
}
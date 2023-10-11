
const companyReviewModel = require("../models/companyReviewModel");

module.exports = {
    createReview: async (req, res) => {
        const reviewData = new companyReviewModel(req.body);
        try {
            await reviewData.save();
            res.status(201).json({
                sucess: true,
                message: "Review Added Sucessfully",
                review:reviewData
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message:`Eroor Occured ${error.message}`
            })
        }
    }
}
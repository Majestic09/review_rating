
const mongoose = require("mongoose");
const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required:true
    },
    companylocation: {
        type: String,
        required:true
    },
    contact_details: {
        type: String,
        required:true
    },
    city: {
        type: String,
        required:true
    },
    isActive: {
        type: String,
        required:true
    },
    createdAt: {
        type: String,
        required:true
    },
    updatedAt: {
        type: String,
        required:true
    },
    user_id: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model("company",companySchema)
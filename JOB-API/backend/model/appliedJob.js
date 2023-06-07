const mongoose = require('mongoose')

const AppliedJobSchema = new mongoose.Schema({
    jCode: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["In Process", "Selected", "Rejected"],
        default: "In Process"
    }
},{
    collection: "appliedJobs",
    timestamps: true
})

module.exports = mongoose.model("AppliedJob", AppliedJobSchema)
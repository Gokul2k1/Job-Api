const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    jCode: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required:true
    },
    skills: {
        type: Array,
        required: true
    },
    exp: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    jobLevel: {
        type: String,
        required: true
    },
    jobDegree: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["open","completed"],
        default: "open"
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{
     collection: 'jobs',
     timestamps: true
})

module.exports = mongoose.model("Job", jobSchema)
const Job = require('../model/jobModel')

const jobController = {
    getAll: async (req,res) => {
        try {
            const data = await Job.find()
                return res.status(200).json({ length: data.length, jobs: data })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }, 
    getSingle: async (req,res) => {
        try {
            let id = req.params.id

            let job = await Job.findById({ _id: id })
                if(!job)
                    return res.status(404).json({ msg: "Requested Job not found"})

                return res.status(200).json({ job })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }, 
    create: async (req,res) => {
        try {
            const { jCode, title, subTitle, designation,salary,skills,exp, description, jobType, position, department,jobLevel, jobDegree } = req.body
            let extJob = await Job.findOne({ jCode: req.body.jCode })
                if(extJob)
                    return res.status(400).json({ msg: "Job code already exists."})

            let data = {
                jCode,
                title,
                subTitle,
                designation,
                salary,
                skills: req.body.skills.split(','),
                exp,
                description,
                jobType,
                position,
                department,
                jobLevel,
                jobDegree
            }

            const newJob = await Job.create(data)
                return res.status(200).json({ msg: "created successfully", newJob })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }, 
    update: async (req,res) => {
        try {
            let id = req.params.id 
                let extJob = await Job.findById({ _id: id })
                    if(!extJob)
                        return res.status(404).json({ msg: "Requested Job not found"})

            let updatedJob = await Job.findByIdAndUpdate({ _id : id }, req.body)
                return res.status(200).json({ msg: "Updated successfully", job: updatedJob })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }, 
    delete: async (req,res) => {
        try {
            let id = req.params.id 
                let extJob = await Job.findById({ _id: id })
                    if(!extJob)
                        return res.status(404).json({ msg: "Requested Job not found"})
            await Job.findByIdAndDelete({ _id: id })
                return res.status(200).json({ msg: "Deleted successfully"})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }, 
    getByCode: async (req,res) => {
        try {
            let jCode = req.params.jCode

            let job = await Job.findOne({ jCode })
                if(!job)
                    return res.status(404).json({ msg: "Requested Job  not found"})

                return res.status(200).json({ job })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports  = jobController
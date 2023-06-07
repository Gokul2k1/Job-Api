const AppliedJob = require('../model/appliedJob')

const appliedJobCtrl = {
    getAll: async (req,res) => {
        try {
            const data = await AppliedJob.find()
            
            let id = req.userId
            let filteredData = await data.filter(item => item.userId === id)

            return res.status(200).json({ length: filteredData.length, appliedJobs: filteredData })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getSingle: async (req,res) => {
        try {
            let id = req.params.id 
                let extJob = await AppliedJob.findById({_id: id })
                if(!extJob)
                    return res.status(404).json({ msg: "applied job id doesn't exists" })

            return res.status(200).json({ appliedJob: extJob })
        }catch(err){
            return res.status(500).json({ msg: err.message })
        }
    },
    create: async (req,res) => {
        try {
            const id = req.userId

            let extJobs = await AppliedJob.find()
            let matchJob = extJobs.filter(item => item.userId === id)
            let appliedMatch = matchJob.find(item => item.jCode === req.body.jCode)

               if(appliedMatch)
                    return res.status(400).json({ msg: "Hi, you already applied for this job"})
               
            
            let data = await AppliedJob.create(req.body)
            return res.status(200).json({ msg: "Job request submitted successfully..", applied: data })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req,res) => {
        try {
            let id = req.params.id 
                let extJob = await AppliedJob.findById({ _id: id })
            if(!extJob)
                return res.status(404).json({ msg: `Requested applied job id not found..`})

           let updated = await AppliedJob.findByIdAndUpdate({ _id : id }, req.body)
            return res.status(200).json({ msg: "Updated successfully.", updated })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    delete: async (req,res) => {
        try {
            let id = req.params.id 
            let extJob = await AppliedJob.findById({ _id: id })
        if(!extJob)
            return res.status(404).json({ msg: `Requested applied job id not found..`})

            await AppliedJob.findByIdAndDelete({ _id: id })
            return res.status(200).json({ msg: "Deleted successfully.."})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    readAll: async (req,res) => {
        try {
            const data = await AppliedJob.find()
            
            return res.status(200).json({ length: data.length, appliedJobs: data })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = appliedJobCtrl
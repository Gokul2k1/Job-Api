const User = require('../model/userModel')

const adminAuth = async (req,res,next) => {
    try {
        const id = req.userId

        let extUser = await User.findById({ _id: id }).select('-password')
        
            if(extUser.role !== "admin")
                return res.status(401).json({ msg: "Un Authorized.. Admin resource blocked for non-admin"  })

            next() 
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

module.exports = adminAuth
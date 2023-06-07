const User = require('../model/userModel')

const hrAuth = async (req,res,next) => {
    try {
        const id = req.userId

        let extUser = await User.findById({ _id: id }).select('-password')
        
            if(extUser.role !== "hr")
                return res.status(401).json({ msg: "Un Authorized.. HR resource blocked for others."  })
            
            next() 
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

module.exports = hrAuth
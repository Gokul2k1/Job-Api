const jwt = require('jsonwebtoken')
const { generateKey } = require('../util/token')

const authMiddleware = async (req,res,next) => {
    try {
        const aToken = req.header('Authorization')  // headers

        let secret_key = generateKey()

        await jwt.verify(aToken, secret_key, (err,response) => {
            if(err) 
                return res.status(400).json({ msg: "Token Expired.. Invalid Auth.."})

            // res.json({ id : response.id })

            //forward user id to current User controller
            req.userId = response.id
            next()
        })
         
        // res.json({ aToken })

    }catch(err) {
        res.status(500).json({ msg: err.message })
    }
}

module.exports = authMiddleware
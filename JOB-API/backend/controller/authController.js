const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const { createAccessToken, sendResponseWithCookie, validateAuthToken, passwordToken, generateKey } = require('../util/token')
const forgotPasswordTemplate = require('../util/forgotPasswordTemplate')
const sendMail = require('../util/mail')
const jwt = require('jsonwebtoken')

const userController = {  
    register: async (req,res) => {
        try {
            const { name, email, password, mobile } = req.body

            // email duplicate validation
            let extEmail = await User.findOne({ email })
                if(extEmail)
                    return res.status(400).json({ msg: `Sorry, '${email}' mail id already registered`})

            // mobile number duplicate validation
            let extMobile = await User.findOne({ mobile })
                if(extMobile)
                    return res.status(400).json({ msg: `Sorry, ${mobile} number already registered.`})

            // generating password salt (10-bit)
            let passHash = await bcrypt.hash(password, 10); // (input,salt bit)
            
            const newUser = await User.create({
                name,
                email,
                mobile,
                password: passHash
            });

            res.json({ msg: "User Registered Successfully", user: newUser })

        } catch(err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req,res) => {
        try {
            const { email, password } = req.body

            // checking user email exists or not
            let extUser = await User.findOne({ email })
                if(!extUser)
                    return res.status(404).json({ msg: `${email} is not registered.`}) // 404 - not found

            // validate active or not
                if(!extUser.isActive)
                    return res.status(401).json({ msg: `Hi,${extUser.name} your authorization is blocked by admin.`})

            // compare password
            let compPass = await bcrypt.compare(password,extUser.password) // bcrypt.compare(string,salt)
                if(!compPass)                 
                    return res.status(400).json({ msg: "Passwords doesn't matched."}) // 400 - Bad request

            let authToken = await createAccessToken({ id: extUser._id })
               let cookieToken = await sendResponseWithCookie({ res, id: extUser._id })

               res.cookie('authToken', cookieToken, {
                httpOnly: true,
                signed : true,
                path: `/api/v1/auth/token/validate`,
                maxAge: 24 * 60 * 60 * 1000
               })

            res.status(200).json({ msg: "Login successful", authToken })
        } catch(err) {
            return res.status(500).json({ msg: err.message }) // 500 - Internal server error
        }
    },
    logout: async (req,res) => {
        try {
            res.clearCookie('authToken', { path: `/api/v1/auth/token/validate`})
            res.status(200).json({ msg: "Logout Successfully"})

        } catch(err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    currentUser: async (req,res) => {
        try {
            const id = req.userId

            let data = await User.findById({ _id : id }).select('-password')

            res.json({ user : data })
        } catch(err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    forgetPassword: async (req,res) => {
        try {
           const { email } = req.body

           // validate email 
                let extUser = await User.findOne({ email })
                    if(!extUser)
                        return res.status(404).json({ msg: 'Email is not registered..'})

            let passToken = await passwordToken({ id: extUser._id })

            // send passToken through mail id
            let template = forgotPasswordTemplate(extUser.name,email,passToken)

            let mailRes = await sendMail(email,"Reset Password", template)
            
            res.json({ msg: "Password link send successfully to email.", mailRes })

        } catch(err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updatePassword: async (req,res) => {
        try {
            const rToken = req.params.token;
            const { password } = req.body

             // generating password salt (10-bit)
             let passHash = await bcrypt.hash(password, 10); // (input,salt bit)

                if(!rToken)
                    return res.status(401).json({ msg: "Invalid Token.."})
            let secret_key = generateKey()

           await jwt.verify(rToken,secret_key,async (err,response) => {
                if(err)
                    return res.status(400).json({ msg: "Invalid Auth Token.."})
                let id = response.id;
               await  User.findByIdAndUpdate({ _id: id }, { password: passHash })
                
                 return res.status(200).json({ msg: "Password Updated Successfully"})
            })
            // res.json({ rToken })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    validateAuth: async (req,res) => {
        try {
            const rToken = req.signedCookies.authToken;
                if(!rToken)
                    return res.status(400).json({ msg: "Session Expired, Login Again.."})

                validateAuthToken(rToken,res)
                
            // res.json({ rToken })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAllUsers: async (req,res) => {
        try {
            let extUsers = await User.find().select('-password')

            let data = extUsers.filter((item) => item.role !== "admin")

            res.status(200).json({ length: data.length, users: data })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProfile: async (req,res) => {
        try {
            let id = req.userId
            let data = req.body

            await User.findByIdAndUpdate({ _id: id }, data)

                res.status(200).json({ msg: "Profile updated successfully."})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    changeUserInfo: async (req,res) => {
        try {
            let id = req.params.id
            let data = req.body

            await User.findByIdAndUpdate({ _id: id }, data)

                res.status(200).json({ msg: "User info updated successfully."})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req,res) => {
        try {
            id = req.params.id 

            await User.findByIdAndDelete({ _id: id })

            res.status(200).json({ msg: "User Data deleted successfully.."})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUserById: async (req,res) => {
        try {
            const id = req.params.id

            let data = await User.findById({ _id : id }).select('-password')

            res.json({ user : data })
        } catch(err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = userController
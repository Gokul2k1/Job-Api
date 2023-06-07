const authRoute = require('express').Router()
const authController = require('../controller/authController')
const authMiddleware = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const hrAuth = require('../middleware/hrAuth')

authRoute.post(`/register`, authController.register)
authRoute.post(`/login`, authController.login)
authRoute.get(`/logout`, authController.logout)
authRoute.get(`/token/validate`, authController.validateAuth)
authRoute.get(`/currentuser`, authMiddleware, authController.currentUser)

// non-admin users
authRoute.get(`/users/all`, authMiddleware, adminAuth, authController.getAllUsers)

// hr auth
authRoute.get(`/user/:id`, authMiddleware, hrAuth, authController.getUserById)

// update profile
authRoute.patch(`/update/profile`, authMiddleware, authController.updateProfile)

// update role and active
authRoute.patch(`/update/user/:id`, authMiddleware,adminAuth, authController.changeUserInfo)

// password generation 
authRoute.post(`/password/generate`, authController.forgetPassword)

// password validation and update password
authRoute.patch(`/password/update/:token`, authController.updatePassword)

// delete user => admin auth
authRoute.delete(`/delete/user/:id`, authMiddleware, adminAuth, authController.deleteUser)

module.exports = authRoute                                                        
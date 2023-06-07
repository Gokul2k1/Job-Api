const jobRoute = require('express').Router()
const jobController = require('../controller/jobController')
const authMiddleware = require('../middleware/auth')
const hrAuth = require('../middleware/hrAuth')

jobRoute.get(`/all`, authMiddleware, jobController.getAll)
jobRoute.get(`/:id`, authMiddleware, jobController.getSingle)


// access control only HR
jobRoute.get(`/code/:jCode`, authMiddleware, hrAuth, jobController.getByCode)
jobRoute.post(`/new`, authMiddleware, hrAuth, jobController.create)
jobRoute.patch(`/update/:id`, authMiddleware, hrAuth, jobController.update)
jobRoute.delete(`/delete/:id`,authMiddleware, hrAuth, jobController.delete)

module.exports = jobRoute
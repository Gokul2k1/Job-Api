const route = require('express').Router()
const appliedJobCtrl = require('../controller/appliedJobCtrl')
const auth = require('../middleware/auth')
const hrAuth = require('../middleware/hrAuth')

route.get(`/all`, auth, appliedJobCtrl.getAll)
route.get(`/single/:id`, auth, appliedJobCtrl.getSingle)
route.post(`/new`, auth, appliedJobCtrl.create)
route.patch(`/update/:id`, auth, appliedJobCtrl.update)
route.delete(`/delete/:id`, auth, appliedJobCtrl.delete)

// only to hr
route.get(`/readAll`, auth,  appliedJobCtrl.readAll)

module.exports = route
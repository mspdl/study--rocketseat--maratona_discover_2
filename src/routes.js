const express = require('express')
const routes = express.Router()
const DashboardController = require('./controllers/DashboardController')
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')


routes.get('/', DashboardController.index)
routes.get('/job', JobController.showJob)
routes.post('/job', JobController.createJob)
routes.get('/job/:id', JobController.editJob)
routes.post('/job/:id', JobController.updateJob)
routes.post('/job/delete/:id', JobController.deleteJob)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.updateProfile)


module.exports = routes;
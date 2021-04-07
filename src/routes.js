const express = require('express')
const routes = express.Router()

const basePath = __dirname + "/views/"

const profile = {
    name: "Morgan",
    avatar: "https://avatars.githubusercontent.com/u/31082300?v=4",
    monthlyBudget: 3000,
    hoursPerDay: 6,
    daysPerWeek: 5,
    vacationPerYear: 4
}

routes.get('/', (req, res) => res.render(basePath + "index"))
routes.get('/job', (req, res) => res.render(basePath + "job"))
routes.get('/job/edit', (req, res) => res.render(basePath + "job-edit"))
routes.get('/profile', (req, res) => res.render(basePath + "profile", { profile }))


module.exports = routes;
const express = require('express')
const routes = express.Router()

const basePath = __dirname + "/views/"

const Profile = {
    data: {
        name: "Morgan",
        avatar: "https://github.com/mspdl.png",
        monthlyBudget: 3000,
        hoursPerDay: 6,
        daysPerWeek: 5,
        vacationPerYear: 4,
        hourValue: 75
    },
    controllers: {
        index(req, res) {
            return res.render(basePath + "profile", { profile: Profile.data })
        },
        updateProfile(req, res){
            // req.body to get data
            const profile = req.body
            // define how many weeks a year is: 52
            const weeksPerYear = 52
            // remove the holiday weeks of the year, to get how many weeks have a month
            const weeksPerMonth = (weeksPerYear - profile.vacationPerYear) / 12
            // total hours worked in the week
            const weekTotalHours = profile.hoursPerDay * profile.daysPerWeek
            // total hours worked in the month
            const monthlyTotalHours = weekTotalHours * weeksPerMonth
            // what will be the value of my hour?
            profile.hourValue = profile.monthlyBudget / monthlyTotalHours
            Profile.data = profile;
            res.redirect('/profile')
        }
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            dailyHours: 2,
            totalHours: 1,
            createdAt: Date.now()
        },
        {
            id: 2,
            name: "OneTwo Project",
            dailyHours: 3,
            totalHours: 47,
            createdAt: Date.now()
        }
    ],
    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) => {
                // job's setting
                const remainingDays = Job.services.calcRemainingDays(job)
                const status = remainingDays <= 0 ? 'done' : 'progress'
                const budget = Job.services.calcBudget(job, Profile.data.hourValue)
                return {
                    ...job,
                    remainingDays,
                    status,
                    budget
                }
            })
            return res.render(basePath + "index", { jobs: updatedJobs })
        },
        createJob(req, res) {
            // req.body = { name: 'morgan', dailyHours: '1', totalHours: '1' }
            const jobs = Job.data;
            const lastId = jobs[jobs.length - 1] ? jobs[jobs.length - 1].id : 0;
            jobs.push({
                id: lastId + 1,
                name: req.body.name,
                dailyHours: req.body.dailyHours,
                totalHours: req.body.totalHours,
                createdAt: Date.now() // defining today's date
            })
            return res.redirect('/')
        },
        showJob(req, res) {
            return res.render(basePath + "job")
        },
        editJob(req, res) {
            const jobId = Number(req.params.id);
            const job = Job.data.find(job => Number(job.id) === jobId)
            if(!job) {
                return res.send('Job not found!')
            }

            job.budget = Job.services.calcBudget(job, Profile.data.hourValue)

            return res.render(basePath + "job-edit", { job })
        },
        updateJob(req, res){
            const jobId = Number(req.params.id);
            const job = Job.data.find(job => Number(job.id) === jobId)
            if(!job) {
                return res.send('Job not found!')
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                totalHours: req.body.totalHours,
                dailyHours: req.body.dailyHours
            }
            Job.data = Job.data.map(job => {
                if(Number(job.id) === jobId){
                    job = updatedJob
                }
                return job
            })
            res.redirect('/job/' + jobId)
        },
        deleteJob(req, res){
            const jobId = Number(req.params.id)

            Job.data = Job.data.filter(job => Number(job.id) !== jobId)

            res.redirect('/')
        }
    },
    services: {
        calcRemainingDays(job) {
            // remaining time calculation
            const remainingDays = Math.ceil(job.totalHours / job.dailyHours)
            const createdDate = new Date(job.createdAt)
            const dueDay = createdDate.getDate() + remainingDays
            const dueDateInMs = createdDate.setDate(dueDay)
            const timeDiffInMs = dueDateInMs - Date.now()
            // transform milliseconds in days
            const dayInMs = 1000 * 60 * 60 * 24
            return Math.floor(timeDiffInMs / dayInMs)
        },
        calcBudget(job, hourValue){
            return hourValue * job.totalHours
        }
    }
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.showJob)
routes.post('/job', Job.controllers.createJob)
routes.get('/job/:id', Job.controllers.editJob)
routes.post('/job/:id', Job.controllers.updateJob)
routes.post('/job/delete/:id', Job.controllers.deleteJob)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.updateProfile)


module.exports = routes;
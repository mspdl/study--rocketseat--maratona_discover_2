const Job = require('../model/Job')
const JobUtils = require('../utils/jobUtils')
const Profile = require('../model/Profile')

module.exports = {

    showJob(req, res) {
        return res.render("job")
    },

    createJob(req, res) {
        const jobs = Job.get()
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

    editJob(req, res) {
        const jobs = Job.get()
        const profile = Profile.get()
        const jobId = Number(req.params.id);

        const foundJob = jobs.find(job => Number(job.id) === jobId)

        if (!foundJob) {
            return res.send('Job not found!')
        }

        foundJob.budget = JobUtils.calcBudget(foundJob, profile.hourValue)

        return res.render("job-edit", { job: foundJob })
    },

    updateJob(req, res) {
        const jobs = Job.get()
        const jobId = Number(req.params.id);

        const foundJob = jobs.find(job => Number(job.id) === jobId)
        if (!foundJob) {
            return res.send('Job not found!')
        }

        const updatedJob = {
            ...foundJob,
            name: req.body.name,
            totalHours: req.body.totalHours,
            dailyHours: req.body.dailyHours
        }

        const jobsUpdated = jobs.map(job => {
            if (Number(job.id) === jobId) {
                job = updatedJob
            }
            return job
        })

        Job.set(jobsUpdated)
        
        res.redirect('/job/' + jobId)
    },

    deleteJob(req, res) {
        const jobId = Number(req.params.id)

        Job.delete(jobId)

        res.redirect('/')
    }

}
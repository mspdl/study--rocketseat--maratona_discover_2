const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {

    index(req, res) {
        const jobs = Job.get()
        const profile = Profile.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let totalHoursOfProjectsInProgress = 0

        const updatedJobs = jobs.map((job) => {
            // job's setting
            const remainingDays = JobUtils.calcRemainingDays(job)
            const status = remainingDays <= 0 ? 'done' : 'progress'
            const budget = JobUtils.calcBudget(job, profile.hourValue)

            statusCount[status] += 1

            if(status == 'progress'){
                totalHoursOfProjectsInProgress += Number(job.dailyHours)
            }

            return {
                ...job,
                remainingDays,
                status,
                budget
            }
        })

        const freeHours = profile.hoursPerDay - totalHoursOfProjectsInProgress
        return res.render("index", { jobs: updatedJobs, profile, statusCount, freeHours })
    }

}
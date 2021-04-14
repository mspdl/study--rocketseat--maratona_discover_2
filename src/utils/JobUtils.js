module.exports = {

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

    calcBudget(job, hourValue) {
        return hourValue * job.totalHours
    }

}
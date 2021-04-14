const Profile = require('../model/Profile')

module.exports = {

    index(req, res) {
        return res.render("profile", { profile: Profile.get() })
    },

    updateProfile(req, res) {
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
        const hourValue = profile.monthlyBudget / monthlyTotalHours

        Profile.set({
            ...Profile.data,
            ...req.body,
            hourValue
        })

        res.redirect('/profile')
    }
}
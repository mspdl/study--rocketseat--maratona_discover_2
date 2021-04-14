let data = {
    name: "Morgan",
    avatar: "https://github.com/mspdl.png",
    monthlyBudget: 3000,
    hoursPerDay: 6,
    daysPerWeek: 5,
    vacationPerYear: 4,
    hourValue: 75
}

module.exports = {

    get() {
        return data
    },

    set(newData) {
        data = newData
    }

}
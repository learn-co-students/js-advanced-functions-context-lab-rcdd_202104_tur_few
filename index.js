/* Your Code Here */
function createEmployeeRecord (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: parseInt(array[3]),
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    let records = []
    array.forEach(element => {
        records.push(createEmployeeRecord(element))
    });
    return records
}

function createTimeInEvent (timeStamp) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(timeStamp.split(' ')[1]),
        date: timeStamp.split(' ')[0]
    })
    return this
}

function createTimeOutEvent (timeStamp) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timeStamp.split(' ')[1]),
        date: timeStamp.split(' ')[0]
    })
    return this
}

function hoursWorkedOnDate (date) {
    let timeIn = this.timeInEvents.find(time => time.date == date)
    let timeOut = this.timeOutEvents.find(time => time.date === date)

    return (parseInt(timeOut.hour - timeIn.hour) / 100)
}

function wagesEarnedOnDate(date) {
    return(hoursWorkedOnDate.call(this,date) * this.payPerHour)
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// function allWagesFor(employee) {
//     const dates = employee.timeInEvents.map((e) => e.date)
//     return dates.reduce((acc,curr) => (acc + wagesEarnedOnDate(employee, curr)), 0)
// }

function findEmployeeByFirstName(records, name) {
    return records.find(employee => (employee.firstName === name))
}

function calculatePayroll(records) {
    return records.reduce((acc, curr) => acc + allWagesFor.call(curr), 0)
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

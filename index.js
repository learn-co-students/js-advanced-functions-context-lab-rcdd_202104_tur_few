/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord (Array) {
    const object = { firstName: Array[0], familyName: Array[1], title: Array[2], payPerHour: Array[3], timeInEvents: [], timeOutEvents: [] }
    return object
}

function createEmployeeRecords (Arrays) {
    return Arrays.map(element => createEmployeeRecord(element))
    }

function createTimeInEvent (dateStamp) {
    const TimeInObject = { 
        type : "TimeIn",
        hour : parseInt(dateStamp.split(' ')[1]),
        date : dateStamp.split(' ')[0]
    }
    this.timeInEvents.push(TimeInObject)
return this
}

function createTimeOutEvent (dateStamp) {
    const TimeOutObject = { 
        type : "TimeOut",
        hour : parseInt(dateStamp.split(' ')[1]),
        date : dateStamp.split(' ')[0]
    }
    this.timeOutEvents.push(TimeOutObject)
return this
}

function hoursWorkedOnDate (dateStamp) { 
    const dateTimeIn = this.timeInEvents.find(({date}) => date === dateStamp)
    const dateTimeOut = this.timeOutEvents.find(({date}) => date === dateStamp)
    return (dateTimeOut.hour-dateTimeIn.hour)/100
}  

function wagesEarnedOnDate (dateStamp) {
    return hoursWorkedOnDate.call(this, dateStamp)*this.payPerHour
}

function calculatePayroll (srcArray) {
    return srcArray.reduce((total,element) => total + allWagesFor.call(element), 0)
}

function findEmployeeByFirstName (srcArray, firstName) {
    return srcArray.find ((employee) => employee.firstName === firstName);
}
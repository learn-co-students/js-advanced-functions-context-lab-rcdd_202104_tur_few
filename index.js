function createEmployeeRecord(arr){
    return { firstName: arr[0], familyName: arr[1], title: arr[2], payPerHour: arr[3], timeInEvents: [], timeOutEvents: [] };
}

function createEmployeeRecords(arrs){
    return arrs.map(arr => createEmployeeRecord(arr));
}

function createTimeInEvent(date){
    this.timeInEvents.push({ type: "TimeIn", hour: parseInt(date.slice(-4)), date: date.slice(0,-5) });
    return this;
}
function createTimeOutEvent(date){
    this.timeOutEvents.push({ type: "TimeOut", hour: parseInt(date.slice(-4)), date: date.slice(0,-5) });
    return this;
}
function hoursWorkedOnDate(date){
    let inDate = this.timeInEvents.find(event => event.date === date);
    let outDate = this.timeOutEvents.find(event => event.date === date);
    return (outDate.hour - inDate.hour) / 100;
}
function wagesEarnedOnDate(date){
    return this.payPerHour * hoursWorkedOnDate.call(this, date);
}
function findEmployeeByFirstName(arr, name){
    return arr.find(employee => employee.firstName === name);
}
function calculatePayroll(employees){
    return employees.reduce((acc, curr) => acc + allWagesFor.call(curr),0);
}

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

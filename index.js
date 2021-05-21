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

function createEmployeeRecord ([firstName, familyName, title, payPerHour]) {
    const obj = {
        firstName: `${firstName}`,
        familyName: `${familyName}`,
        title: `${title}`,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    }
    return obj;
};


function createEmployeeRecords (arrays) {
return arrays.map(element => element = createEmployeeRecord(element))
};


function createTimeInEvent(date){
     this.timeInEvents.push({ type: "TimeIn", hour: parseInt(date.slice(-4)), date: date.slice(0,-5) });
     return this;
 }

 function createTimeOutEvent(date){
      this.timeOutEvents.push({ type: "TimeOut", hour: parseInt(date.slice(-4)), date: date.slice(0,-5) });
      return this;
  }

function hoursWorkedOnDate(date){
  let timeIn = this.timeInEvents.find(checkIn => checkIn.date === date);
  let timeOut = this.timeOutEvents.find(checkOut => checkOut.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate (date){
  return this.payPerHour * hoursWorkedOnDate.call(this, date);
}


function calculatePayroll(employeeArr) {
  return employeeArr.reduce((acc, payroll) => acc + allWagesFor.call(payroll),0);
}

function findEmployeeByFirstName (srcArray, firstName){
  return srcArray.find((employee) => employee.firstName === firstName);
}

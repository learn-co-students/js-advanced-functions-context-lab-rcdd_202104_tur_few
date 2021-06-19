function createEmployeeRecord(arr) {
  let employee = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employee;
}
function createEmployeeRecords(arr) {
  let employees = [];
  arr.forEach(element => {
    employees.push(createEmployeeRecord(element));
  });
  return employees;
}
function createTimeInEvent(timeStamp) {
  let hour = parseInt(timeStamp.split(" ")[1]);
  let date = timeStamp.split(" ")[0];
  this.timeInEvents.push({ type: "TimeIn", hour: hour, date: date });
  return this;
}

function createTimeOutEvent(timeStamp) {
  let hour = parseInt(timeStamp.split(" ")[1]);
  let date = timeStamp.split(" ")[0];
  this.timeOutEvents.push({ type: "TimeOut", hour: hour, date: date });
  return this;
}
function hoursWorkedOnDate(timeStamp) {
  let timeIn = this.timeInEvents.find(x => x.date === timeStamp);
  let timeOut = this.timeOutEvents.find(x => x.date === timeStamp);
  let hours = (timeOut.hour - timeIn.hour) / 100;
  return hours;
}
function wagesEarnedOnDate(timeStamp) {
  return hoursWorkedOnDate.call(this, timeStamp) * this.payPerHour;
  //return hoursWorkedOnDate(employee, timeStamp) * employee.payPerHour;
}
function findEmployeeByFirstName(employees, firstName) {
  return employees.find(employee => employee.firstName === firstName);
}
function calculatePayroll(employees) {
  let sum = employees.reduce((acc, curr) => acc + allWagesFor.call(curr), 0);
  return sum;
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
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

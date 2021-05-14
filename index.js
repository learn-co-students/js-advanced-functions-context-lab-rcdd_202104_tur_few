/* Your Code Here */

const createEmployeeRecord = (arr) => {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
};

const createEmployeeRecords = (array) => {
    return array.map(arr => {
        return createEmployeeRecord(arr);
    });
}

/* 
Why this only works when i don't use arrow function ??
This is my arrow function (the one in line 48):
const createTimeInEvent = timeStamp => {............};
also why using return in line 49 doesnt work (return this.timeInEvents.push({.....}); ?
same questions goes for all upcoming functions (regarding arrow function) :(
*/
const createTimeInEvent = function(timeStamp) {
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(timeStamp.split(' ')[1]),
        date: timeStamp.split(' ')[0]
    });
    return this;
};

const createTimeOutEvent = function(timeStamp) {
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(timeStamp.split(' ')[1]),
        date: timeStamp.split(' ')[0]
    });
    return this;
};

const hoursWorkedOnDate = function(date) {
    const inTime = this.timeInEvents.find(time => time.date === date);
    const outTime = this.timeOutEvents.find(time => time.date === date);
    return ((outTime.hour - inTime.hour) / 100);
};

const wagesEarnedOnDate = function(date) {
    return parseInt(hoursWorkedOnDate.call(this, date)) * parseInt(this.payPerHour);
};

// allWagesFor function is given at the very beginning of this i just moved it here! to check it :(

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

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0); // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
};

const findEmployeeByFirstName = function(array, name) {
    return array.find(arr => arr.firstName === name);
};

const calculatePayroll = function(array) {
    return array.reduce((acc, curr) => (acc + allWagesFor.call(curr)), 0);
};
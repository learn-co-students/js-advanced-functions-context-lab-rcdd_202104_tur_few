let nameArr = ["ayse","basar","ms", 5];

function createEmployeeRecord(name){
  console.log(name)
  let newObj = {
    firstName : name[0],
    familyName : name[1],
    title : name[2],
    payPerHour : name[3],
    timeInEvents : [],
    timeOutEvents : []
  }
  return newObj
}

const createEmployeeRecords = (array) => {
    return array.map(arr => {
        return createEmployeeRecord(arr);
    });
}


const createTimeInEvent = function(date) {
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    });
    return this;
};

const createTimeOutEvent = function(date) {
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
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

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(arr => arr.firstName === firstName);
};

const calculatePayroll = function(array) {
    return array.reduce((acc, curr) => (acc + allWagesFor.call(curr)), 0);
};
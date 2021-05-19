/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }


let aliVeliInfo = ["ali", "veli", "a", "10", "c"];
let eyYoInfo = ["ey", "yo", "x", "20", "z"];
let aliVeliRecord = createEmployeeRecord(aliVeliInfo); //Some hoisting here!
let eyYoRecord = createEmployeeRecord(eyYoInfo); //Some hoisting here!



// Creates a record from the given info.
function createEmployeeRecord(employeeInfo = aliVeliInfo) {

    let record = {
        "firstName": employeeInfo[0],
        "familyName": employeeInfo[1],
        "title": employeeInfo[2],
        "payPerHour": employeeInfo[3] 
    };

    record.timeInEvents = [];
    record.timeOutEvents = [];

    return record;

};

createEmployeeRecord.call(undefined, aliVeliInfo);

//                                              //                                      //



// Creates records of the people given information of.
function createEmployeeRecords(employeeInfos = [aliVeliInfo, eyYoInfo]) {

    let records = employeeInfos.map(createEmployeeRecord);

    return records;

};

createEmployeeRecords.call(undefined, [aliVeliInfo, eyYoInfo]);

//                                              //                                      //



// Creates a timeInEvent from the given record of the person with the data given as the second parameter.
const createTimeInEvent = function(dateAndHourString = "2014-02-28 1400") {

    let dateAndHour = dateAndHourString.split(" ");
    let dateString = dateAndHour[0];
    let hourNumber = parseInt(dateAndHour[1], 10);

    let event = {

        "type": "TimeIn",
        "date": dateString,
        "hour": hourNumber

    };

    // this keyword represents the record
    this.timeInEvents.push(event);

    return this;

};

createTimeInEvent.call(aliVeliRecord, "2014-02-28 1400");

//                                              //                                       //


// Creates a timeOutEvent from the given record of the person with the data given as the second parameter.
const createTimeOutEvent = function(dateAndHourString = "2014-02-28 1400") {

    let dateAndHour = dateAndHourString.split(" ");
    let dateString = dateAndHour[0];
    let hourNumber = parseInt(dateAndHour[1], 10);

    let event = {

        "type": "TimeOut",
        "date": dateString,
        "hour": hourNumber

    };

    // this keyword represents the record
    this.timeOutEvents.push(event);

    return this;
    
};

createTimeOutEvent.call(aliVeliRecord, "2014-02-28 1800");

//                                          //                                          //



// Calculates the record's total work in a certain date
const hoursWorkedOnDate = function(date) {

    console.log(this)

    let timeInEvent = this.timeInEvents.filter(function(event) {
        if (event.date === date) {
            return true;
        }
    });

    let timeOutEvent = this.timeOutEvents.filter(function(event) {
        if (event.date === date) {
            return true;
        }
    });


    return (timeOutEvent[0].hour - timeInEvent[0].hour) / 100;

};

hoursWorkedOnDate.call(aliVeliRecord, "2014-02-28");

//                                              //                                  //



// Calculates the money the person earned in the given date
const wagesEarnedOnDate = function(date) {

    return hoursWorkedOnDate.call(this, date) * this.payPerHour;

};

wagesEarnedOnDate.call(aliVeliRecord, "2014-02-28");

//                                          //                                          //



// const allWagesFor = function() {

//     let workedDates = this.timeInEvents.map(function(event) {

//         return event.date;
        
//     });

//     let moneyEarnedOnDates = workedDates.map(function(date) {

//         return wagesEarnedOnDate.call(this, date);

//     }).bind(this);


//     function reducer(accumulator, currentValue) {
//         return accumulator += currentValue;
//     };

//     let totalMoney = moneyEarnedOnDates.reduce(reducer, 0);
//     console.log(totalMoney)
//     return totalMoney;

// };


let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (event) {
        return event.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    return payable
}

allWagesFor.call(aliVeliRecord);

//                                          //                                          //



const calculatePayroll = function(array) {

    return array.reduce(function(accumulator, currentValue) {

        return accumulator += allWagesFor.call(currentValue);
    }, 0 );

};

calculatePayroll.call([aliVeliRecord, eyYoRecord]);

//                                              //                                  //



function findEmployeeByFirstName(recordCollection, firstNameString) {

    return recordCollection.find((record) => record.firstName === firstNameString)

};

findEmployeeByFirstName.call(undefined, [aliVeliRecord, eyYoRecord], "ali")
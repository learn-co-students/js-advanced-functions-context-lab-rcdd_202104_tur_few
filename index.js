/* Your Code Here */
let array  = ["mustafa", "guldag", "manager", 4];


let createEmployeeRecord = function(array) {
    
      let newArray =  {
             firstName: array[0],
             familyName: array[1],
             title: array[2],
             payPerHour: array[3],
             timeInEvents:[],
             timeOutEvents:[],
         }
         return newArray
    
}

let createEmployeeRecords = function(employeeData){
    
    
    return employeeData.map(function(array){
        return createEmployeeRecord(array);


})
};

let createTimeInEvent = function(dateStamp) {

    

    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    });
    return this;

}

let createTimeOutEvent = function(dateStamp) {
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    });
    return this;

}

let hoursWorkedOnDate = function(dateStamp) {

    
        let timeIn = this.timeInEvents.find(time => time.date === dateStamp);
        let timeOut = this.timeOutEvents.find(time => time.date === dateStamp);
        let totalHour = (timeOut.hour - timeIn.hour) / 100;
        return totalHour


}

let wagesEarnedOnDate = function(dateStamp) {

    
    return parseInt(hoursWorkedOnDate.call(this, dateStamp)) * parseInt(this.payPerHour);
    

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

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(names => {return names.firstName === firstName})
  
  }
  
  let calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce((acc, curr) => (acc + allWagesFor.call(curr)), 0);
  
  }
let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(employeeArray){
    return Object.create({
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []

    })
}

function createEmployeeRecords(employeeArrays){
    return employeeArrays.map(createEmployeeRecord)
}

function createTimeInEvent(dateTimeStamp){
    let dateTimeStampSplit = dateTimeStamp.split(' ')
    let newTimeStamp = Object.create({
        type: "TimeIn",
        hour: parseInt(dateTimeStampSplit[1]),
        date: dateTimeStampSplit[0]
    })

    this.timeInEvents.push(newTimeStamp)
    return this
}

function createTimeOutEvent(dateTimeStamp){
    let dateTimeStampSplit = dateTimeStamp.split(' ')
    let newTimeStamp = Object.create({
        type: "TimeOut",
        hour: parseInt(dateTimeStampSplit[1]),
        date: dateTimeStampSplit[0]
    })

    this.timeOutEvents.push(newTimeStamp)
    return this
}

function hoursWorkedOnDate(dateWorked){
    let timeIn = this.timeInEvents.find( ({date}) => date === dateWorked );
    let timeOut = this.timeOutEvents.find( ({date}) => date === dateWorked)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(dateWorked){
    let hoursWorked = hoursWorkedOnDate.bind(this)
    return hoursWorked(dateWorked) * this.payPerHour
}

function findEmployeeByFirstName(srcArray, name){
    return srcArray.find(employee => employee.firstName === name)
}

function calculatePayroll(arrayOfEmployeeRecords){

    let total = 0
arrayOfEmployeeRecords.forEach(employee =>{
  total += allWagesFor.call(employee);
})
    return total

}
// Function to create an employee record
const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
};

// Function to create multiple employee records
const createEmployeeRecords = (employeeData) => {
    return employeeData.map(createEmployeeRecord);
};

// Function to add a TimeIn event
const createTimeInEvent = (employee, dateTimeString) => {
    let [date, hour] = dateTimeString.split(" ");
    
    employee.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10)
    });
    
    return employee;
};

// Function to add a TimeOut event
const createTimeOutEvent = (employee, dateTimeString) => {
    let [date, hour] = dateTimeString.split(" ");
    
    employee.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    });
    
    return employee;
};

// Function to calculate hours worked on a specific date
const hoursWorkedOnDate = (employee, date) => {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);
    
    return (timeOut.hour - timeIn.hour) / 100;
};

// Function to calculate wages earned on a specific date
const wagesEarnedOnDate = (employee, date) => {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
};

// Function to calculate total wages for an employee
const allWagesFor = (employee) => {
    return employee.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
};

// Function to find an employee by first name
const findEmployeeByFirstName = (employees, firstName) => {
    return employees.find(employee => employee.firstName === firstName);
};

// Function to calculate total payroll for all employees
const calculatePayroll = (employees) => {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
};


// NIVELL 1.1

const fs = require('fs');

const {employees, salaries } = JSON.parse(String(fs.readFileSync(`./employeesAndSalaries.json`)));

const getEmployee = (id) => {
    return new Promise((resolve, reject) => {
        let employee = employees.find(empl => empl.id == id);
        if(employee !== undefined){
            resolve(employee);
        }
        else{
            reject(new Error(`Employee with id == ${id} doesn't exist`));
        }
    });
}

const getSalary = (employee) => {
    return new Promise((resolve, reject) => {
        if(!employee
            || !employee.hasOwnProperty('id')
            || typeof employee.id !== 'number'){
            reject(new Error("You must pass a valid employee to the function getSalary(employee)"));
        }
        let salaryObj = salaries.find(salary => salary.id == employee.id);
        if(salaryObj === undefined){
            reject(new Error(`Salary with id == ${employee.id} doesn't exist`));
        }
        resolve(salaryObj.salary);
    });
}


// NIVELL 1.2

async function printEmployeeDetails(id){
    try {
        const employee = await getEmployee(id);
        const salary = await getSalary(employee);
        console.log(`The salary of the employee "${employee.name}" is $${salary}`);
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
}

for (let id = 1; id < 4 ; id++) {
    printEmployeeDetails(id);
}


// NIVELL 2

const wait2Seconds = () =>
    new Promise(async (resolve, reject) => {
        try {
            setTimeout(resolve, 2000);
        } catch (e) {
            reject(e);
        }
    }
);

wait2Seconds()
    .then(() => console.log(`Hello after 2 seconds!`))
    .catch(e => console.log(`Error: ${e.message}`))

module.exports = {
    getEmployee, getSalary, wait2SecondsAndPrint
}


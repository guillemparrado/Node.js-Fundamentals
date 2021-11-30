
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
        let salaryObj = salaries.find(salary => salary.id == employee.id);
        if(salaryObj !== undefined){
            resolve(salaryObj.salary);
        }
        else{
            reject(new Error(`Salary with id == ${employee.id} doesn't exist`));
        }
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


// NIVELL 2.1

const wait2Seconds = () =>
    new Promise((res, rej) => {
        setTimeout(res,2000);
    }
);

function wait2SecondsAndPrint(){
    return new Promise((resolve, reject) => {
        try {
            wait2Seconds().then(res => {
                console.log(`Hello after 2 seconds!`);
                resolve();
            });

        } catch (e) {
            // La meva funció wait2Seconds no llença errors generats en el seu reject, però no se si Promise o setTimeout en poden llençar de per si mateixos, (en cas que no, potser no caldria el try-catch a wait2SecondsAndPrint).
            reject(e);
        }
    });
}


async function executeWait2SecondsAndPrint(){
    try {
        await wait2SecondsAndPrint();
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
}


module.exports = {
    getEmployee, getSalary, wait2SecondsAndPrint
}


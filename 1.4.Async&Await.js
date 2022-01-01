
// NIVELL 1.1

let employees = [{
    id: 1,
    name: 'Linux Torvalds'
}, {
    id: 2,
    name: 'Bill Gates'
},{
    id: 3,
    name: 'Jeff Bezos'
}];

let salaries = [{
    id: 1,
    salary: 4000
}, {
    id: 2,
    salary: 1000
}, {
    id: 3,
    salary: 2000
}];

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
            setTimeout(
                () => {
                    console.log(`Hello after 2 seconds!`);
                    resolve();
                    },
                2000);
        } catch (e) {
            console.log(`Error: ${e.message}`);
            reject();
        }
    }
);

wait2Seconds();



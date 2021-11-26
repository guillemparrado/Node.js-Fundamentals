
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


// NIVELL 2

const wait2Seconds = () =>
    new Promise((res, rej) => {
        setTimeout(res,2000);
    }
);

async function wait2SecondsAndPrint(){
    try {
        await wait2Seconds();
        console.log("Hello after 2 seconds!");
    } catch (e) {
        // La meva funció wait2Seconds no llença errors generats en el seu reject, però no se si Promise o setTimeout en poden llençar de per si mateixos, (en cas que no, potser no caldria el try-catch a wait2SecondsAndPrint).
        console.log(`Error: ${e.message}`);
    }
}

wait2SecondsAndPrint();


// NIVELL 3

// Implementat als nivells 1 i 2



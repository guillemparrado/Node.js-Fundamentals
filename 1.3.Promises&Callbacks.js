
//NIVELL 1.1

function makePromise(){
    return new Promise((resolve, reject) => {
        if(promiseIsResolved)   resolve("Ex 1.1. Promise Resolved.");
        else                    reject(new Error('Ex 1.1. Promise Rejected.'));
    });
}

function makeAndCallPromise(){
    const promise = makePromise();
    promise
        .then(res => console.log(res))
        .catch(err => console.log(err.message));
}

// Resolved promise
let promiseIsResolved = true;
makeAndCallPromise();

// Rejected promise
promiseIsResolved = false;
makeAndCallPromise();


//NIVELL 1.2

const arrowFunc = (arg1, callback) => {
    const opcions = {
        mentor: "El mentor de l'especialització és Omar Olmedo",
        discord: "El canal de discord és backend_nodejs",
        reunions: "Les reunions son dilluns i dijous de 10:30 a 11h"
    }
    if(!(arg1 in opcions))
        throw new Error(`"${arg1}" no és una opció vàlida`);

    callback(opcions[arg1]);
};

const preguntes = Object.freeze(["mentor", "discord", "reunions", "asjqqwe"]);

for (const pregunta of preguntes) {
    try {
        arrowFunc(pregunta, console.log);
    }
    catch (e) {
        console.log(`Error: ${e.message}`)
    }
}

// També es podria passar una funció anònima en comptes de console.log si calgués fer més coses:
// arrowFunc(pregunta, (missatge) => {
//      ...
//      console.log(missatge);
// });


//NIVELL 2.1
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


getEmployee(1).then(res => console.log(res))
    .catch(e => console.log(`Error: ${e.message}`));
getEmployee(2).then(res => console.log(res))
    .catch(e => console.log(`Error: ${e.message}`));
getEmployee(4).then(res => console.log(res))
    .catch(e => console.log(`Error: ${e.message}`));


//NIVELL 2.2

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


//NIVELL 2.3


const id = 1;

getEmployee(id)
    .then(res => {
        let employee = res;
        getSalary(employee)
            .then(res => {
                console.log(`The salary of the employee "${employee.name}" is $${res}`);
            })
            .catch(e => console.log(`Error: ${e.message}`));
    })
    .catch(e => console.log(`Error: ${e.message}`))


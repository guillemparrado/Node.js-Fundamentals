
//NIVELL 1.1
/**
 * Crea una funció que retorni una Promise que invoqui la funció resolve() o reject() que rep. Invoca-la passant-li les dues funcions de manera que imprimeixin un missatge diferent depenent de si la Promise es resol o no.
 */

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
/**
 * Crea una arrow function que rebi un paràmetre i una funció callback i li passi a la funció un missatge o un altre (que s'imprimirà per consola) en funció del paràmetre rebut.
 */

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
/**
 * Donats els objectes employees i salaries, crea una arrow function getEmployee() que retorni una Promise efectuant la cerca en l'objecte pel seu id. 
 */
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
/**
 * Crea una altra arrow function getSalary() similar a l'anterior que rebi com a paràmetre un objecte employee i retorni el seu salari.
 */

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


//NIVELL 2.3, NIVELL 3
/**
 * Invoca la primera funció getEmployee() i després getSalary() niant l'execució de les dues promises de manera que es retorni per la consola el nom de l'empleat/da i el seu salari.
 * Fixa un element catch a la invocació del nivell anterior que capturi qualsevol error i el mostri per la consola.
 */

const id = 1;

getEmployee(id)
    .then(res => {
        let employee = res;
        getSalary(employee)
            .then(res => {
                console.log(`Tasca 1.3 nivell 2 exercici 3: The salary of the employee "${employee.name}" is $${res}`);
            })
            .catch(e => console.log(`Error: ${e.message}`));
    })
    .catch(e => console.log(`Error: ${e.message}`))


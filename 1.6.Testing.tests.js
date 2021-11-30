const fs = require('fs');

jest.mock("fs", () => ({
    readFileSync: jest.fn()
}));
const mockedJsonFile = `{
    "employees": [{
        "id": 1,
        "name": "Linux Torvalds"
    }, {
        "id": 2,
        "name": "Bill Gates"
    }, {
        "id": 3,
        "name": "Jeff Bezos"
    }],
    "salaries": [{
        "id": 1,
        "salary": 4000
    }, {
        "id": 2,
        "salary": 1000
    }, {
        "id": 3,
        "salary": 2000
    }]
}`;
fs.readFileSync.mockReturnValue(mockedJsonFile);

const {Persona, creaVehicle} = require('./1.2.Classes&ArrowFunctions');
const src3 = require('./1.3.Promises&Callbacks');
const src4 = require('./1.4.Async&Await');
const src6 = require('./1.6.Testing');


// NIVELL 1

//1.1
test(`Suma 1 + 2 i retorna 3`, () => {
    expect(src6.sumar(1,2)).toBe(3);
})

test(`Resta 1 - 2 i retorna -1`, () => {
    expect(src6.restar(1,2)).toBe(-1);
})

test(`Multiplica 1 * 2 i retorna 2`, () => {
    expect(src6.multiplicar(1,2)).toBe(2);
})

test(`Divideix 1 +/ 2 i retorna 0.5`, () => {
    expect(src6.dividir(1,2)).toBe(0.5);
})

// 1.2

test(`getEmployee`, async () => {
    const id = 1;
    const employee = (await src4.getEmployee(id)).name;
    expect(employee).toBe('Linux Torvalds');
})

test(`getSalary`, async () => {
    const id = 1;
    const employee = await src4.getEmployee(id);
    const salary = (await src4.getSalary(employee));
    expect(salary).toBe(4000);
})


// 1.3

'use strict';
jest.useFakeTimers();  // Cal posar fake timers per no anar sumant segons d'espera a cada test que provi funcions que continguin un timer
jest.spyOn(global, 'setTimeout');
jest.spyOn(console, 'log');
test('wait2SecondsAndPrint', (done) => {

    /*
    FONTS:
    https://jestjs.io/docs/timer-mocks
    https://jestjs.io/docs/asynchronous
    https://stackoverflow.com/a/49096207
     */

    // Test timer
    const logMessage = `Hello after 2 seconds!`;

    // Si ho faig amb async/await el test arriba a timeout, no es resol mai, per això ho faig amb then. No entenc pq té aquest comportament amb async.

    src4.wait2SecondsAndPrint().then(
        () => {
            try {
                // Problema: Cridant només l'expect, Jest no caça l'excepció en cas que falli (es pot veure canviant logMessage).
                // Solució: rebo DoneCallback a callback del test, el crido per comunicar fi de codi async del test i li passo l'error de tornada en cas que n'hi hagi perquè test el pugui caçar i gestionar com una fallada en comptes d'una excepció.
                // Test console.log print after 2 seconds
                expect(console.log).toHaveBeenLastCalledWith(logMessage);
                // Alternativament
                //expect(console.log).toHaveBeenCalledWith(logMessage);
                done();
            } catch (e) {
                done(e);
            }
        }
    );
    // Test de crida del timer
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2000);

    // Test que print de wait2SecondsAndPrint no s'hagi executat abans de passar els 2000ms
    expect(console.log).not.toHaveBeenCalledWith(logMessage);

    // Com que fem servir fake timers, cal correr el timer perquè completi la promesa de wait2Seconds
    /* OPCIONS per avançar timer: */
    jest.runAllTimers();
    //jest.advanceTimersByTime(2000);
    //jest.runOnlyPendingTimers();

    // M'asseguro que codi async sigui executat, si no s'executa només s'hauran executat les 2 assercions anteriors i la següent línia fallarà el test
    expect.assertions(3);
});


// 1.4

test(`getEmployeeAndSalary`, async () => {
    // La resolució a 1.3.Promises&Callbacks és una invocació i no una funció: no puc cridar la resolució com si fos una funció dins del test per executar el codi + en fer el require s'executa l'arxiu sencer i amb ell la resolució de l'exercici + el resultat d'aquesta crida és la crida a cosole.log amb el missatge que es valida en aquest test. Solució: valido que console.log hagi estat cridat amb el missatge.
    const missatge = `Tasca 1.3 nivell 2 exercici 3: The salary of the employee "Linux Torvalds" is $4000`;
    expect(console.log).toHaveBeenCalledWith(missatge);
})


// NIVELL 2

// 2.1

test(`Persona's function mocks`, () => {

    /*
    FONTS:
    - https://jestjs.io/docs/mock-functions
    - https://stackoverflow.com/a/6529410
    - https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c
     */

    // Només es pot susbtituïr el constructor d'una classeamb el d'una altra classe + necessito poder crear un objecte de la classe Persona per cridar dirNom == cal que nou constructor sigui funcional. La solució per la que he optat ha estat estendre la classe per incorporar la funció mock a la crida del nou constructor.

    class MockedPersona extends Persona {
        static mockedConstructor = jest.fn();
        constructor() {
            super();
            MockedPersona.mockedConstructor();
            super.dirNom = jest.fn();
        }
    }

    const mockedPersona1 = new MockedPersona();
    mockedPersona1.dirNom();
    mockedPersona1.dirNom();

    const mockedPersona2 = new MockedPersona();
    mockedPersona2.dirNom();

    expect(MockedPersona.mockedConstructor.mock.calls.length).toBe(2);
    expect(mockedPersona1.dirNom.mock.calls.length).toBe(2);
    expect(mockedPersona2.dirNom.mock.calls.length).toBe(1);

})

// 2.2
test(`creaVehicle`, () => {

    // Per funcions que s'espera que llencin error cal incloure-les dins d'un callback perquè jest les pugui caçar
    // FONT: https://medium.com/@afolabiwaheed/how-to-test-a-function-thats-expected-to-throw-error-in-jest-2419cc7c6462
    expect(() => {
        typeof creaVehicle("Vehicle")
    }).toThrow(`La classe "Vehicle" és abstracta i no es pot instanciar`);

    // FONT: https://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class
    expect(creaVehicle("Cotxe").constructor.name).toBe(`Cotxe`);
    expect(creaVehicle("Bicicleta").constructor.name).toBe(`Bicicleta`);
    expect(creaVehicle("Ciclomotor").constructor.name).toBe(`Ciclomotor`);

    expect(() => {
        typeof creaVehicle("Tricicle")
    }).toThrow(`El vehicle "Tricicle" no existeix`);
})


// NIVELL 3

//3.1

test(`employeesAndSalariesFromMockedJSON`, async () => {
    const id = 1;
    const employee = (await src4.getEmployee(id));
    expect(employee.name).toBe('Linux Torvalds');
    const salary = (await src4.getSalary(employee));
    expect(salary).toBe(4000);
});

//3.2


test(`Errors tasca 1.4`, async () => {

    // Diferents opcions d'estil
    // Opció 1:
    expect.assertions(3);
    await src4.getEmployee(4).catch(e => {
        expect(e.message).toEqual(`Employee with id == 4 doesn't exist`);
    })
    // Opció 2:
    await expect(src4.getSalary(null)).rejects.toEqual(new TypeError(`Cannot read property 'id' of null`));
    const employee = src4.getEmployee(1);
    employee.id = 4;
    await expect(src4.getSalary(employee)).rejects.toEqual(new Error(`Salary with id == 4 doesn't exist`));

    // També es podria fer amb DoneCallback com he fet amb el test del timer, però llavors caldria una sola asserció perquè done() acaba el test.

    // Nivell 2 no llença errors, no se quins li podria posar (?)
})
// TASCA 6 NIVELL 3

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

const {getEmployee, getSalary, wait2SecondsAndPrint} = require('../app/1.4.Async&Await');


// TASCA 6 NIVELL 1

describe(`Async / await - Nivell 1 Exercici 1`, () => {
    test(`getEmployee`, async () => {
        const id = 1;
        const employee = (await getEmployee(id)).name;
        expect(employee).toBe('Linux Torvalds');
    })

    test(`getSalary`, async () => {
        const id = 1;
        const employee = await getEmployee(id);
        const salary = (await getSalary(employee));
        expect(salary).toBe(4000);
    })

});

describe(`Async / await - Nivell 2 Exercici 1`, () => {

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

        wait2SecondsAndPrint().then(
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
        /* Opcions per avançar timer: */
        jest.runAllTimers();
        //jest.advanceTimersByTime(2000);
        //jest.runOnlyPendingTimers();

        // M'asseguro que codi async sigui executat, si no s'executa només s'hauran executat les 2 assercions anteriors i la següent línia fallarà el test
        expect.assertions(3);
    });
});


// TASCA 6 NIVELL 3

describe (`Async / Await - Nivell 1 amb Mock de JSON`, () => {
    test(`employeesAndSalariesFromMockedJSON`, async () => {
        const id = 1;
        const employee = (await getEmployee(id));
        expect(employee.name).toBe('Linux Torvalds');
        const salary = (await getSalary(employee));
        expect(salary).toBe(4000);
    });
})


describe(`Async / Await - Nivells 2 i 3: Errors de funcionament`, () => {

    test(`getEmployeeErrors`, async () => {
        const id = 5;
        try {
            const employee = (await getEmployee(id)).name;
        } catch (e) {
            expect(e.message).toBe(
                `Employee with id == ${id} doesn't exist`);
        }
        expect.assertions(1);
    })


    test(`getSalaryErrors`, async () => {

        async function expectError(employee, errorMessage){
            try{
                const salary = (await getSalary(employee));
            } catch (e) {
                expect(e.message).toBe(errorMessage);
            }
        }

        async function expectEmployeeError(employee) {
            await expectError(employee, "You must pass a valid employee to the function getSalary(employee)");
        }

        await expectEmployeeError(null);
        await expectEmployeeError({"someProperty": 123});
        await expectEmployeeError({ "id": "1" });
        await expectError({ "id": 5 },
            `Salary with id == 5 doesn't exist`
        );

        expect.assertions(4);
    })

    // ALTRES ESTILS D'IMPLEMENTACIÓ:
    // // 1) FENT SERVIR PROMISE CATCH
    // expect.assertions(1);
    // await getEmployee(4).catch(e => {
    //     expect(e.message).toEqual(`Employee with id == 4 doesn't exist`);
    // })

    // // 2) FENT SERVIR MÈTODE REJECTS DE JEST:
    // expect.assertions(2);
    // await expect(getSalary(null)).rejects.toEqual(new Error(`You must pass a valid employee to the function getSalary(employee)`));
    // const employee = getEmployee(1);
    // employee.id = 4;
    // await expect(getSalary(employee)).rejects.toEqual(new Error(`Salary with id == 4 doesn't exist`));

    // // 3) FENT SERVIR DONECALLBACK COM HE FET AMB EL TEST DEL TIMER, però llavors caldria una sola asserció perquè done() acaba el test.

    // DUBTE: Nivell 2 no llença errors, no se quins li podria posar (?)
});
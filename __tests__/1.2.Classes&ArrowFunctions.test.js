
// TASCA 6 NIVELL 2

const {Persona, creaVehicle} = require('../app/1.2.Classes&ArrowFunctions');

describe(`Mock - Classes & Arrow Functions - Nivell 2 Exercici 2`, () => {
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
})


describe(`Classes & Arrow Functions Nivell 3 - Exercici 1`, () => {
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
})
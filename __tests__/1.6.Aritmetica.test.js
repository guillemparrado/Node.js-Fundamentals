
// TASCA 1.6 NIVELL 1
const {sumar, restar, multiplicar, dividir} = require('../app/1.6.Aritmetica');

describe(`Aritmètica`, () => {
    test(`Suma 1 + 2 i retorna 3`, () => {
        expect(sumar(1,2)).toBe(3);
    })

    test(`Resta 1 - 2 i retorna -1`, () => {
        expect(restar(1,2)).toBe(-1);
    })

    test(`Multiplica 1 * 2 i retorna 2`, () => {
        expect(multiplicar(1,2)).toBe(2);
    })

    test(`Divideix 1 +/ 2 i retorna 0.5`, () => {
        expect(dividir(1,2)).toBe(0.5);
    })
})

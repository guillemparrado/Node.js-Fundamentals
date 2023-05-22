
// TASCA 6 NIVELL 1

describe(`Promises & Callbacks - Nivell 2 Exercici 3`, () => {
    test(`getEmployeeAndSalary`, async () => {
        // La resolució a 1.3.Promises&Callbacks és una invocació i no una funció: no puc cridar la resolució com si fos una funció dins del test per executar el codi + en fer el require s'executa l'arxiu sencer i amb ell la resolució de l'exercici + el resultat d'aquesta crida és la crida a cosole.log amb el missatge que es valida en aquest test. Solució: valido que console.log hagi estat cridat amb el missatge.
        // Hi ha un problema fent-ho així, i és que l'execució de les crides és assíncrona i cal esperar a que acabin. Si poso el require i tot seguit l'expect, no li dona temps a log a haver estat cridat amb el missatge i el test falla. Si el poso abans d'iniciar el describe sí que li dona temps però no sembla que sigui una bona pràctica, si alguna promesa tardés més el test no passaria, si estigués al límit a vegades passaria i a vegades no.
        // Per això, ho he solucionat incloent un timer dins d'una promesa, esperant que acabi i llavors cridant l'expect. He trobat que 100 ms d'espera són suficients, de fet, posant 0ms al timer ja funciona, suposo que només necessitava l'overhead de la promesa i del timer funcionar. Deixo 100ms de marge igualment per donar prou temps i assegurar que el test no falli quan pel que sigui tardi una mica més en acabar.
        const missatge = `Tasca 1.3 nivell 2 exercici 3: The salary of the employee "Linux Torvalds" is $4000`;
        jest.spyOn(console, 'log');
        require('../app/1.3.Promises&Callbacks');

        await new Promise((resolve) => {
            setTimeout(() => {resolve()}, 100);
        });

        expect(console.log).toHaveBeenLastCalledWith(missatge);
    })
})
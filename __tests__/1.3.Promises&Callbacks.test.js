
// TASCA 6 NIVELL 1

describe(`Promises & Callbacks Nivell 2 - Exercici 3`, () => {
    test(`getEmployeeAndSalary`, async () => {
        // La resolució a 1.3.Promises&Callbacks és una invocació i no una funció: no puc cridar la resolució com si fos una funció dins del test per executar el codi + en fer el require s'executa l'arxiu sencer i amb ell la resolució de l'exercici + el resultat d'aquesta crida és la crida a cosole.log amb el missatge que es valida en aquest test. Solució: valido que console.log hagi estat cridat amb el missatge.
        const missatge = `Tasca 1.3 nivell 2 exercici 3: The salary of the employee "Linux Torvalds" is $4000`;
        require('../app/1.3.Promises&Callbacks');
        expect(console.log).toHaveBeenCalledWith(missatge);
    })
})
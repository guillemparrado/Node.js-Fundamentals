
// NIVELL 1
/**
 * Crea una funció que mostri per consola el nom d'usuari/ària en invocar-la passant-li el nom com a paràmetre
 */
function mostraNomUsuari(nom){
    console.log(`El nom de l'usuari és: ${nom}`);
}

mostraNomUsuari("Guillem")

// NIVELL 2.1
/**
 * Mostra per consola el nom i cognoms de l'usuari/ària mitjançant template literals, guardant-los en variables i referenciant-les en la impressió del missatge.
 */

function mostraNomICognomsUsuari(nom, cognoms){
    let missatge = `El nom de l'usuari és: ${nom} i els seus cognoms són: ${cognoms}`;
    console.log(missatge);
}

mostraNomICognomsUsuari("Guillem", "Parrado D.")


// NIVELL 2.2
/**
 * Invoca una funció que retorni un valor des de dins d'una template literal.
 */

let date = new Date();
console.log(`Aquest script s'ha executat el dia ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} a les ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);


// NIVELL 3.1
/**
 * Crea una matriu de deu funcions i emplena-la mitjançant un bucle de manera que cada funció compti del 0 al 9 per la consola. Invoca cada funció de l'array iterativament. Haurà de mostrar-se per consola el compte del 0 al 9 deu vegades.
 */

let a = [];
for (let i = 0; i < 10; i++) {
    a[i] = () => {
        for (let j = 0; j < 10; j++) {
            console.log(j);
        }
    }
}

for (const func of a) {
    func();
}

// NIVELL 3.2
/**
 * Crea una funció anònima autoinvocable igualada a una variable que mostri per consola el nom de l'usuari/ària a rebut com a paràmetre.
 */

let resultatExecucio = (nom => {
    let missatge = `El nom de l'usuari és: ${nom}`;
    console.log(missatge);
})("Guillem")  // El resultat de l'execució és "Undefined" perquè el retorn és void (!)


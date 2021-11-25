
// NIVELL 1
function mostraNomUsuari(nom){
    console.log(`El nom de l'usuari és: ${nom}`);
}

mostraNomUsuari("Guillem")

// NIVELL 2.1

function mostraNomICognomsUsuari(nom, cognoms){
    let missatge = `El nom de l'usuari és: ${nom} i els seus cognoms són: ${cognoms}`;
    console.log(missatge);
}

mostraNomICognomsUsuari("Guillem", "Parrado D.")


// NIVELL 2.2

let date = new Date();
console.log(`Aquest script s'ha executat el dia ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} a les ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);


// NIVELL 3.1

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
 * El resultat de l'execució és "Undefined" perquè el retorn és void (!)
 */
let resultatExecucio = (nom => {
    let missatge = `El nom de l'usuari és: ${nom}`;
    console.log(missatge);
})("Guillem")


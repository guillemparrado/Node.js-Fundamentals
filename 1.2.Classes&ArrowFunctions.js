
// NIVELL 1
const num1 = 5, num2 = 7;
console.log(
    ((num1, num2) => num1 + num2)(num1, num2)
)

// NIVELL 2.1
const mentor = "Omar";

const func = (mentor => {return {mentor}})

console.log(func(mentor))

// NIVELL 2.2

class Persona {
    constructor(nom) {
        this.nom = nom;
    }

    get nom(){
        return this._nom;
    }

    set nom(nom){
        this._nom = nom;
    }

    dirNom(){
        console.log(this.nom);
    }
}

const p = new Persona("Guillem");
p.dirNom()


// NIVELL 3
// Fonts: https://stackoverflow.com/a/30560792, https://stackoverflow.com/a/21220964

/**
 * @abstract
 */

function creaVehicle(tipus) {
    class Vehicle{
        constructor() {
            if(new.target === Vehicle){
                throw new TypeError(`La classe "Vehicle" és abstracta i no es pot instanciar`);
            }
        }
    }
    class Cotxe extends Vehicle {}
    class Bicicleta extends Vehicle{}
    class Ciclomotor extends Vehicle{}

    switch(tipus){
        case "Vehicle":     return new Vehicle();
        case "Cotxe":       return new Cotxe();
        case "Bicicleta":   return new Bicicleta();
        case "Ciclomotor":  return new Ciclomotor();
        default:            throw new TypeError(`El vehicle "${tipus}" no existeix`);
    }
}

const vehicles = Object.freeze(["Vehicle", "Cotxe", "Bicicleta", "Ciclomotor", "Tricicle"]);

for (const vehicle of vehicles) {
    try {
        console.log(creaVehicle(vehicle));
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
}

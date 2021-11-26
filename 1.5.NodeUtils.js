
//NIVELL 1.1

const spam = message => {
    setTimeout(
        () => {
            console.log(message);
            spam(message);
        },
        1000
    )
}

spam("Hola!");

//NIVELL 1.2

const fs = require('fs');

const writeToFile = (message, filename, encoding = 'utf8') => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, message, encoding, err => {
            if(err){
                reject(err);
            }
            resolve(`Message written to file ${filename}: "${message}"`);
        })
    });
}

const message = "Hello from Node!";
filename = './fileTest.txt';
writeToFile(message, filename).then(res => console.log(res));


//NIVELL 1.3

const readFromFile = (filename, encoding = 'utf8') => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, encoding, (error, data) => {
            if(error){
                reject(error);
            }
            resolve(data);
        })
    });
}
async function readFromFileAndPrint(filename) {
    try {
        const text = await readFromFile(filename);
        console.log(`Read from file ${filename}: "${text}"`);
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
}

filename = './fileTest.txt'; // No ha de donar error
readFromFileAndPrint(filename);


//NIVELL 2.1

const compress = filename => {
    const { createGzip } = require('zlib');
    const { pipeline } = require('stream');
    const {
        createReadStream,
        createWriteStream
    } = require('fs');

    const gzip = createGzip();
    const source = createReadStream(filename);
    const destination = createWriteStream(`${filename}.gz`);

    pipeline(source, gzip, destination, (err) => {
        if (err) {
            console.error('An error occurred:', err);
        }
    });
}

// Nota: el fitxer comprimit pesa més que l'original perquè l'original només pesa 16 bytes. He provat a silenciar el write i enganxar 10 paràgrafs de lorem ipsum al fitxer (https://loremipsum.io/generator/?n=10&t=p) i en comprimir passa de 8 a 3 kB.
compress(filename);


//NIVELL 2.2

const printUserHomeContents = () => {
    const cp = require('child_process');
    cp.exec('dir', {
        cwd: `C:\\Users\\guillem`
    }, function(err, stdout, stderr) {
        if(err) {
            console.log(`Error : ${err.message}`);
        } else if(stderr) {
            console.log(`Error : ${stderr}`);
        } else { // stdout només m'interessa si dir treu stderr, es podria treure els dos si calgués
            console.log(stdout);
        }
    });
}

printUserHomeContents();

//NIVELL 3

/*
    FONTS:
    https://nodejs.org/dist/latest-v16.x/docs/api/crypto.html
    https://nodejs.org/dist/latest-v16.x/docs/api/buffer.html
    https://nodeblogger.com/aes-encryption-decryption-in-node-js/
 */

// PRIMERA PART: L'exercici té moltes parts: file, async, compress (buffers), crypto amb AES (cal generar clau, cal passar IV d'alguna manera per desencriptar, etc.). Després de molt spaguetti he acabat fent demo amb part de compress / encrypt / decrypt / decompress, tot en memòria per depurar aquesta part primer. El mètode depurat s'inclou a la següent demo:

demo();

function demo() {
    const crypto = require('crypto');
    const algorithm = 'aes-192-cbc';
    const key = `7x!A%D*G-JaNdRgUkXp2s5v8`; // Les claus de 192 son de 24 caràcters, les de 256 de 32.
    const iv = crypto.randomBytes(16);

    const encodings = Object.freeze(['hex', 'base64']);
    for (const encoding of encodings) {
        let data = {};
        data.text = "Hello from Node!";
        data.encoding = encoding;
        data.compressed = Buffer.from(data.text).toString(encoding);
        data.encrypted = encryptText(data.compressed);
        data.decrypted = decryptText(data.encrypted, encoding);
        data.uncompressed = Buffer.from(data.decrypted,encoding).toString();
        console.log(`Demo Nivell 3, Data:`);
        console.log(data);
    }

    function encryptText(data) {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        return {
            iv: iv,
            content: encrypted
        };
    }

    function decryptText(text, encoding) {
        try {
            const decipher = crypto.createDecipheriv(algorithm, key, text.iv);
            const decrpyted = Buffer.concat([decipher.update(text.content, encoding), decipher.final()]);
            return decrpyted.toString();
        } catch (error) {
            throw error;
        }
    }
}



// SEGONA PART: Incorporo la funcionalitat de fitxers i d'async/await i resolc els punts de l'enunciat

const crypto = require('crypto');
exercicis();

async function exercicis(){

    // Comú a tots els exercicis + un sol punt de modificació (per si se'n volen posar més o treure'n)
    const encodings = Object.freeze(['hex', 'base64']);
    // Recupero el filename dels exercicis anteriors, però si cal es pot canviar:
    // const filename = ;
    const password = "password_fgno34p3423pnf";  // A personalitzar per l'usuari

    // Faig servir awaits: cal que un exercici acabi perquè els arxius s'hagin acabat d'escriure i estiguin disponibles abans que comenci el següent
    await ex1(filename, encodings);
    const iv = await ex2(filename, encodings, password); // Cal l'iv per desencriptar: cal guardar-lo en algun lloc a més del password. Diria que és com el seed d'un random generator, caldria guardar-lo amb el password o potser en el mateix file amb el text encriptat (per exemple a la demo, encryptText retorna un objecte amb el resultat i l'IV, potser es podria guardar tot l'objecte en comptes de només el text encriptat). De moment el passo entre crides, es podria millorar guardant-lo on calgui un cop se sàpiga què s'ha de fer exactament amb ell.
    await ex3(filename, encodings, password, iv);
}

// EXERCICI 3.1: Crea una funció que creï dos fitxers codificats en hexadecimal i en base64 respectivament, a partir del fitxer del nivell 1

async function ex1(filename, encodings) {
    for (const encoding of encodings) {
        const data = (await readFromFile(filename)).toString();
        const compressed = Buffer.from(data).toString(encoding);
        await writeToFile(compressed, `${filename}.${encoding}`);
    }
}

// EXERCICI 3.2: Crea una funció que guardi els fitxers del punt anterior, ara encriptats amb l'algorisme aes-192-cbc, i esborri els fitxers inicials

async function ex2(filename, encodings, password, algorithm = 'aes-192-cbc') {
    const crypto = require('crypto');
    // Cal fer una clau a partir del password. Les claus de 192 son de 24 caràcters, les de 256 son de 32
    const key = crypto.scryptSync(password, 'salt', 24);
    // Cal fer un IV
    const iv = crypto.randomBytes(16);

    for (const encoding of encodings) {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        const data = (await readFromFile(`${filename}.${encoding}`)).toString();
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        await writeToFile(encrypted, `${filename}.${encoding}.${algorithm}`, encoding);
        // Elimina file original
        fs.unlinkSync(`${filename}.${encoding}`);
    }

    return iv;
}

// EXERCICI 3.3: Crea una altra funció que desencripti i descodifiqui els fitxers de l'apartat anterior tornant a generar una còpia de l'inicial

async function ex3(filename, encodings, password, iv, algorithm = 'aes-192-cbc') {
    const key = crypto.scryptSync(password, 'salt', 24);  // Les claus de 192 son de 24 caràcters, les de 256 son de 32
    for (const encoding of encodings) {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        const data = (await readFromFile(`${filename}.${encoding}.${algorithm}`, encoding)).toString();
        const decrypted = Buffer.concat([decipher.update(data, encoding), decipher.final()]).toString();
        const uncompressed = Buffer.from(decrypted,encoding).toString();
        await writeToFile(uncompressed, `${filename}.${encoding}.uncompressed`);
    }
}

// EXERCICI 3.4: Inclou un README amb instruccions per a l'execució de cada part


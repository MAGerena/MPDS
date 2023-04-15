const {Console} = require("console-mpds");
const console = new Console();

const number = console.readNumber("Escribe un num");
console.writeln("El numero que has escrito es " + number);
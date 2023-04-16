const { Console } = require("console-mpds");
const console = new Console();

const secretCode = getSecretCode();
proposeCode(secretCode);

function getSecretCode() {
    let secretCode
    console.writeln("Please, insert the secret code");
    do {
        secretCode = getCode();
    } while (!validateCode(secretCode));

    return secretCode;
}

function getCode() {
    let code;
    do {
        code = console.readString();
    } while (!validateCode(code));

    return code;
}

function validateCode(code) {
    const MAX_LENGTH = 4;
    const VALID_COLORS = ['R', 'G', 'B', 'Y', 'C', 'M'];
    let isValid = false;

    if (code.length != MAX_LENGTH) {
        console.writeln("El código no tiene la longitud adecuada, por favor, introduzca otro.");
        isValid = false;
    } else {
        isValid = true;
    }

    return isValid;
}

function proposeCode(secretCode) {
    let result = false;
    const MAX_ATTEMPTS = 10;
    let attempts = [];
    let blacksAndWhites = [];
    do {
        attempts[attempts.length] = getCode();
        blacksAndWhites[blacksAndWhites.length] = getBlacksAndWhites(secretCode, attempts[attempts.length - 1]);
        if (compareCodes(secretCode, attempts[attempts.length - 1])) {
            result = true;
        }

        showBoard(attempts, blacksAndWhites);
    } while (!result && attempts.length < MAX_ATTEMPTS);
}

function compareCodes(secretCode, proposedCode) {
    let result;
    if (secretCode === proposedCode) {
        result = true;
    } else {
        console.writeln("Vuelve a intentarlo");
        result = false;
    }

    return result;
}

function getBlacksAndWhites(secretCode, proposedCode) {
    let blacks = 0;
    let whites = 0;
    for (let i = 0; i < secretCode.length; i++) {
        if (secretCode[i] === proposedCode[i]) {
            blacks++;
        } else {
            whites++;
        }
    }

    return [blacks, whites];
}

function showBoard(attempts, blacksAndWhites) {
    console.writeln(`\n${attempts.length} +  attempt(s): \n`);
    for (let i = 0; i < attempts.length; i++) {
        console.writeln(`${attempts[i]}  --> ${blacksAndWhites[i][0]} blacks and ${blacksAndWhites[i][1]} whites`);
    }

    if (blacksAndWhites[0][0] == 4) {
        console.writeln("Has ganado!");
    }
}
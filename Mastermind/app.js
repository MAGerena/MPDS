const { Console } = require("console-mpds");
const console = new Console();

const secretCombination = getSecretCombination();
proposeCombination(secretCombination);

function getSecretCombination() {
    let secretCombination
    console.writeln("Please, insert the secret Combination");
    do {
        secretCombination = getCombination();
    } while (!validateCombination(secretCombination));

    return secretCombination;
}

function getCombination() {
    let Combination;
    do {
        Combination = console.readString();
    } while (!validateCombination(Combination));

    return Combination;
}

function validateCombination(Combination) {
    const MAX_LENGTH = 4;
    const VALID_COLORS = ['R', 'G', 'B', 'Y', 'C', 'M'];
    let isValid = false;

    if (Combination.length != MAX_LENGTH) {
        // cuidado. esta funcion hace dos cosas.
        console.writeln("El código no tiene la longitud adecuada, por favor, introduzca otro.");
        isValid = false;
    } else {
        isValid = true;
    }

    return isValid;
}

function proposeCombination(secretCombination) {
    let result = false;
    const MAX_ATTEMPTS = 10;
    let attempts = [];
    let blacksAndWhites = [];
    do {
        attempts[attempts.length] = getCombination();
        blacksAndWhites[blacksAndWhites.length] = getBlacksAndWhites(secretCombination, attempts[attempts.length - 1]);
        if (compareCombinations(secretCombination, attempts[attempts.length - 1])) {
            result = true;
        }

        showBoard(attempts, blacksAndWhites);
    } while (!result && attempts.length < MAX_ATTEMPTS);
}

function compareCombinations(secretCombination, proposedCombination) {
    let result;
    if (secretCombination === proposedCombination) {
        result = true;
    } else {
        console.writeln("Vuelve a intentarlo");
        result = false;
    }

    return result;
}

function getBlacksAndWhites(secretCombination, proposedCombination) {
    let blacks = 0;
    let whites = 0;
    for (let i = 0; i < secretCombination.length; i++) {
        if (secretCombination[i] === proposedCombination[i]) {
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
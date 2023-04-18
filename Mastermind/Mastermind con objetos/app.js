const { Console } = require("console-mpds");
const console = new Console();

let repeat = askIfRepeat();
do {
    let game = initGame();
    game.play();
    repeat.ask();
} while (repeat);

function initGame() {
    let game = {
        MAX_LENGTH : 4,
        VALID_COLORS : ['R', 'G', 'B', 'Y', 'C', 'M'],
        isValid : false,
        result: false,
        MAX_ATTEMPTS: 10,
        attempts: [],
        blacksAndWhites: [],
        
        play : function () {
            let askCombination = GetValidCombination(game);
            secretCombination = askCombination.getSecretCombination();
        }
    }
    return game;
    function proposeCombination() {

        do {
            console.writeln("Introduzca una combinación");
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

}

function GetValidCombination(game) {

    combination = {
        getSecretCombination: function () {
            console.writeln("Please, insert the secret Combination");
            do {
                secretCombination = getCombination();
            } while (!validateCombination(secretCombination));
            return secretCombination;
        }
    }

    function getCombination() {
        let Combination;
        do {
            Combination = console.readString();
        } while (!validateCombination(Combination));
        return Combination;
    }

    function validateCombination(Combination) {

        if (Combination.length != game.MAX_LENGTH) {
            // cuidado. esta funcion hace dos cosas.
            console.writeln("El código no tiene la longitud adecuada, por favor, introduzca otro.");
            isValid = false;
        } else {
            isValid = true;
        }
        // Falta validar los demás requerimientos
        return isValid;
    }
    return combination;
}

function askIfRepeat() {

}
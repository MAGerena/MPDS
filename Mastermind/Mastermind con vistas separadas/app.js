const { Console } = require("console-mpds");
const console = new Console();

initMastermindView().play();

function initMastermindView() {
    return {
        play : function () {
            const repeat = askIfRepeat(`Quieres iniciar otra partida?`);
            do {
                initGameView().play();
                repeat.ask();
            } while (repeat.isAffirmative);
        }
    }
}

function initGameView() {
    const game = initGame();
    return {
        play: function () {
            let askCombination = GetValidCombination();
            game.secretCombination = askCombination.getSecretCombination();
            do {
                console.writeln("Introduzca una combinación");
                game.attempts[game.attempts.length] = askCombination.getCombination();
                game.blacksAndWhites[game.blacksAndWhites.length] = getBlacksAndWhites(game.secretCombination, game.attempts[game.attempts.length - 1]);
                if (compareCombinations(game.secretCombination, game.attempts[this.attempts.length - 1])) {
                    result = true;
                }
                showBoard(this.attempts, this.blacksAndWhites);
            } while (!game.result);
        }
    }
    
}

function initGame() {
    let VALID_COLORS = ['R', 'G', 'B', 'Y', 'C', 'M'];
    let result = false;
    let MAX_ATTEMPTS = 10;
    let attempts = [];
    let blacksAndWhites = [];
    let secretCombination;
    let MAX_LENGTH = 4;    
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

function GetValidCombination(game) {
    combination = {

        getSecretCombination: function () {
            console.writeln("Please, insert the secret Combination");
            do {
                secretCombination = this.getCombination();
            } while (!validateCombination(secretCombination));
            return secretCombination;
        },

        getCombination : function () {
            let Combination;
            do {
                Combination = console.readString();
            } while (!validateCombination(Combination));
            return Combination;
        }
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

function askIfRepeat(question) {
    return {
        question : question,
        answer : ``,
    
        ask : function() {
          let error = false;
          do {
            answer = console.readString(this.question);
            error = !this.isAffirmative() && !this.isNegative();
            if (error) {
              console.writeln(`Por favor, responda "si" o "no"`);
            }
          } while (error);
        },
    
        isAffirmative : function(){
          return answer === `si`;
        },
    
        isNegative : function(){
          return answer === `no`;
        }
}
}
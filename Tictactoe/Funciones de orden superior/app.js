const { Console } = require("console-mpds");
const console = new Console();

playTicTacToe();

function playTicTacToe() {
    do {
        const MAX_TOKENS = 3;
        let gameMode = askGameMode(MAX_TOKENS);
        playGame(gameMode, MAX_TOKENS);
    } while (isResumed());

    function askGameMode(MAX_TOKENS) {
        const gameModes = [[generateRandomPosition, generateRandomPosition],
        [askPosition, generateRandomPosition],
        [askPosition, askPosition]];
        let error = false;
        let numOfPlayers;
        do {
            numOfPlayers = console.readNumber("inserte el número de jugadores (0-2)");
            const MAX_PLAYERS = 2;
            error = numOfPlayers < 0 || numOfPlayers > MAX_PLAYERS;
            if (error) {
                console.writeln("El número de jugadores es incorrecto, el número máximo es: " + MAX_PLAYERS);
            }
        } while (error);
        return gameModes[numOfPlayers];

        function generateRandomPosition() {
            return parseInt(Math.random() * MAX_TOKENS + 1);
        }

        function askPosition(title) {
            let error = false;
            let position;
            do {
                position = console.readNumber(`${title}: `);
                error = position < 1 || position > 3;
            } while (error);
            return position;
        }
    }

    function playGame(gameMode, MAX_TOKENS) {
        const MAX_PLAYERS = 2;
        const TOKEN_EMPTY = ` `;
        let tokens = [
            [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
            [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
            [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY]
        ];
        let turn = 0;
        let winner;
        do {
            writelnTokens(tokens);
            placeToken(gameMode, tokens, turn);
            winner = isTicTacToe(tokens, turn);
            if (!winner) {
                turn = nextTurn(turn);
            }
        } while (!winner);
        writelnTokens(tokens);
        console.writeln(`Victoria para ${getToken(turn)}`);

        function placeToken(gameMode, tokens, turn) {
            console.writeln(`Turno para ${getToken(turn)}`);
            let error;
            let originRow;
            let originColumn;
            const movement = getNumTokens(tokens) === MAX_PLAYERS * MAX_TOKENS;
            if (movement) {
                do {
                    originRow = getPosition(`Fila origen`, gameMode, turn);
                    originColumn = getPosition(`Columna origen`, gameMode, turn);
                    error = !isOccupied(tokens, originRow, originColumn, turn);
                    if (error) {
                        console.writeln(`No hay una ficha de la propiedad de ${getToken(turn)}`);
                    }
                } while (error);
            }
            let targetRow;
            let targetColumn;
            do {
                targetRow = getPosition(`Fila origen`, gameMode, turn);
                targetColumn = getPosition(`Columna origen`, gameMode, turn);
                error = !isEmpty(tokens, targetRow, targetColumn);
                if (error) {
                    console.writeln(`Indique una celda vacía`);
                }
            } while (error);
            if (movement) {
                tokens[originRow][originColumn] = TOKEN_EMPTY;
            }
            tokens[targetRow][targetColumn] = getToken(turn);
        }

        function getNumTokens(tokens) {
            let empties = 0;
            for (let i = 0; i < tokens.length; i++) {
                for (let j = 0; j < tokens[i].length; j++) {
                    if (tokens[i][j] === TOKEN_EMPTY) {
                        empties++;
                    }
                }
            }
            return MAX_TOKENS ** 2 - empties;
        }

        function getPosition(title, gameMode, turn) {
            let position;
            let error = false;
            do {
                if (turn % 2 === 0) {
                    position = gameMode[0](title);                    
                } else {
                    position = gameMode[1](title);                    
                }
            } while (error);
            return position - 1;
        }

        function isEmpty(tokens, row, column) {
            return tokens[row][column] === TOKEN_EMPTY;
        }

        function getToken(turn) {
            const TOKEN_X = `X`;
            const TOKEN_Y = `Y`;
            return turn === 0 ? TOKEN_X : TOKEN_Y;
        }

        function writelnTokens(tokens) {
            const HORIZONTAL_SEPARTOR = `-------------`;
            const VERTICAL_SEPARATOR = `|`;
            let msg = ``;
            for (let i = 0; i < tokens.length; i++) {
                msg += `${HORIZONTAL_SEPARTOR}\n`;
                for (let j = 0; j < tokens[i].length; j++) {
                    msg += `${VERTICAL_SEPARATOR} ${tokens[i][j]} `;
                }
                msg += `${VERTICAL_SEPARATOR}\n`;
            }
            msg += HORIZONTAL_SEPARTOR;
            console.writeln(msg);
        }

        function nextTurn(turn) {
            return (turn + 1) % MAX_PLAYERS;
        }

        function isOccupied(tokens, row, column, turn) {
            return tokens[row][column] === getToken(turn);
        }

        function isTicTacToe(tokens, turn, ) {
            let countRows = [0, 0, 0];
            let countColumns = [0, 0, 0];
            let countDiagonal = 0;
            let countInverse = 0;
            for (let i = 0; i < tokens.length; i++) {
                for (let j = 0; j < tokens[i].length; j++) {
                    if (tokens[i][j] === getToken(turn)) {
                        countRows[i]++;
                        countColumns[j]++;
                        if (i - j === 0) {
                            countDiagonal++;
                        }
                        if (i + j === MAX_TOKENS - 1) {
                            countInverse++;
                        }
                    }
                }
            }
            if (countDiagonal === MAX_TOKENS || countInverse === MAX_TOKENS) {
                return true;
            }
            for (let i = 0; i < countRows.length; i++) {
                if (countRows[i] === MAX_TOKENS) {
                    return true;
                }
                if (countColumns[i] === MAX_TOKENS) {
                    return true;
                }
            }
            return false;
        }
    }

    function isResumed() {
        let result;
        let answer;
        let error = false;
        do {
            answer = console.readString(`¿Quieres jugar otra partida? `);
            result = answer === `si`;
            error = !result && answer !== `no`;
            if (error) {
                console.writeln(`Por favor, responda "si" o "no"`);
            }
        } while (error);
        return result;
    }
}
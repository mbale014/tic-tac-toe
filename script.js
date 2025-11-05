const gameBoard = (function () {
    const columns = 3;
    const rows = 3;
    let board = [];

    // Create 2d array using nested loops for game board representation
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Square());
        };
    };

    // This method to render our board state 
    const getBoard = () => board;

    // To mark a square, first we need to get the column and the row the player marked
    // Determine if the selected square empty, then set the square value with player marker
    const markSquare = (row, column, player) => {

        const selectedSquare = board[row][column];

        if (selectedSquare.getValue() !== null) return 'This square has been marked!';
        else return selectedSquare.addMarker(player);
    };
    
    // This to display board with square value. Currently used for console logging
    const printBoard  = () => {
        const boardWithSquareValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithSquareValues);
    };

    return {
        getBoard,
        markSquare,
        printBoard
    }
})();

// A square represents one square on the board and can have different value
// null : no marker in the square
// 'x' or 'o' players marker or players 2 marker
function Square() {
    let value = null;

    const addMarker = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addMarker,
        getValue
    };

};

// Player will get different name and marker 
function Player(name, marker) {
    const myName = () => name;
    const myMarker = () => marker;

    return {
        myName, 
        myMarker
    };
};

// displayController will be used for controlling the flow and the state of the game

const displayController = (
    function (playerOneName = "Player One", playerTwoName = 'Player Two') {
        
    const board = gameBoard;

    const playerOne = Player(playerOneName, 'X');
    const playerTwo = Player(playerTwoName, 'O');

    let activePlayer = playerOne;

    const switchTurn = () => {
        activePlayer = (activePlayer === playerOne) ? playerTwo : playerOne;
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().myName()}'s move`);
    };

    const playRound = (row, column) => {
        console.log(
            `${getActivePlayer().myName()}'s mark square on row: ${row} column ${column} `
        );
        board.markSquare(row, column, getActivePlayer().myMarker());
        
        // This where the logic for game winner check, such as win message //
        
        //Switch  player turn
        switchTurn();
        printNewRound();
        
        
    };

    printNewRound();

    // For playing on console
    return {
        playRound,
        getActivePlayer
    };
})();

const game = displayController;
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
        
        return selectedSquare.addMarker(player);
    };
    
    // This to display board with square value. Currently used for console logging
    const printBoard  = () => {
        const boardWithSquareValues = board.map((row) => row.map((cell) => cell.getValue()));
        return boardWithSquareValues;
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
        console.log(board.printBoard());
        console.log(`${getActivePlayer().myName()}'s move`);
    };

    // This to track the round that had been played by both players
    // This will be to determinate if the round number has passed a certain number, a winning check will be made
    let roundCount = 0;

    // this is used for console only to get the round count
    const getRoundCount = () => roundCount;
    
    const playRound = (row, column) => {
        console.log(
            `${getActivePlayer().myName()}'s mark square on row: ${row} column ${column} `
        );
        const msg = board.markSquare(row, column, getActivePlayer().myMarker());
        // Prevent marking on an already marked square, if so, prompt message and return nothing
        if (msg === 'This square has been marked!') {
            console.log('This square has been marked!');
            printNewRound();
            return;
        };
        
        // This where the logic for game winner check, such as win message //
        if (roundCount >= 5) {
            console.log(`Round ${roundCount}`);
        };

        //Switch  player turn
        roundCount++;
        switchTurn();
        printNewRound();

    };

    printNewRound();

    // For playing on console
    return {
        getRoundCount,
        playRound,
        getActivePlayer
    };
})();

const game = displayController;
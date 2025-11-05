const gameBoard = (function () {
    const columns = 3;
    const rows = 3;
    let board = [];

    // Create 2d array using nested loops for game board representation
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Square());
    }
  }
    // This method to render our board state 
    const getBoard = () => board;

    // To mark a square, first we need to get the column and the row the player marked
    // Determine if the selected square empty, then set the square value with player marker
    const markSquare = (row, column, player) => {

        const selectedSquare = board[row][column];

        if (selectedSquare.getValue() !== null) return 'This square has been marked!';
        else selectedSquare.addMarker(player);
        
    };

    return {getBoard, markSquare}
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
}

// displayController will be used for controlling the flow and the state of the game

const displayController = (function(playerOneName = "Player One", playerTwoName = 'Player Two') {
    const board = gameBoard;

    const playerOne = Player(playerOneName, 'X');
    const playerTwo = Player(playerTwoName, 'O');

    let activePlayer = playerOne;

    const switchTurn = () => {
        activePlayer = (playerOne) ? playerTwo : playerTwo;
    }

    const getActivePlayer = () => activePlayer;

    return {switchTurn,  getActivePlayer}
})();
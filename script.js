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
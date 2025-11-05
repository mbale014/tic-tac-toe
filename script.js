function gameBoard() {
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

    return {getBoard, }
};



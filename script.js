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
        console.dir(board.printBoard());
        console.log(`${getActivePlayer().myName()}'s move`);
    };

    // This to track the round that had been played by both players
    // This will be to determinate if the round number has passed a certain number, a winning check will be made
    let roundCount = 0;

    // this is used for console only to get the round count
    const getRoundCount = () => roundCount;

    // To chech winning conditions, first we need to get the state of the board
    // There will 8 possibilities to win, by creating array index 
    // Getting the game board flatten and check from the array index there are equality between index 
    const winningCheck = () => {
        const winningCombo = [
        [0,1,2], [3,4,5], [6,7,8], //rows combo                    
        [0,3,6], [1,4,7], [2,5,8], //columns combo
        [0,4,8], [2,4,6]           //Diagonal combo
        ];

        const flatBoard = board.printBoard().flat();
        console.log(flatBoard);

        for (const combo of winningCombo) {
            const [a,b,c] = combo;

            //Check if index a on flatten array is not null
            //the rest are to check equality between marker 'a' and marker 'b' and 'c'
            if (flatBoard[a] && (flatBoard[a] === flatBoard[c]) && (flatBoard[a] === flatBoard[b])) {
                const winnerPlayer = flatBoard[a];

                if (winnerPlayer === playerOne.myMarker()) {
                    return `${playerOne.myName()}'s Wins!`;
                } else {
                    return `${playerTwo.myName()}'s Wins!`;
                };
            };
        };
        return; //No winner outcome, undefined return
    };
    
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
        if (roundCount >= 4) {
            const winMessage = winningCheck();
            console.log(`Round ${roundCount}`);
            // this is to check ties condition
            // A game on round >= 8 and winningCheck return no winner, this means ties and games over
            if (roundCount >= 8 && winMessage === undefined) {
                return 'Draw!';
            };

            if (winMessage !== undefined)  {
                return winMessage;
            }
        };

        //Switch  player turn
        roundCount++;
        switchTurn();
        printNewRound();

    };

    printNewRound();

    // For playing on console
    return {
        winningCheck,
        getRoundCount,
        playRound,
        getActivePlayer
    };
})();

const game = displayController;
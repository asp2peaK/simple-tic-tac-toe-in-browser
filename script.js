let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

function makeMove(index) {
    if (!gameOver && board[index] === '') {
        board[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById('message').innerText = `Player ${board[a]} wins!`;
            gameOver = true;
            return;
        }
    }

    if (!board.includes('')) {
        document.getElementById('message').innerText = "It's a draw!";
        gameOver = true;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    document.getElementById('message').innerText = '';
    for (let cell of document.getElementsByClassName('cell')) {
        cell.innerText = '';
    }
}

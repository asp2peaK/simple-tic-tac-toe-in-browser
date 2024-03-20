let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '';
let player1Name = '';
let player2Name = '';
let botDifficulty = '';
let gameOver = false;

function startGame(mode) {
    if (mode === 'bot') {
        document.getElementById('playerSelect').style.display = 'none';
        document.getElementById('botDifficulty').style.display = 'block';
    } else if (mode === 'easy' || mode === 'hard') {
        currentPlayer = 'X';
        botDifficulty = mode;
        document.getElementById('botDifficulty').style.display = 'none';
        document.getElementById('boardContainer').style.display = 'block';
        document.getElementById('message').style.display = 'block';
        document.getElementById('resetBtn').style.display = 'inline-block';
        document.getElementById('message').innerText = `${player1Name}'s turn`;
    } else if (mode === 'player') {
        document.getElementById('playerSelect').style.display = 'none';
        document.getElementById('playerNames').style.display = 'block';
    } else if (mode === 'start') {
        player1Name = document.getElementById('player1Name').value || 'Player 1';
        player2Name = document.getElementById('player2Name').value || 'Player 2';
        currentPlayer = 'X';
        document.getElementById('playerNames').style.display = 'none';
        document.getElementById('boardContainer').style.display = 'block';
        document.getElementById('message').style.display = 'block';
        document.getElementById('resetBtn').style.display = 'inline-block';
        document.getElementById('message').innerText = `${player1Name}'s turn`;
    }
}

function playWithBot() {
    alert("This mode is not available. Play with a friend instead.");
    return false;
}

document.addEventListener("DOMContentLoaded", function() {
    const botBtn = document.getElementById('botBtn');
    botBtn.addEventListener('click', playWithBot);
});

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = '';
    player1Name = '';
    player2Name = '';
    botDifficulty = '';
    gameOver = false;

    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.innerText = '';
        cell.style.backgroundColor = '#fff';
        cell.classList.remove('disabled');
    }

    document.getElementById('boardContainer').style.display = 'none';
    document.getElementById('playerSelect').style.display = 'block';
    document.getElementById('botDifficulty').style.display = 'none';
    document.getElementById('playerNames').style.display = 'none';
    document.getElementById('message').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'none';
}

function makeMove(index) {
    if (gameOver || board[index] !== '') return;

    board[index] = currentPlayer;
    document.getElementById(`cell${index}`).innerText = currentPlayer;

    
    if (checkWin(currentPlayer)) {
        document.getElementById('message').innerText = `${currentPlayer === 'X' ? player1Name : player2Name} wins!`;
        gameOver = true;
    } else if (isBoardFull()) {
        document.getElementById('message').innerText = `It's a draw!`;
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('message').innerText = `${currentPlayer === 'X' ? player1Name : player2Name}'s turn`;
    }
}


function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        if (board[pattern[0]] === player && board[pattern[1]] === player && board[pattern[2]] === player) {
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    return board.every(cell => cell !== '');
}

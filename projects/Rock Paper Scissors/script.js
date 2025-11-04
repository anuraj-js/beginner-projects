const rockBtn = document.querySelector('.rock-btn');
const paperBtn = document.querySelector('.paper-btn');
const scissorsBtn = document.querySelector('.scissors-btn');
const resultDisplay = document.querySelector('.result-display');
const movesDisplay = document.querySelector('.moves-display');
const scoreDisplay = document.querySelector('.score-display');
const scoreResetBtn = document.querySelector('.score-reset-btn');
const score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        loses: 0,
        ties: 0
    };

function computerMoveFun() {
    /*
    let computerMove = '';
    const randomNumber = Math.ceil(Math.random() * 3);

    if (randomNumber === 1) {
        return computerMove = 'rock';
    } else if (randomNumber === 2) {
        return computerMove = 'paper';
    } else {
        return computerMove = 'scissors';
    }
    */
      
    const possibleComputerMoves = ['rock', 'paper', 'scissors'];
    const computerMove = possibleComputerMoves[Math.floor(Math.random() * possibleComputerMoves.length)];
    return computerMove;
    
}

function scoreDisplayFun() {
    scoreDisplay.textContent = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
}

function updateLocalStorage() {
    localStorage.setItem('score', JSON.stringify(score));
}

function playGame(playerMove) {
    const computerMove = computerMoveFun();
    let result = '';

    if (playerMove === computerMove) {
        result = 'Tie';
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        result = 'Win';
    } else {
        result = 'Lost';
    } 

    if (result === 'Win') {
        score.wins++;
    } else if (result === 'Lost') {
        score.loses++;
    } else {
        score.ties++;
    } 

    updateLocalStorage();

    resultDisplay.textContent = `Result: ${result}`;
    movesDisplay.innerHTML = `<div class="player-move"><img src="images/${playerMove}-emoji.png" alt="${playerMove}-emoji">Your move</div> <div class="computer-move"><img src="images/${computerMove}-emoji.png" alt="${computerMove}-emoji">Computer move</div>`;
    scoreDisplayFun();
}

rockBtn.addEventListener('click', () => {
    playGame('rock');
});

paperBtn.addEventListener('click', () => {
    playGame('paper');
});

scissorsBtn.addEventListener('click', () => {
    playGame('scissors');
});

scoreResetBtn.addEventListener('click', () => {
    const check = confirm('Are you sure you want to reset the score?');
    if (!check) return;
    
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    resultDisplay.textContent = '';
    movesDisplay.innerHTML = '';
    updateLocalStorage();
    scoreDisplayFun();
})

scoreDisplayFun();




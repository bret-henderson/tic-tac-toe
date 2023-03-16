const gameboard = document.querySelector('.gameboard');
const gameboardSquares = document.querySelectorAll('.gameboard-square');
const winnerMessage = document.querySelector('.winner-message');
const boardHeader = document.querySelector('.board-header');
const playersContainer = document.querySelector('.players-container');
const loginForm = document.getElementById('player-name-form');
const names = document.querySelectorAll('.name');
const scores = document.querySelectorAll('.score');
const nextRound = document.querySelector('.next-round');
const playerInfos = document.querySelectorAll('.player-info');

const Player = (name) => {
  const getName = () => name;
  return { name, getName };
};

const Admin = (() => {
  let round = 0;
  let turnNumber = 0;
  let playerTurn = 'X';
  let playerOne = {};
  let playerTwo = {};

  const getRound = () => round;
  const getTurnNumber = () => turnNumber;
  const getPlayerTurn = () => playerTurn;
  const getPlayerOne = () => playerOne;
  const getPlayerTwo = () => playerTwo;
  const takeTurn = () => {
    turnNumber += 1;
    if (turnNumber % 2 === 0 && round % 2 === 0) {
      playerTurn = 'X';
      playerInfos[0].style.backgroundColor = 'lightGrey';
      playerInfos[1].style.backgroundColor = 'white';
    } else if (turnNumber % 2 === 1 && round % 2 === 0) {
      playerTurn = 'O';
      playerInfos[1].style.backgroundColor = 'lightGrey';
      playerInfos[0].style.backgroundColor = 'white';
    }
    if (turnNumber % 2 === 0 && round % 2 === 1) {
      playerTurn = 'O';
      playerInfos[1].style.backgroundColor = 'lightGrey';
      playerInfos[0].style.backgroundColor = 'white';
    } else if (turnNumber % 2 === 1 && round % 2 === 1) {
      playerTurn = 'X';
      playerInfos[0].style.backgroundColor = 'lightGrey';
      playerInfos[1].style.backgroundColor = 'white';
    }
  };

  const initializeScoreboard = () => {
    const playerOneInput = document.getElementById('player-one-name');
    playerOne = Player(playerOneInput.value);
    const playerTwoInput = document.getElementById('player-two-name');
    playerTwo = Player(playerTwoInput.value);
    names[0].textContent = `Player one: ${playerOne.getName()}`;
    names[1].textContent = `Player two: ${playerTwo.getName()}`;

    scores[0].textContent = 0;
    scores[1].textContent = 0;
    playerInfos[0].style.backgroundColor = 'lightGrey';
  };

  const updateScoreboard = (winner) => {
    if (winner === 'X')
      scores[0].textContent = Number(scores[0].textContent) + 1;
    if (winner === 'O')
      scores[1].textContent = Number(scores[1].textContent) + 1;
  };

  const resetGame = () => {
    turnNumber = 0;
    round += 1;
    if (round % 2 === 0) {
      playerTurn = 'X';
      playerInfos[0].style.backgroundColor = 'lightGrey';
      playerInfos[1].style.backgroundColor = 'white';
    } else {
      playerTurn = 'O';
      playerInfos[0].style.backgroundColor = 'white';
      playerInfos[1].style.backgroundColor = 'lightGrey';
    }
  };

  return {
    getRound,
    getTurnNumber,
    getPlayerTurn,
    takeTurn,
    initializeScoreboard,
    updateScoreboard,
    getPlayerOne,
    getPlayerTwo,
    resetGame,
  };
})();

const Gameboard = (() => {
  let lastClicked = 0;
  const gbArray = [];

  const isBlank = (e) => e.target.textContent === '';

  const getCoord = (e) => {
    for (let i = 0; i < gameboardSquares.length; i += 1) {
      if (e.target === e.target.parentElement.children[i]) lastClicked = i;
    }
    console.log(lastClicked);
    return lastClicked;
  };

  const updateGameboard = (loc, player) => {
    gameboardSquares[loc].textContent = player;
    gbArray[loc] = player;
  };

  const checkBoard = () => {
    // 0 1 2
    // 3 4 5
    // 6 7 8
    // 0 4 8
    // 2 4 6
    // 0 3 6
    // 1 4 7
    // 2 5 8
    if (gbArray[0] === 'X' && gbArray[1] === 'X' && gbArray[2] === 'X')
      return 'X';
    if (gbArray[0] === 'O' && gbArray[1] === 'O' && gbArray[2] === 'O')
      return 'O';
    if (gbArray[3] === 'X' && gbArray[4] === 'X' && gbArray[5] === 'X')
      return 'X';
    if (gbArray[3] === 'O' && gbArray[4] === 'O' && gbArray[5] === 'O')
      return 'O';
    if (gbArray[6] === 'X' && gbArray[7] === 'X' && gbArray[8] === 'X')
      return 'X';
    if (gbArray[6] === 'O' && gbArray[7] === 'O' && gbArray[8] === 'O')
      return 'O';
    if (gbArray[0] === 'X' && gbArray[4] === 'X' && gbArray[8] === 'X')
      return 'X';
    if (gbArray[0] === 'O' && gbArray[4] === 'O' && gbArray[8] === 'O')
      return 'O';
    if (gbArray[2] === 'X' && gbArray[4] === 'X' && gbArray[6] === 'X')
      return 'X';
    if (gbArray[2] === 'O' && gbArray[4] === 'O' && gbArray[6] === 'O')
      return 'O';
    if (gbArray[0] === 'X' && gbArray[3] === 'X' && gbArray[6] === 'X')
      return 'X';
    if (gbArray[0] === 'O' && gbArray[3] === 'O' && gbArray[6] === 'O')
      return 'O';
    if (gbArray[1] === 'X' && gbArray[4] === 'X' && gbArray[7] === 'X')
      return 'X';
    if (gbArray[1] === 'O' && gbArray[4] === 'O' && gbArray[7] === 'O')
      return 'O';
    if (gbArray[2] === 'X' && gbArray[5] === 'X' && gbArray[8] === 'X')
      return 'X';
    if (gbArray[2] === 'O' && gbArray[5] === 'O' && gbArray[8] === 'O')
      return 'O';

    return null;
  };

  return {
    updateGameboard,
    getCoord,
    isBlank,
    checkBoard,
  };
})();

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  playersContainer.style.display = 'none';
  gameboard.style.display = 'grid';
  boardHeader.style.display = 'grid';
  Admin.initializeScoreboard();
});

nextRound.addEventListener('click', () => {
  for (let i = 0; i < 9; i += 1) Gameboard.updateGameboard(i, '');
  winnerMessage.textContent = '';
  nextRound.style.display = 'none';
  playerInfos[0].style.backgroundColor = 'white';
  playerInfos[1].style.backgroundColor = 'white';
  Admin.resetGame();
});

gameboardSquares.forEach((sq) =>
  sq.addEventListener('click', (e) => {
    if (nextRound.style.display === 'block') return;
    if (Gameboard.isBlank(e)) {
      Gameboard.updateGameboard(Gameboard.getCoord(e), Admin.getPlayerTurn());
      Admin.takeTurn();
      if (Gameboard.checkBoard() === 'X') {
        winnerMessage.textContent = `${Admin.getPlayerOne().getName()} wins!`;
        Admin.updateScoreboard('X');
        playerInfos[0].style.backgroundColor = 'lightGreen';
        playerInfos[1].style.backgroundColor = 'white';
        nextRound.style.display = 'block';
      }
      if (Gameboard.checkBoard() === 'O') {
        winnerMessage.textContent = `${Admin.getPlayerTwo().getName()} wins!`;
        Admin.updateScoreboard('O');
        playerInfos[0].style.backgroundColor = 'white';
        playerInfos[1].style.backgroundColor = 'lightGreen';
        nextRound.style.display = 'block';
      }
      if (
        Admin.getTurnNumber() === 9 &&
        Gameboard.checkBoard() !== 'X' &&
        Gameboard.checkBoard() !== 'O'
      ) {
        winnerMessage.textContent = 'Tie game!';
        nextRound.style.display = 'block';
      }
    }
  })
);

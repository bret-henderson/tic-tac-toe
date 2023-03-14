const gameboardSquares = document.querySelectorAll('.gameboard-square');
const winnerMessage = document.querySelector('.winner-message');

const Admin = (() => {
  const score = 0;
  let turnNumber = 0;
  let playerTurn = 'X';

  const getScore = () => score;
  const getPlayerTurn = () => playerTurn;
  const takeTurn = () => {
    turnNumber += 1;
    if (turnNumber % 2 === 0) playerTurn = 'X';
    else playerTurn = 'O';
  };

  return {
    getScore,
    getPlayerTurn,
    takeTurn,
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
    // 2 6 8
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
    if (gbArray[2] === 'X' && gbArray[6] === 'X' && gbArray[8] === 'X')
      return 'X';
    if (gbArray[2] === 'O' && gbArray[6] === 'O' && gbArray[8] === 'O')
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

gameboardSquares.forEach((sq) =>
  sq.addEventListener('click', (e) => {
    if (Gameboard.isBlank(e)) {
      Gameboard.updateGameboard(Gameboard.getCoord(e), Admin.getPlayerTurn());
      Admin.takeTurn();
      console.log(Gameboard.checkBoard());
      if (Gameboard.checkBoard() !== null) {
        winnerMessage.textContent = `${Gameboard.checkBoard()} wins!`;
      }
    }
  })
);

const Player = (name, turn) => {
  const getName = () => name;
  const getTurn = () => turn;

  return { name, turn, getName, getTurn };
};

const bret = Player('bret', true);
const badGuy = Player('computer', false);
// bret.takeTurn();

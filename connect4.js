/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i = 0; i < HEIGHT; i++) {
    let row = [];
    for(let j = 0; j < WIDTH; j++) {
      row.push(null);
    }
    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');

  // TODO: add comment for this code

  // Create the "top" table row of the htmlBoard where players will click to select what column to place a game piece in
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // For each column, create a data cell with an id of its x-coordinate and append it to the "top" table row
  for (var x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }

  // Append the completed "top" table row to the htmlBoard
  htmlBoard.append(top);

  // TODO: add comment for this code
  
  // For each row (unit of height of the game board), create a table row
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");

    // For each column (unit of width of the game board), create a new data cell with an id of its x- and y-coordinates
    // and append the cell to the row which it belongs to.
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }

    // Append the populated row to the htmlBoard
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0

  for(let i = HEIGHT - 1; i > -1; i--) {
    if (!board[i][x]) return i; //using that null is falsy to check if the spot is available
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const newDiv = document.createElement('div');
  newDiv.classList.add('piece', `p${currPlayer}`);
  const targetCell = document.getElementById(`${y}-${x}`);
  targetCell.append(newDiv);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every((row) => !row.includes(null))) endGame("Board is full - it's a draw!"); 

  //if (board.every((row) => row.every((cell) => cell !== undefined))) endGame("Board is full - it's a draw!");
  //if (board.every((row) => !row.includes(undefined))) endGame("Board is full - it's a draw!");

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  // For every row
  for (let y = 0; y < HEIGHT; y++) {

    // For every column
    for (let x = 0; x < WIDTH; x++) {

      // Define a horizontal, vertival, diagonal down-right, and
      // diagonal down-left array of four game piece divs which
      // start at the current cell defined by the row and column
      // the loops are currently on
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];


      // Check if ANY of the four arrays are a valid win - if so, the current player has won
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

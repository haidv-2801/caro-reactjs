import CrossIcon from '@atlaskit/icon/glyph/cross';
import MediaServicesPreselectedIcon from '@atlaskit/icon/glyph/media-services/preselected';

var CaroHelpers = {};

/**
 * Lưu trạng thái của ô
 * DVHAI 23/07/2021
 */
CaroHelpers.STATE = {
  BLANK: '',
  X: 'X',
  O: 'O',
};

CaroHelpers.GRID_SIZE = 50;
CaroHelpers.WIN_SIZE = 5;
CaroHelpers.DEFAULT_NAME_PLAYER1= 'player1';
CaroHelpers.DEFAULT_NAME_PLAYER2= 'player2';

/**
 * Kẻ bảng
 * @param {cỡ} size
 * @returns Ma trận [][]
 * DVHAI 23/07/2021
 */
CaroHelpers.createGrid = (size) => {
  let grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i][j] = CaroHelpers.STATE.BLANK;
    }
  }
  return grid;
};

/**
 * Lấy người chơi hiện tại
 * @param {true/fase} turn
 * @returns X/O
 * DVHAI 23/07/2021
 */
CaroHelpers.getPlayerByTurn = (turn) =>
  turn === true
    ? CaroHelpers.getDisplayCell(CaroHelpers.STATE.O)
    : CaroHelpers.getDisplayCell(CaroHelpers.STATE.X);

/**
 *Người thắng
 * @param {*} grid
 * @param {*} curX
 * @param {*} curY
 * @param {So sánh 2 ô tự chỉnh} compare
 * @returns Tên người thắng
 * DVHAI 23/07/2021
 */
CaroHelpers.winner = (grid, curX, curY, compare) => {
  let rowCounter = 0,
    colCounter = 0,
    mainDiagonalCounter = 0,
    seDiagonalCounter = 0,
    boundaryTopMain = CaroHelpers.getBoundaryCell(curX, curY, 'MAIN_DIAGONAL'),
    boundaryTopSec = CaroHelpers.getBoundaryCell(
      curX,
      curY,
      'SECONDARY_DIAGONAl'
    ),
    mainX = boundaryTopMain.x,
    mainY = boundaryTopMain.y,
    secX = boundaryTopSec.x,
    secY = boundaryTopSec.y,
    max = 0,
    currentPlayer = grid[curX][curY];

  for (let i = 1; i < CaroHelpers.GRID_SIZE; i++) {
    if (
      compare(grid[i][curY], grid[i - 1][curY]) && grid[i][curY] === currentPlayer
    ) {
      rowCounter++;
    } else {
      max = Math.max(max, rowCounter);
      rowCounter = 0;
    }
  }

  for (let i = 1; i < CaroHelpers.GRID_SIZE; i++) {
    if (
      compare(grid[curX][i], grid[curX][i - 1]) && grid[curX][i] === currentPlayer
    ) {
      colCounter++;
    } else {
      max = Math.max(max, colCounter);
      colCounter = 0;
    }
  }

  while (CaroHelpers.canMove(mainX + 1, mainY + 1)) {
    if (
      compare(grid[mainX][mainY], grid[mainX + 1][mainY + 1]) && grid[mainX][mainY] === currentPlayer
    ) {
      mainDiagonalCounter++;
    } else {
      max = Math.max(max, mainDiagonalCounter);
      mainDiagonalCounter = 0;
    }
    mainX++;
    mainY++;
  }

  while (CaroHelpers.canMove(secX + 1, secY - 1)) {
    if (
      compare(grid[secX][secY], grid[secX + 1][secY - 1]) && grid[secX][secY] === currentPlayer
    ) {
      seDiagonalCounter++;
    } else {
      max = Math.max(max, seDiagonalCounter);
      seDiagonalCounter = 0;
    }
    secX++;
    secY--;
  }

  if (max >= CaroHelpers.WIN_SIZE - 1) {
    return currentPlayer;
  }

  return -1;
};

/**
 * Lấy biên trên phải
 * @param {*} curX
 * @param {*} curY
 * @param {Chéo chính/Chéo phụ} diagonalType
 * @returns {x,y}
 * DVHAI 23/07/2021
 */
CaroHelpers.getBoundaryCell = (curX, curY, diagonalType) => {
  if (diagonalType === 'MAIN_DIAGONAL') {
    while (CaroHelpers.canMove(curX, curY)) {
      curX--;
      curY--;
    }
    curX++;
    curY++;
  } else if (diagonalType === 'SECONDARY_DIAGONAl') {
    while (CaroHelpers.canMove(curX, curY)) {
      curX--;
      curY++;
    }
    curX++;
    curY--;
  }

  return { x: curX, y: curY };
};

/**
 * Có thể di chuyển
 * đến tọa độ (x,y)
 * DVHAI 23/07/2021
 */
CaroHelpers.canMove = (x, y) => {
  return (
    x >= 0 && x < CaroHelpers.GRID_SIZE && y >= 0 && y < CaroHelpers.GRID_SIZE
  );
};

/**
 * So sánh 2 ô
 * DVHAI 23/07/2021
 */
CaroHelpers.cellEqual = (cell1, cell2) => {
  return cell1 === cell2;
};

CaroHelpers.getDisplayCell = (value) => {
  let display = CaroHelpers.BLANK;

  if (value === CaroHelpers.STATE.X || value === false) {
    display = <CrossIcon name="X" size="large" primaryColor="red" />;
  } else if (value === CaroHelpers.STATE.O || value === true) {
    display = (
      <MediaServicesPreselectedIcon
        name="O"
        size="large"
        primaryColor="#4fff4f"
      />
    );
  }

  return display;
};

export default CaroHelpers;

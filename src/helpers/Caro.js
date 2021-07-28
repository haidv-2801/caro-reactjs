import CrossIcon from '@atlaskit/icon/glyph/cross';
import MediaServicesPreselectedIcon from '@atlaskit/icon/glyph/media-services/preselected';

var CaroHelpers = {};

/**
 * Lưu trạng thái của ô
 * DVHAI 23/07/2021
 */
CaroHelpers.STATE = {
  BLANK: '',
  X: <CrossIcon name="X" size="large" primaryColor="red" />,
  O: (
    <MediaServicesPreselectedIcon
      name="O"
      size="large"
      primaryColor="#4fff4f"
    />
  ),
};

CaroHelpers.GRID_SIZE = 50;
CaroHelpers.WIN_SIZE = 5;

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
  turn === true ? CaroHelpers.STATE.O.props.name : CaroHelpers.STATE.X.props.name;

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
    boundaryTopSec = CaroHelpers.getBoundaryCell(curX, curY, 'SECONDARY_DIAGONAl'),
    mainX = boundaryTopMain.x,
    mainY = boundaryTopMain.y,
    secX = boundaryTopSec.x,
    secY = boundaryTopSec.y,
    max = 0;

  for (let i = 1; i < CaroHelpers.GRID_SIZE; i++) {
    if (
      compare(grid[i][curY], grid[i - 1][curY]) &&
      CaroHelpers.getPlayer(grid, { row: i, col: curY }) ===
        CaroHelpers.getPlayer(grid, { row: curX, col: curY })
    ) {
      rowCounter++;
    } else {
      max = Math.max(max, rowCounter);
      rowCounter = 0;
    }
  }

  for (let i = 1; i < CaroHelpers.GRID_SIZE; i++) {
    if (
      compare(grid[curX][i], grid[curX][i - 1]) &&
      CaroHelpers.getPlayer(grid, { row: curX, col: i }) ===
        CaroHelpers.getPlayer(grid, { row: curX, col: curY })
    ) {
      colCounter++;
    } else {
      max = Math.max(max, colCounter);
      colCounter = 0;
    }
  }

  while (CaroHelpers.canMove(mainX + 1, mainY + 1)) {
    if (
      compare(grid[mainX][mainY], grid[mainX + 1][mainY + 1]) &&
      CaroHelpers.getPlayer(grid, { row: mainX, col: mainY }) ===
        CaroHelpers.getPlayer(grid, { row: curX, col: curY })
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
      compare(grid[secX][secY], grid[secX + 1][secY - 1]) &&
      CaroHelpers.getPlayer(grid, { row: secX, col: secY }) ===
        CaroHelpers.getPlayer(grid, { row: curX, col: curY })
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
    console.log(CaroHelpers.getPlayer(grid, { row: curX, col: curY }));
    return CaroHelpers.getPlayer(grid, { row: curX, col: curY });
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
  return x >= 0 && x < CaroHelpers.GRID_SIZE && y >= 0 && y < CaroHelpers.GRID_SIZE;
};

/**
 * So sánh 2 ô
 * DVHAI 23/07/2021
 */
CaroHelpers.cellEqual = (cell1, cell2) => {
  if (cell1 === CaroHelpers.STATE.BLANK || cell2 === CaroHelpers.STATE.BLANK) return false;
  if (!cell1.props.name || !cell2.props.name) return false;
  return cell1.props.name === cell2.props.name;
};

/**
 * Lấy người chơi
 * @param {*} grid
 * @param {*} pos
 * @returns
 * DVHAI 23/07/2021
 */
CaroHelpers.getPlayer = (grid, pos) => {
  if (typeof pos !== 'object') throw new Error();
  if (pos) return grid[pos.row][pos.col].props.name || '';
  return '';
};


export default CaroHelpers
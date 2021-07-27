import React, {
  useCallback,
  useEffect,
  useState,
  createContext,
  useRef,
} from 'react';
import ReactDom from 'react-dom';
import CaroGrid from './CaroGrid';
import CaroToolBar from './CaroToolbar';
import CaroStartScreen from './CaroStartScreen';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import MediaServicesPreselectedIcon from '@atlaskit/icon/glyph/media-services/preselected';
import ModalNotification from '../UI/modal/ModalNotification';
import CaroAppContext from '../../store/caroapp-context';

const STATE = {
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
const GRID_SIZE = 50;
const WIN_SIZE = 5;
const START_SCREEN = 'START_SCREEN';
const GAME_SCREEN = 'GAME_SCREEN';
export const StateContext = createContext();

/**
 * Kẻ bảng
 * @param {cỡ} size
 * @returns Ma trận [][]
 */
const createGrid = (size) => {
  let grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i][j] = STATE.BLANK;
    }
  }
  return grid;
};

/**
 * Lấy người chơi hiện tại
 * @param {true/fase} turn
 * @returns X/O
 */
const getPlayerByTurn = (turn) =>
  turn === true ? STATE.O.props.name : STATE.X.props.name;

/**
 *Người thắng
 * @param {*} grid
 * @param {*} curX
 * @param {*} curY
 * @param {So sánh 2 ô tự chỉnh} compare
 * @returns Tên người thắng
 */
const winner = (grid, curX, curY, compare) => {
  let rowCounter = 0,
    colCounter = 0,
    mainDiagonalCounter = 0,
    seDiagonalCounter = 0,
    boundaryTopMain = getBoundaryCell(curX, curY, 'MAIN_DIAGONAL'),
    boundaryTopSec = getBoundaryCell(curX, curY, 'SECONDARY_DIAGONAl'),
    mainX = boundaryTopMain.x,
    mainY = boundaryTopMain.y,
    secX = boundaryTopSec.x,
    secY = boundaryTopSec.y,
    max = 0;

  for (let i = 1; i < GRID_SIZE; i++) {
    if (
      compare(grid[i][curY], grid[i - 1][curY]) &&
      getPlayer(grid, { row: i, col: curY }) ===
        getPlayer(grid, { row: curX, col: curY })
    ) {
      rowCounter++;
    } else {
      max = Math.max(max, rowCounter);
      rowCounter = 0;
    }
  }

  for (let i = 1; i < GRID_SIZE; i++) {
    if (
      compare(grid[curX][i], grid[curX][i - 1]) &&
      getPlayer(grid, { row: curX, col: i }) ===
        getPlayer(grid, { row: curX, col: curY })
    ) {
      colCounter++;
    } else {
      max = Math.max(max, colCounter);
      colCounter = 0;
    }
  }

  while (canMove(mainX + 1, mainY + 1)) {
    if (
      compare(grid[mainX][mainY], grid[mainX + 1][mainY + 1]) &&
      getPlayer(grid, { row: mainX, col: mainY }) ===
        getPlayer(grid, { row: curX, col: curY })
    ) {
      mainDiagonalCounter++;
    } else {
      max = Math.max(max, mainDiagonalCounter);
      mainDiagonalCounter = 0;
    }
    mainX++;
    mainY++;
  }

  while (canMove(secX + 1, secY - 1)) {
    if (
      compare(grid[secX][secY], grid[secX + 1][secY - 1]) &&
      getPlayer(grid, { row: secX, col: secY }) ===
        getPlayer(grid, { row: curX, col: curY })
    ) {
      seDiagonalCounter++;
    } else {
      max = Math.max(max, seDiagonalCounter);
      seDiagonalCounter = 0;
    }
    secX++;
    secY--;
  }

  if (max >= WIN_SIZE - 1) {
    console.log(getPlayer(grid, { row: curX, col: curY }));
    return getPlayer(grid, { row: curX, col: curY });
  }

  return -1;
};

/**
 * Lấy biên trên phải
 * @param {*} curX
 * @param {*} curY
 * @param {Chéo chính/Chéo phụ} diagonalType
 * @returns {x,y}
 */
const getBoundaryCell = (curX, curY, diagonalType) => {
  if (diagonalType === 'MAIN_DIAGONAL') {
    while (canMove(curX, curY)) {
      curX--;
      curY--;
    }
    curX++;
    curY++;
  } else if (diagonalType === 'SECONDARY_DIAGONAl') {
    while (canMove(curX, curY)) {
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
 */
const canMove = (x, y) => {
  return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;
};

/**
 * So sánh 2 ô
 */
const cellEqual = (cell1, cell2) => {
  if (cell1 === STATE.BLANK || cell2 === STATE.BLANK) return false;
  if (!cell1.props.name || !cell2.props.name) return false;
  return cell1.props.name === cell2.props.name;
};

const getPlayer = (grid, pos) => {
  if (typeof pos !== 'object') throw new Error();
  if (pos) return grid[pos.row][pos.col].props.name || '';
  return '';
};

const CaroApp = () => {
  const [grid, setGrid] = useState([]);
  const [preGrid, setPreGrid] = useState([]);
  const [screenMode, setScreenMode] = useState(START_SCREEN);
  const [currentPos, setcurrentPos] = useState(null);
  const [modalContent, setModalContent] = useState('');
  const [turn, setTurn] = useState(true);
  const [counter, setCounter] = useState(0);
  const [activeTimmer, setActiveTimer] = useState(false);
  const [gameInfo, setGameInfo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const canMoveBackRef = useRef(false);
  const toolBarRef = useRef();

  /**
   * Tạo bảng
   */
  useEffect(() => {
    setGrid(createGrid(GRID_SIZE));
    setPreGrid(createGrid(GRID_SIZE));
  }, []);

  /**
   * Tìm người chiến thắng
   * mỗi lần click vào ô
   */
  useEffect(() => {
    if (grid.length && currentPos) {
      let xName = STATE.X.props.name,
        winn = getPlayerByTurn(turn) === xName ? STATE.O : STATE.X,
        win = winner(grid, currentPos.row, currentPos.col, cellEqual),
        text = (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {winn} THẮNG
          </div>
        );

      if (win !== -1) {
        setModalContent(text);
        setModalOpen(true);
      }

      if (counter === GRID_SIZE * GRID_SIZE) {
        setModalContent(`HÒA`);
        setModalOpen(true);
      }
    }
  }, [grid, currentPos, turn, counter]);

  /**
   * Click vào ô
   * @param {*} pos
   * @returns
   */
  const cellClickHandler = (pos) => {
    if (grid[pos.row][pos.col] !== STATE.BLANK) return;
    setPreGrid(grid);
    let newValue = turn ? STATE.O : STATE.X;
    setGrid((preState) =>
      preState.map((row, rIndex) =>
        row.map((col, cIndex) =>
          col === STATE.BLANK && rIndex === pos.row && cIndex === pos.col
            ? newValue
            : col
        )
      )
    );
    setTurn((preState) => !preState);
    setcurrentPos(pos);
    setCounter((preState) => preState + 1);
    toolBarRef.current.resetTimer();
    canMoveBackRef.current = true;
  };

  /**
   * Chơi lại
   */
  const restartGameClickHandler = () => {
    setGrid(createGrid(GRID_SIZE));
    setPreGrid(createGrid(GRID_SIZE));
    setTurn(true);
    setCounter(0);
    setActiveTimer(true);
    setcurrentPos(null);
    setModalOpen(false);
    toolBarRef.current.resetTimer();
  };

  /**
   * Quay lại bước vừa đi
   */
  const backPreviousStepClickHandler = useCallback(() => {
    if (counter <= 0 || !canMoveBackRef.current) return;
    canMoveBackRef.current = false;
    setGrid(preGrid);
    setTurn(preState => !preState);
    setCounter(preState => preState-1);
  }, [preGrid, counter]);

  /**
   * Thoát game
   */
  const exitGameClickHandler = () => {
    setActiveTimer(false);
    setScreenMode(START_SCREEN);
  };

  /**
   * Bắt đầu chơi
   */
  const startClickHandler = (data) => {
    setGameInfo({
      time: data.time,
      player1: data.player1,
      player2: data.player2,
    });
    setActiveTimer(true);
    restartGameClickHandler();
    setScreenMode(GAME_SCREEN);
  };

  /**
   * Hết thời gian
   */
  const timeUp = () => {
    let xName = STATE.X.props.name,
      winner = getPlayerByTurn(turn) === xName ? STATE.O : STATE.X,
      text = <div style={{ display: 'flex', alignItems: 'center' }}>{winner} THẮNG</div>;

    setModalContent(text);
    setModalOpen(true);
  };

  return (
    <CaroAppContext.Provider value={{ STATE }}>
      {screenMode === START_SCREEN &&
        ReactDom.createPortal(
          <CaroStartScreen
            state={STATE}
            open={screenMode === START_SCREEN ? true : false}
            startClickHandler={startClickHandler}
          />,
          document.getElementById('backdrop-root')
        )}

      {modalOpen === true && (
        <ModalNotification
          onButtonClick={restartGameClickHandler}
          content={modalContent}
        ></ModalNotification>
      )}

      <CaroToolBar
        ref={toolBarRef}
        gameInfo={gameInfo}
        backPreviousStepClickHandler={backPreviousStepClickHandler}
        restartGameClickHandler={restartGameClickHandler}
        exitGame={exitGameClickHandler}
        turn={turn}
        activeTimmer={activeTimmer}
        timmer={gameInfo.time}
        timeUp={timeUp}
      />
      <CaroGrid grid={grid} cellClickHandler={cellClickHandler} />
    </CaroAppContext.Provider>
  );
};

export default CaroApp;

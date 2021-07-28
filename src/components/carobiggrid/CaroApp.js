import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import ReactDom from 'react-dom';
import CaroGrid from './CaroGrid';
import CaroToolBar from './CaroToolbar';
import CaroStartScreen from './CaroStartScreen';
import ModalNotification from '../UI/modal/ModalNotification';
import CaroAppContext from '../../store/caroapp-context';
import CaroHelpers from '../../helpers/Caro'

const START_SCREEN = 'START_SCREEN';
const GAME_SCREEN = 'GAME_SCREEN';

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
   * Khởi tạo
   * DVHAI 20/07/2021
   */
  useEffect(() => {
    setGrid(CaroHelpers.createGrid(CaroHelpers.GRID_SIZE));
    setPreGrid(CaroHelpers.createGrid(CaroHelpers.GRID_SIZE));
  }, []);

  /**
   * Tìm người chiến thắng
   * mỗi lần click vào ô
   * DVHAI 20/07/2021
   */
  useEffect(() => {
    if (grid.length && currentPos) {
      let xName = CaroHelpers.STATE.X.props.name,
        winn = CaroHelpers.getPlayerByTurn(turn) === xName ? CaroHelpers.STATE.O : CaroHelpers.STATE.X,
        win = CaroHelpers.winner(grid, currentPos.row, currentPos.col, CaroHelpers.cellEqual),
        text = (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {winn} THẮNG
          </div>
        );

      if (win !== -1) {
        setModalContent(text);
        setModalOpen(true);
      }

      if (counter === CaroHelpers.GRID_SIZE * CaroHelpers.GRID_SIZE) {
        setModalContent(`HÒA`);
        setModalOpen(true);
      }
    }
  }, [grid, currentPos, turn, counter]);

  /**
   * Click vào ô
   * @param {*} pos
   * DVHAI 20/07/2021
   */
  const cellClickHandler = (pos) => {
    if (grid[pos.row][pos.col] !== CaroHelpers.STATE.BLANK) return;
    setPreGrid(grid);
    let newValue = turn ? CaroHelpers.STATE.O : CaroHelpers.STATE.X;
    setGrid((preState) =>
      preState.map((row, rIndex) =>
        row.map((col, cIndex) =>
          col === CaroHelpers.STATE.BLANK && rIndex === pos.row && cIndex === pos.col
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
   * DVHAI 21/07/2021
   */
  const restartGameClickHandler = () => {
    setGrid(CaroHelpers.createGrid(CaroHelpers.GRID_SIZE));
    setPreGrid(CaroHelpers.createGrid(CaroHelpers.GRID_SIZE));
    setTurn(true);
    setCounter(0);
    setActiveTimer(true);
    setcurrentPos(null);
    setModalOpen(false);
    toolBarRef.current.resetTimer();
  };

  /**
   * Quay lại bước vừa đi
   * DVHAI 22/07/2021
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
   * DVHAI 23/07/2021
   */
  const exitGameClickHandler = () => {
    setActiveTimer(false);
    setScreenMode(START_SCREEN);
  };

  /**
   * Bắt đầu chơi
   * DVHAI 23/07/2021
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
   * DVHAI 23/07/2021
   */
  const timeUp = useCallback(() => {
    let xName = CaroHelpers.STATE.X.props.name,
      winner = CaroHelpers.getPlayerByTurn(turn) === xName ? CaroHelpers.STATE.O : CaroHelpers.STATE.X,
      text = <div style={{ display: 'flex', alignItems: 'center' }}>{winner} THẮNG</div>;

    setModalContent(text);
    setModalOpen(true);
  }, [turn]);

  return (
    <CaroAppContext.Provider value={{ STATE:CaroHelpers.STATE }}>
      {screenMode === START_SCREEN &&
        ReactDom.createPortal(
          <CaroStartScreen
            state={CaroHelpers.STATE}
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

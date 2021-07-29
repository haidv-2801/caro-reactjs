import React, { useCallback, useEffect, useState, useRef } from 'react';
import ReactDom from 'react-dom';
import CaroGrid from './CaroGrid';
import CaroToolBar from './CaroToolbar';
import CaroStartScreen from './CaroStartScreen';
import ModalNotification from '../UI/modal/ModalNotification';
import CaroAppContext from '../../store/caroapp-context';
import CaroHelpers from '../../helpers/Caro';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCell,
  updateTurn,
  updateCurrentPos,
  updateGrid,
  updatepPreGrid,
  caroDefaultValue,
} from '../../redux/slices/CaroSlice';
import Resource from '../../helpers/Resource';

const START_SCREEN = 'START_SCREEN';
const GAME_SCREEN = 'GAME_SCREEN';

const CaroApp = () => {
  const dispatcher = useDispatch();
  const selector = useSelector((state) => state.caro);
  const { grid, turn, preGrid, currentPos } = selector;
  const [screenMode, setScreenMode] = useState(START_SCREEN);
  const [modalContent, setModalContent] = useState('');
  const [counter, setCounter] = useState(0);
  const [activeTimmer, setActiveTimer] = useState(false);
  const [gameInfo, setGameInfo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const canMoveBackRef = useRef(false);
  const toolBarRef = useRef();
  /**
   * Tìm người chiến thắng
   * mỗi lần click vào ô
   * DVHAI 20/07/2021
   */
  useEffect(() => {
    if (grid.length && currentPos !== null) {
      let win = CaroHelpers.winner(
          grid,
          currentPos.row,
          currentPos.col,
          CaroHelpers.cellEqual
        ),
        text = (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {CaroHelpers.getDisplayCell(win)} {Resource.GameResult.Win.format('')}
          </div>
        );

      if (win !== -1) {
        setModalContent(text);
        setModalOpen(true);
      }

      if (counter === CaroHelpers.GRID_SIZE * CaroHelpers.GRID_SIZE) {
        setModalContent(Resource.GameResult.Draw);
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
    if (!CaroHelpers.cellEqual(grid[pos.row][pos.col], CaroHelpers.STATE.BLANK))
      return;
    dispatcher(updatepPreGrid(grid));
    let newValue = turn ? CaroHelpers.STATE.O : CaroHelpers.STATE.X;
    dispatcher(updateCell({ x: pos.row, y: pos.col, value: newValue }));
    dispatcher(updateTurn(!turn));
    dispatcher(updateCurrentPos(pos));
    setCounter((preState) => preState + 1);
    toolBarRef.current.resetTimer();
    canMoveBackRef.current = true;
  };

  /**
   * Chơi lại
   * DVHAI 21/07/2021
   */
  const restartGameClickHandler = () => {
    dispatcher(updateGrid(caroDefaultValue.grid));
    dispatcher(updatepPreGrid(caroDefaultValue.preGrid));
    dispatcher(updateTurn(caroDefaultValue.turn));
    dispatcher(updateCurrentPos(caroDefaultValue.currentPos));
    setCounter(0);
    setActiveTimer(true);
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
    dispatcher(updateGrid(preGrid));
    dispatcher(updateTurn(!turn));
    setCounter((preState) => preState - 1);
  }, [preGrid, counter, turn]);

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
      player1: data.player1 || CaroHelpers.DEFAULT_NAME_PLAYER1,
      player2: data.player2 || CaroHelpers.DEFAULT_NAME_PLAYER2,
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
    let winner = CaroHelpers.getDisplayCell(!turn),
      text = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {winner} {Resource.GameResult.Win.format('')}
        </div>
      );

    setModalContent(text);
    setModalOpen(true);
  }, [turn]);

  return (
    <CaroAppContext.Provider value={{ STATE: CaroHelpers.STATE }}>
      {screenMode === START_SCREEN &&
        ReactDom.createPortal(
          <CaroStartScreen
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

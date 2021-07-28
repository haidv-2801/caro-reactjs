import React, {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';
import Button from '@atlaskit/button';
import CountDownEngine from '../counter/CountDownEngine';
import CaroAppContext from '../../store/caroapp-context';

const CaroToolbar = (props, ref) => {
  const timmerRef = useRef();
  const stateCtx = useContext(CaroAppContext);

  useImperativeHandle(ref, () => ({
    /**
     * Đặt lại thời gian
     * DVHAI 24/07/2021
     */
    resetTimer() {
      timmerRef.current.reset();
    },

    /**
     * Lấy thông tin thời gian
     * DVHAI 24/07/2021
     */
    getCounter() {
      return timmerRef.current.getCounter();
    },
  }));

  /**
   * Hết thời gian
   * DVHAI 24/07/2021
   */
  const {timeUp} = props;
  const timeIsUp = useCallback(() => {
    timeUp();
  }, [timeUp]);

  return (
    <div className="toolbar">
      <div className="toolbar-side">
        <Button
          className="mg-r-10"
          onClick={props.backPreviousStepClickHandler}
        >
          Đi lại
        </Button>
        <Button className="mg-r-10" onClick={props.restartGameClickHandler}>
          Chơi lại
        </Button>

        <span className="mg-r-10">Người chơi hiện tại: </span>
        {props.turn ? stateCtx.STATE.O : stateCtx.STATE.X}
        {`${
          props.turn
            ? props.gameInfo.player1 || 'player'
            : props.gameInfo.player2 || 'player'
        }`}
      </div>
      <div className="toolbar-side">
        Thời gian còn lại:
        <CountDownEngine
          timeUp={timeIsUp}
          ref={timmerRef}
          max={props.timmer}
          render={(data) => data}
          active={props.activeTimmer}
        />
      </div>
      <div className="toolbar-side">
        <Button onClick={props.exitGame} className="button-back-step-exit">
          Thoát game
        </Button>
      </div>
    </div>
  );
};

export default forwardRef(CaroToolbar);

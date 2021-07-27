import React, { createContext, forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import Button from '@atlaskit/button';
import CountDownEnige from '../counter/CountDownEnige';
import {StateContext} from './CaroApp'

export const ToolbarContext = createContext();

const CaroToolbar = (props, ref) => {
  const timmerRef = useRef();
  const stateCtx = useContext(StateContext)

  useImperativeHandle(ref, () => ({
    resetTimer() {
      timmerRef.current.reset();
    },
    getCounter() {
      return timmerRef.current.getCounter()
    }
  }));

  const timeUp = () => {
    props.timeUp();
  }

  return (
    <ToolbarContext.Provider value={props}>
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
          {`${props.turn ? props.gameInfo.player1 || "player" : props.gameInfo.player2 || "player"}`}
        </div>
        <div className="toolbar-side">
          Thời gian còn lại:
          <CountDownEnige timeUp={timeUp} ref={timmerRef} max={props.timmer} render={(data) => data} active={props.activeTimmer}/>
        </div>
        <div className="toolbar-side">
          <Button onClick={props.exitGame} className="button-back-step-exit">
            Thoát game
          </Button>
        </div>
      </div>
    </ToolbarContext.Provider>
  );
};

export default forwardRef(CaroToolbar);

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {} from '../carobiggrid/CaroApp';

const CountDownEnige = ({ max = 10000, active = false, render, timeUp}, ref) => {
  if (isNaN(max)) {
    throw new Error();
  }
  const [counter, setCounter] = useState(+max);
  const inProcess = useRef(false);

  useImperativeHandle(ref, () => ({
    reset() {
      setCounter(+max);
    },
    getCounter() {
      return counter;
    }
  }));

  useEffect(() => {
    if(counter === 0) {
      timeUp();
    }
  }, [counter]);

  useEffect(() => {
    setCounter(+max);
  }, [max]);

  useEffect(() => {
    if (!inProcess.current) {
      inProcess.current = true;
      setTimeout(() => {
        if (active && counter > 0) {
          setCounter((preState) => preState - 1);
        }
        inProcess.current = false;
      }, 1000);
    }
  }, [counter, active]);

  return <>{render(counter)}</>;
};

export default forwardRef(CountDownEnige);

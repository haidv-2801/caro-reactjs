import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {} from '../carobiggrid/CaroApp';

const CountDownEngine = (
  { max = 10000, active = false, timeUp, render},
  ref
) => {
  if (isNaN(max)) {
    throw new Error();
  }
  const [counter, setCounter] = useState(+max);

  useImperativeHandle(ref, () => ({
    reset() {
      setCounter(+max);
    },
  }));

  useEffect(() => {
    if (counter === 0) {
      timeUp();
    }
  }, [counter]);

  useEffect(() => {
    setCounter(+max);
  }, [max]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (active && counter > 0) {
        setCounter((preState) => preState - 1);
      }
    }, 1000);

    return () => {clearTimeout(identifier);};
  }, [counter, active]);

  return <>{render(counter)}</>;
};

export default forwardRef(CountDownEngine);
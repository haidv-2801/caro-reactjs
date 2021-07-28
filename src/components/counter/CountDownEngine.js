import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import {} from '../carobiggrid/CaroApp';

const CountDownEngine = (
  { max = 10000, active = false, timeUp, render },
  ref
) => {
  if (isNaN(max)) {
    throw new Error();
  }
  const [counter, setCounter] = useState(+max);

  useImperativeHandle(ref, () => ({
    /**
     * Đặt lại thời gian
     * DVHAI 25/07/2021
     */
    reset() {
      setCounter(+max);
    },
  }));

  /**
   * Cài đặt giá trị max
   * DVHAI 25/07/2021
   */
  useEffect(() => {
    setCounter(+max);
  }, [max]);

  /**
   * Hết thời gian
   * DVHAI 25/07/2021
   */
  useEffect(() => {
    if (counter === 0) {
      timeUp();
    }
  }, [counter, timeUp]);

  /**
   * Thời gian chạy mỗi giây
   * DVHAI 25/07/2021
   */
  useEffect(() => {
    setCounter(+max);
  }, [max]);

  useEffect(() => {
    if (active && counter > 0) {
      var identifier = setTimeout(() => {
        setCounter((preState) => preState - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(identifier);
    };
  }, [counter, active]);

  return <>{render(counter)}</>;
};

export default forwardRef(CountDownEngine);

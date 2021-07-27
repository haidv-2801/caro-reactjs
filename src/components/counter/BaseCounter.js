import React, { useEffect, useRef, useState } from 'react';

const BaseCounter = ({
  min = 0,
  max = Number.MAX_VALUE,
  type = 'UP',
  render,
  active
}) => {
  const [counter, setCounter] = useState();
  const counterRef = useRef();

  useEffect(()=>{console.log(active);})

  const setCounterRef = () => {
    counterRef.current = type === 'UP' ? min : max;
    setCounter(type === 'UP' ? min : max);
  };

  useEffect(() => {
    max = +max;
    min = +min;
    if (max < min || !render || isNaN(min) || isNaN(max)) {
      throw new Error();
    }
    let count = 0;
    setCounterRef();
    switch (type) {
      case 'UP':
        count = setInterval(() => {
          if (active) {
            if (counterRef.current < max) {
              counterRef.current++;
              if (counterRef.current === max) {
                clearInterval(count);
                setCounterRef();
              }
            }
            setCounter(counterRef.current);
          }
        }, 1000);
        break;
      case 'DOWN':
        count = setInterval(() => {
          console.log(active)
          if (active) {
            if (counterRef.current > min) {
              counterRef.current--;
              if (counterRef.current === min) {
                clearInterval(count);
                setCounterRef();
              }
              setCounter(counterRef.current);
            }
          }
        }, 1000);
        break;
      default:
        throw new Error();
    }

    return () => clearInterval(count);
  }, [active]);

  return <>{render(counter)}</>;
};

export default BaseCounter;

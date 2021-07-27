import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import classes from '../../../assets/css/views/form/BaseInput.module.css';

const BaseInput = (props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
  }));

  const onChangeHandler = (e) => {
    props.onChangeHandler(e);
  }

  return (
    <div className={classes['form-control']}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input onChange={onChangeHandler} ref={inputRef} {...props.input} className={`${classes.input} invalid`} />
    </div>
  );
};
export default forwardRef(BaseInput);

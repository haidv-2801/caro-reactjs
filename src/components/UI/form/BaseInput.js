import React, {
  useEffect,
} from 'react';
import { useFormContext } from 'react-hook-form';
import classes from '../../../assets/css/views/form/BaseInput.module.css';

const BaseInput = (props) => {
  const {
    register,
    setFocus,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (props.hasFocus) {
      setFocus(props.hasFocus);
    }
  }, [setFocus]);

  return (
    <div className={classes['form-control']}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <div className={classes['input-gr']}>
        <input
          {...register(props.input.name)}
          {...props.input}
          className={`${classes.input} ${errors[props.input.name] ? classes.invalid : classes.valid}`}
        />
        {props.icon}
      </div>
      <p className={classes.error}>{errors[props.input.name]?.message}</p>
    </div>
  );
};
export default BaseInput;

import React from 'react';
import { useFormContext } from 'react-hook-form';
import classes from '../../../assets/css/views/form/BaseSelectBox.module.css';

const BaseSelectBox = (props) => {
  const { register } = useFormContext();

  return (
    <div className={classes['form-control']}>
      <label htmlFor={props.select.id}>{props.label}</label>
      <select
        {...register(props.select.name)}
        className={classes.select}
        {...props.select}
      >
        {props.value.map((item, index) => (
          <option value={item} key={index}>
            {props.render(item)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BaseSelectBox;

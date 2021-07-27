import React from 'react';
import classes from '../../../assets/css/views/modal/BaseModal.module.css'

const BaseModal = (props) => {
  return (
    <div className={classes['overlay']}>
      <div className={classes['start-screen']}>
        {props.children}
      </div>
    </div>
  );
};

export default BaseModal;

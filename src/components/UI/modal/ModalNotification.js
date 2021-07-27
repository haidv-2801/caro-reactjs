import React from 'react';
import BaseModal from './BaseModal';
import classes from '../../../assets/css/views/modal/ModalNotification.module.css';
import Button from '@atlaskit/button';

const ModalNotification = (props) => {
  return (
    <BaseModal>
      <div className={classes.wrapper}>
        <div className={classes.content}>
            {props.content || ''}
        </div>
        <div className={classes.footer}>
            <Button shouldFitContainer onClick={props.onButtonClick}>Chơi lại</Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalNotification;

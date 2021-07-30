import React from 'react';
import styles from '../../assets/css/views/caro/StartScreen.module.css';
import CaroStartForm from './CaroStartForm';

const CaroStartScreen = (props) => {

  const onSubmit = (data) => {
    props.startClickHandler(data);
  }

  return (
    <div className={styles.overlay}>
      <div className={`${styles['start-screen']}`}>
        <div className={`${styles['logo']}`}></div>
        <CaroStartForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default CaroStartScreen;

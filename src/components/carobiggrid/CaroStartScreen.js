import React, { useEffect, useRef, useState } from 'react';
import Button from '@atlaskit/button';
import styles from '../../assets/css/views/caro/StartScreen.module.css';
import BaseInput from '../UI/form/BaseInput';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import MediaServicesPreselectedIcon from '@atlaskit/icon/glyph/media-services/preselected';
import BaseSelectBox from '../UI/form/BaseSelectBox';

const CaroStartScreen = (props) => {
  const [inputValue, setInputValue] = useState({
    player1: 'player1',
    player2: 'player2',
    time: 60,
  });

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  /**
   * Lấy giá trị input
   * @param {event} e
   * DVHAI
   */
  const inputChangeHandler = (e) => {
    let name = e.target.name,
      value = e.target.value || name;

    setInputValue((preState) => {
      return { ...preState, [name]: value };
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={`${styles['start-screen']}`}>
        <div className={`${styles['start-content']} ${styles.logo}`}>
          <div className={styles.row}>
            <BaseInput
              ref={inputRef}
              className={styles.input}
              label="Người chơi 1:"
              input={{
                id: 'Player1',
                type: 'text',
                name: 'player1',
              }}
              onChangeHandler={inputChangeHandler}
            />
            <MediaServicesPreselectedIcon
              name="O"
              size="large"
              primaryColor="#4fff4f"
            />
          </div>
          <div className={styles.row}>
            <BaseInput
              className={styles.input}
              label="Người chơi 2:"
              input={{
                id: 'Player2',
                type: 'text',
                name: 'player2',
              }}
              onChangeHandler={inputChangeHandler}
            />
            <CrossIcon name="X" size="large" primaryColor="red" />
          </div>
          <div className={styles.row}>
            <BaseSelectBox
              className={styles.input}
              label="Thời gian:"
              select={{
                id: 'Time',
                name: 'time',
              }}
              value={['60', '180', '300', '600']}
              render={(item) => Math.round(item / 60) + ' phút'}
              onChangeHandler={inputChangeHandler}
            />
            <div style={{ width: '32px' }}></div>
          </div>
        </div>
        <div className={`${styles['start-footer']}`}>
          <Button
            onClick={() => props.startClickHandler(inputValue)}
            className={styles.button}
          >
            Chơi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaroStartScreen;

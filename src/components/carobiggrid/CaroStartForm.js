import React from 'react';
import * as yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseInput from '../UI/form/BaseInput';
import BaseSelectBox from '../UI/form/BaseSelectBox';
import Button from '@atlaskit/button';
import styles from '../../assets/css/views/caro/StartForm.module.css';
import Resource from '../../helpers/Resource';

const schema = yup.object().shape({
  player1: yup.string().min(3, 'Độ dài tối thiểu 3 kí tự').max(100, "Độ dài tối đa 100 kí tự"),
  player2: yup.string().min(3, 'Độ dài tối thiểu 3 kí tự').max(100, "Độ dài tối đa 100 kí tự"),
});

const CaroStartForm = (props) => {
  const methods = useForm({ resolver: yupResolver(schema) });
  const { handleSubmit } = methods;
  const onSubmit = (data) => props.onSubmit(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['start-content']}>
          <div className={styles.row}>
            <BaseInput
              className={styles.input}
              label="Người chơi 1:"
              input={{
                id: 'Player1',
                type: 'text',
                name: 'player1',
                defaultValue: 'player1'
              }}
              icon={Resource.Icon.O}
              hasFocus="player1"
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
                defaultValue: 'player2'
              }}
              icon={Resource.Icon.X}
            />
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
            />
            <div style={{ width: '32px' }}></div>
          </div>
        </div>
        <div className={styles['start-footer']}>
          <Button type="submit" className={styles.button}>
            Chơi
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CaroStartForm;

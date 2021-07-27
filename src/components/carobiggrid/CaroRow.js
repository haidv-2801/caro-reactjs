import React, { useContext } from 'react';
import CaroAppContext from '../../store/caroapp-context';

const CaroRow = (props) => {
  const state = useContext(CaroAppContext);
  return (
    <div className="row">
      {props.rowData.map((cellData, cellIndex) => (
        <div
          className={`cell ${cellData !== state.STATE.BLANK ? 'hasvalue' : ''}`}
          key={`${props.rowIndex}${cellIndex}`}
          onClick={() =>
            props.cellClickHandler({ row: props.rowIndex, col: cellIndex })
          }
        >
          <span>{cellData}</span>
        </div>
      ))}
    </div>
  );
};

export default CaroRow;

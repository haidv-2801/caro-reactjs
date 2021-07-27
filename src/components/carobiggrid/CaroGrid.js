import React from 'react';
import CaroRow from './CaroRow';
import {} from '../../assets/css/views/caro/Caro.css';

const CaroGrid = (props) => {
  if(!props.grid) return null;
  return (
    <div className="grid">
      {
        props.grid.map((rowData, rowIndex) => (
            <CaroRow rowData={rowData} rowIndex={rowIndex} key={rowIndex} cellClickHandler={props.cellClickHandler} />
        ))
      }
    </div>
  );
};

export default CaroGrid;

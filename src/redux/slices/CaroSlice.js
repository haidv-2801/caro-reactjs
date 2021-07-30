import { createSlice } from '@reduxjs/toolkit';
import CaroHelpers from '../../helpers/Caro';
import Resource from '../../helpers/Resource';

export const caroDefaultValue = {
  grid: CaroHelpers.createGrid(CaroHelpers.GRID_SIZE),
  preGrid: CaroHelpers.createGrid(CaroHelpers.GRID_SIZE),
  turn: Resource.Player.Player1,
  currentPos: null,
  cellFilledCounter: 0
};

const caro = createSlice({
  name: 'caro',

  initialState: {
    //Trạng thái hiện tại của bảng
    grid: caroDefaultValue.grid,

    //Trạng thái trước đó của bảng
    preGrid: caroDefaultValue.preGrid,

    //Lượt chơi hiện tại
    turn: caroDefaultValue.turn,

    //Tọa độ hiện tại
    currentPos: caroDefaultValue.currentPos,
    
    //grid bị lấp đầy
    cellFilledCounter: caroDefaultValue.cellFilledCounter
  },

  reducers: {
    /**
     * Sửa đổi bảng
     * DVHAI 29/07/2021
     */
    updateGrid: (state, action) => {
      state.grid = action.payload;
    },

    /**
     * Sửa đổi Ô
     * DVHAI 29/07/2021
     */
    updateCell: (state, action) => {
      let x = action.payload.x,
        y = action.payload.y,
        value = action.payload.value;
      state.grid[x][y] = value;
    },

    /**
     * Sửa đổi bảng trước
     * DVHAI 29/07/2021
     */
    updatepPreGrid: (state, action) => {
      state.preGrid = action.payload;
    },

    /**
     * Chuyển đổi lượt chơi
     * DVHAI 29/07/2021
     */
    updateTurn: (state, action) => {
      state.turn = action.payload;
    },

    /**
     * Sửa tọa độ
     * DVHAI 29/07/2021
     */
    updateCurrentPos: (state, action) => {
      let newValue = { ...state.currentPos, ...action.payload };
      if (action.payload == null) newValue = null;
      state.currentPos = newValue;
    },

     /**
     * Sửa trạng thái đầy
     * DVHAI 29/07/2021
     */
      updateCellFilledCounter: (state, action) => {
        state.cellFilledCounter = action.payload;
      },
  },
});

const { reducer, actions } = caro;
export const {
  updateGrid,
  updateCell,
  updateTurn,
  updatepPreGrid,
  updateCurrentPos,
  updateCellFilledCounter
} = actions;
export default reducer;

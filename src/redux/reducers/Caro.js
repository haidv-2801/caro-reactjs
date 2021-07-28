import * as types from '../Constants';

const initialState = {
  grid: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
};

const caroReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_GRID: {
      let newGrid = JSON.parse(JSON.stringify(action.payload));
      return { ...state, grid: newGrid };
    }

    case types.UPDATE_CELL_GRID: {
      let x = action.payload.x,
        y = action.payload.y,
        value = action.payload.value;
      state.grid[x][y] = value;
      return state;
    }
    default:
      return state;
  }
};

export default caroReducer;

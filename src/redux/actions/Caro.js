import * as cst from "../Constants"

export const updateGrid = (grid) => {
    return {
        type: cst.UPDATE_GRID,
        payload: grid
    }
}

export const updateCellGrid = (cell) => {
    return {
        type: cst.UPDATE_CELL_GRID,
        payload: cell
    }
}
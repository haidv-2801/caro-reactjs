import {combineReducers} from 'redux'
import caroReducer from './Caro'

const rootReducer = combineReducers({
    caro: caroReducer
})

export default rootReducer;
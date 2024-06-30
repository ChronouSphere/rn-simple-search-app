import {combineReducers} from 'redux';
import listReducer from './list/listReducer';

const rootReducer = combineReducers({
  listReducer: listReducer,
});

export default rootReducer;

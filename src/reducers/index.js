import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { contribReducer } from './contribReducer';

const rootReducer = combineReducers({
  user: userReducer,
  contributors: contribReducer
});

export default rootReducer;

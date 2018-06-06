import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { contribReducer } from './contribReducer';
import { pollReducer } from './pollReducer';

const rootReducer = combineReducers({
  user: userReducer,
  contributors: contribReducer,
  poll: pollReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import config from './config/reducer';
import posts from './posts/reducer';

export default combineReducers({
  posts,
  config,
});

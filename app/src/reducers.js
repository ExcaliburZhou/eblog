import { combineReducers } from 'redux';
import demo from './containers/Second2/reducer';
import minus from './containers/Second3/reducer';

export default combineReducers({
  demo,
  minus
});

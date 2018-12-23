import { ADD_NUMBER } from './actionTypes';

const STATE = {
  a: 1
};

export default (state = STATE, { type, data }) => {
  switch (type) {
    case ADD_NUMBER:
      return Object.assign({}, state, { a: state.a + data });
    default:
      return state;
  }
};
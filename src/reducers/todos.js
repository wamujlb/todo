import TODOS from "../constants/todos";

const defaultState = {}

export default (state = defaultState, action) => {
  switch (action.type) {
    case TODOS.FETCH:
      return action.payload;
    default:
      return state;
  }
};
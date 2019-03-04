import USER from "../constants/user";

const defaultState = false;

export default (state = defaultState, action) => {
    switch (action.type) {
        case USER.FETCH:
            return action.payload || null;
        default:
            return state;
    }
};
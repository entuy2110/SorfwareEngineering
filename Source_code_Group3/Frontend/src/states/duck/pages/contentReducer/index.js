import * as types from './constants';
var initialState = {

};

var reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_CONTENT :
            return action.value;
        default:
            return state;
    }
}
export default reducer;
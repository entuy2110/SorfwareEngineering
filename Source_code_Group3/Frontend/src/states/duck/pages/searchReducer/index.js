import * as types from './constants';
var initialState = {
    resultList : [],
};

var reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_RESULT :
            return {...state, resultList : action.value};
        default:
            return state;
    }
}
export default reducer;
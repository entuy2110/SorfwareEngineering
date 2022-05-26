import * as types from './constants';
var initialState = {
    studentList : []
};

var reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LIST :
            return {...state, studentList : action.value};
        default:
            return state;
    }
}
export default reducer;
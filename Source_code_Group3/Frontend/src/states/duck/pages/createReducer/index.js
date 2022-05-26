import * as types from './constants';
var initialState = {
    subjectList : [],
    courseId : ""
};

var reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SUBJECT :
            return {...state, subjectList : action.value};
        case types.SET_NEW_COURSE :
            return {...state, courseId : action.value};
            default:
            return state;
    }
}
export default reducer;
import * as types from './constants';
var initialState = {
    Courses : [],
    idCourse : "",
};

var reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER :
            return action.value 
        case types.SET_COURSE_ID :
            return {...state, idCourse : action.value};
        default:
            return state;
    }
}
export default reducer;
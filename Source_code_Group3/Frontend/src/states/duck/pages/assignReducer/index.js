import * as types from './constants';
var initialState = {
    assignment : {},
    submission : {},
    submissionList : []
};

var reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ASSIGNMENT :
            return {...state, assignment : action.value};
        case types.SET_SUBMISSION :
            return {...state, submission : action.value};
        case types.SET_SUBMISSION_LIST :
            return {...state, submissionList : action.value};
        default:
            return state;
    }
}
export default reducer;
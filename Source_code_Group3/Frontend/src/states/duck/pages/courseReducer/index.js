import * as types from './constants';
var initialState = {
    courseInfo : [],
    courseContent : [],
    courseAssign : [],
    courseDoc : [],
    status : false
};

var reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_COURSE :
            return {...state, courseInfo:action.value[0],courseContent:action.value[1]
                ,courseAssign:action.value[2],courseDoc:action.value[3], status:action.value[4].status};
      
        default:
            return state;
    }
}
export default reducer;
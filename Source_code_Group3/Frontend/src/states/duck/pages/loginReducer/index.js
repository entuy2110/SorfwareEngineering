import * as types from './constants';
var initialState = {
   token:""
};

var reducer = (state = initialState, action) => {
    switch (action.type) {
    
        case types.SET_LOGIN_TOKEN:
            return {...state, token : action.value};
        default:
            return state;
    }
}
export default reducer;
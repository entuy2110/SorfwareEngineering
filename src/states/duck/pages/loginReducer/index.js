import * as types from './constants';
var initialState = {
    LoginForm:true,
    LoginAdmin:false,
    LoginTccd:false,
    pathname:"/login",
    phone:"",
    adminToken:"",
    tccdToken:"",
};

var reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case types.SET_TOGGLE :
            console.log(action.title);
            return {...state, pathname:action.title};
        case types.SUBMIT_PHONE :
            return {...state, phone:action.value};
        case types.SET_ADMIN_TOKEN :
            return {...state, adminToken:action.value};
        case types.SET_TCCD_TOKEN :
            return {...state, tccdToken:action.value};
        case types.LOG_OUT:
            
            return {...state, tccdToken:"",adminToken:""};
        default:
            return state;
    }
}
export default reducer;
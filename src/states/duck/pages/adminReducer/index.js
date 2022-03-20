import * as types from './constants';
var initialState = {
    toggleMenu:false,
    nameCompany:"",
    stockCode:"",
    businessCode:"",
    totalShareHolder:"",
    totalShares:"",
    phone:"",
    fax:"",
    address:"",
    timeMeeting:"",
    addressMeeting:"",
    nameMeeting:"",
    content:"",
    preside:"",
    secretary:"",
    livestreamLink:"",
    statedLink:"",
    logo:"",
    banner:"",
};

var reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TOGGLE :
            console.log(state.toggleMenu);
            
            return { ...state, toggleMenu : !state.toggleMenu }
        case types.SET_ADMIN_CONFERENCE :
            return action.value 
        default:
            return state;
    }
}
export default reducer;
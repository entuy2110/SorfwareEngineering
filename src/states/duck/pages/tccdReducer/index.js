import * as types from './constants';
var initialState = {
    statistic : {percent:"0",totalShares:"0",totalJoinedVotedOnline:"0",totalSharesJoinedVotedOnline:"0",totalJoinedVotedLive:"0",totalSharesJoinedVotedLive:"0",totalJoinedVotedAuthority:"0",totalSharesJoinedVotedAuthority:"0"},
    table:[],
    toggleMenu:false,
    pageNumber:1,
    total:'', 
    filter:"",
    list:[],
};

var reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TOGGLE :
            return { ...state, toggleMenu : !state.toggleMenu }
        case types.SET_STATISTIC :
            return { ...state, statistic: action.value }
        case types.SET_TABLE :
            return { ...state, table: action.value }
        case types.SET_PAGE_NUMBER :
            return { ...state, pageNumber: action.value }
        case types.GET_TABLE_TOTAL :
            return { ...state, total: action.value }
        case types.SET_FILTER:
            return { ...state, filter: action.value }
        case types.SET_LIST:
            return { ...state, list: action.value }
        default:
            return state;
    }
}
export default reducer;
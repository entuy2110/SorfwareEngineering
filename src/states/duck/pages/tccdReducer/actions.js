import * as constants from './constants';
import {callApiTccd} from './../../../common';



export const setTccdToggle = () => {
    return {
        type: constants.SET_TOGGLE,
    }
}

export const getStatisticApi = () => {
    return dispatch =>  callApiTccd(`${constants.URL}`, "GET", null).then(res=>{          
        dispatch(setStatistic(res.data.data))     
    }); 
}

export const getReport = () => {
    return dispatch =>  callApiTccd(`${constants.URL_REPORT}`, "GET", null).then(res=>{      

        
        localStorage.setItem('percent', res.data.data.percent);     
        localStorage.setItem('totalSharesJoinedVoted', res.data.data.totalSharesJoinedVoted);     
        localStorage.setItem('totalSharesJoinedVotedOnline', res.data.data.totalSharesJoinedVotedOnline);     
        localStorage.setItem('totalJoinedVotedOnline', res.data.data.totalJoinedVotedOnline);     
        localStorage.setItem('totalJoinedVotedAuthority', res.data.data.totalJoinedVotedAuthority);     
        localStorage.setItem('totalSharesJoinedVotedAuthority', res.data.data.totalSharesJoinedVotedAuthority); 
        localStorage.setItem('totalJoinedVotedLive', res.data.data.totalJoinedVotedLive);     
        localStorage.setItem('totalSharesJoinedVotedLive', res.data.data.totalSharesJoinedVotedLive); 
        localStorage.setItem('totalShareholder', res.data.data.totalShareholder);     
        localStorage.setItem('totalShareholderJoinedVoted', res.data.data.totalShareholderJoinedVoted); 
        localStorage.setItem('totalShares', res.data.data.totalShares); 

        localStorage.setItem('nameCompany', res.data.data.conference.nameCompany);
        localStorage.setItem('businessCode', res.data.data.conference.businessCode);
        localStorage.setItem('preside', res.data.data.conference.preside);
        localStorage.setItem('province', res.data.data.conference.addressMeeting.province);
        localStorage.setItem('time', res.data.data.conference.timeMeeting.end);
        dispatch(setList(res.data.data.checkIn))   
    }); 
}

export const setStatistic = (value) => {
    return {
        type:constants.SET_STATISTIC,
        value: value
    }
}

export const getTableApi = (pageNumber,filter) => {
    return dispatch =>  callApiTccd(`${constants.URL_TABLE}/${pageNumber}`, "POST", {
        identityNumber:filter,
        joinType:"all",
        status:"all"
    }).then(res=>{          
        dispatch(getTotalTable(res.data.data.total))  ; 
        dispatch(setTable(res.data.data.shareholders))   
    }); 
}
export const setTable = (value) => {
    return {
        type:constants.SET_TABLE,
        value: value
    }
}
export const getTotalTable = (value) => {
    return {
        type: constants.GET_TABLE_TOTAL,
        value
    }
}
export const getPageNumber = (value) => {
    return {
         type: constants.SET_PAGE_NUMBER,
        value
    }
}

export const setFilter = (value) => {
    return {
        type:constants.SET_FILTER,
        value: value
    }
}
export const setList = (value) => {
    return {
        type:constants.SET_LIST,
        value: value
    }
}
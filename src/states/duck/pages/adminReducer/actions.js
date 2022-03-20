import * as constants from './constants';
import {callApi} from './../../../common';
import PNotify from "pnotify/dist/es/PNotify";


export const setAdminToggle = () => {
    return {
        type: constants.SET_TOGGLE,
    }
}
export const createConference = (body) => {
    return dispatch =>  callApi(`${constants.URL_CREATE}`, "POST", body).then (res=>{          
    PNotify.success({
            title: "Thành công",
            text: "Update dữ liệu thành công",
            destroy: true,
            delay: 1000
          });
        
}, err=>{
    PNotify.error({
        title: "Lỗi",
        text: "Dữ liệu không hợp lệ",
        destroy: true,
        delay: 1000
      });
}); 
}

export const getConferenceApi = () => {
    return dispatch =>  callApi(`${constants.URL}`, "GET", null).then(res=>{          
        dispatch(setAdminConference(res.data.conference.conference))     
    }); 
}

export const setAdminConference = (value) => {
    return {
        type:constants.SET_ADMIN_CONFERENCE,
        value: value
    }
}
import * as constants from './constants';
import {callApi} from '../../../common';


export const getContent = (value) => {
    return dispatch =>  callApi(`${constants.CONT_GET}/${value}`, "GET", null).then(res=>{  
        dispatch(setContent(res.data.data))   
    }); 
}

export const setContent = (value) => {
    return {
        type:constants.SET_CONTENT,
        value: value
    }
}
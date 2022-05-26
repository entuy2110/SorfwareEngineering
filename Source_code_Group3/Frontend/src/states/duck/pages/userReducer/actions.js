import * as constants from './constants';
import {callApi} from '../../../common';
import PNotify from "pnotify/dist/es/PNotify";


export const getUserApi = (value) => {
    return dispatch =>  callApi(`${constants.URL}/${value}`, "GET", null).then(res=>{  
        dispatch(setUser(res.data.data))    
    }); 
}

export const editUserApi = (id,value) => {
    return dispatch =>  callApi(`${constants.URL_EDIT}/${id}`, "POST", value).then(res=>{  
      console.log(res);
      if(res.data.success){
        PNotify.success({
          title: 'Success!',
          text: 'Thực hiện thành công',
          destroy:true,
          delay:500
        });
      }else{
        PNotify.error({
          title: 'Oh No!',
          text: 'Không thành công',
          destroy:true,
          delay:500
        });
      }
    }).catch(e=>{
        PNotify.error({
          title: 'Oh No!',
          text: 'Không thành công',
          destroy:true,
          delay:500
        });
      })  
}

export const setUser = (value) => {
    return {
        type:constants.SET_USER,
        value: value
    }
}

export const setCourse = (value) => {
    return {
        type:constants.SET_COURSE_ID,
        value: value
    }
}
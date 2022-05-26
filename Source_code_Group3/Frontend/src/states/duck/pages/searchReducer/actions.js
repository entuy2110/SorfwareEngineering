import * as constants from './constants';
import {callApi} from '../../../common';
import PNotify from "pnotify/dist/es/PNotify";




export const searchCourseApi = (value) => {
    
    return dispatch =>  callApi(`${constants.URL_SEARCH}/${value}`, "GET", null).then(res=>{  
        dispatch(setResult(res.data.data))            
    }); 
}

export const addListApi = (value) => {
    
    return dispatch =>  callApi(`${constants.URL_ADD_STUDENT}`, "POST", value).then(res=>{  
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
          text: 'Không thành công. Bạn đã đăng ký từ trước',
          destroy:true,
          delay:1000
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

export const setResult = (value) => {
    return {
        type:constants.SET_RESULT,
        value: value
    }
}





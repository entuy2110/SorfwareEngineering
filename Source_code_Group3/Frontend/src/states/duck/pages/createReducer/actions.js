import * as constants from './constants';
import {callApi} from '../../../common';
import PNotify from "pnotify/dist/es/PNotify";




export const getSubjectApi = (course,user) => {
    
    return dispatch =>  callApi(`${constants.SUBJECT_LIST}`, "GET", null).then(res=>{  
        dispatch(setSubject(res.data.data))            
    }); 
}

export const setSubject = (value) => {
    return {
        type:constants.SET_SUBJECT,
        value: value
    }
}

export const createCourse = (value) => {
    return dispatch =>  callApi(`${constants.COURSE_NEW}`, "POST", value).then(res=>{  
      console.log(res.data.success);
      if(res.data.success){
        dispatch(setNewCourse(res.data.data.idCourse))  
        PNotify.success({
          title: 'Success!',
          text: 'Thực hiện thành công',
          destroy:true,
          delay:500
        });
      }else{
        PNotify.error({
          title: 'Oh No!',
          text: 'Mã khóa học đã được sử dụng',
          destroy:true,
          delay:1000
        });
      }
    }).catch(e=>{
        PNotify.error({
          title: 'Oh No!',
          text: 'Không thành công',
          destroy:true,
          delay:1000
        });
      }) 
}

export const createSubject = (value) => {
    return dispatch =>  callApi(`${constants.SUBJECT_NEW}`, "POST", value).then(res=>{  
      console.log(res.data.success);
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
          text: 'Môn học đã tồn tại',
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

export const setNewCourse = (value) => {
    return {
        type:constants.SET_NEW_COURSE,
        value: value
    }
}


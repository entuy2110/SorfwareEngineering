import * as constants from './constants';
import {callApi} from '../../../common';
import PNotify from "pnotify/dist/es/PNotify";


export const getAssignment = (value) => {
    return dispatch =>  callApi(`${constants.ASSIGNMENT_GET}/${value}`, "GET", null).then(res=>{  
        dispatch(setAssignment(res.data.data))      
    }); 
}

export const getSubmission = (user,assign) => {
    return dispatch =>  callApi(`${constants.SUBMISSION_GET}/${user}/${assign}`, "GET", null).then(res=>{  
        dispatch(setSubmission(res.data.data))     
    }); 
}

export const getSubmissionList = (value) => {
    return dispatch =>  callApi(`${constants.SUBMISSION_LIST}/${value}`, "GET", null).then(res=>{  
        dispatch(setSubmissionList(res.data.data))     
    }); 
}

export const deleteSubmission = (value) => {
    return dispatch =>  callApi(`${constants.SUBMISSION_DEL}/${value}`, "POST", null).then(res=>{  
    }).then(b=>{
        PNotify.success({
          title: 'Success!',
          text: 'Thực hiện thành công',
          destroy:true,
          delay:1000
        });
      }).catch(e=>{
        PNotify.error({
          title: 'Oh No!',
          text: 'Không thành công',
          destroy:true,
          delay:1000
        });
      })  
}


export const setAssignment = (value) => {
    return {
        type:constants.SET_ASSIGNMENT,
        value: value
    }
}

export const setSubmission = (value) => {
    return {
        type:constants.SET_SUBMISSION,
        value: value
    }
}

export const setSubmissionList = (value) => {
    return {
        type:constants.SET_SUBMISSION_LIST,
        value: value
    }
}

export const uploadSubmission = (value) => {
    return dispatch =>  callApi(`${constants.SUBMISSION_NEW}`, "POST", value).then(res=>{  
    }).then(b=>{
        PNotify.success({
          title: 'Success!',
          text: 'Thực hiện thành công',
          destroy:true,
          delay:1000
        });
      }).catch(e=>{
        PNotify.error({
          title: 'Oh No!',
          text: 'Không thành công',
          destroy:true,
          delay:1000
        });
      }) 
}
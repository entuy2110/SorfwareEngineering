import * as constants from './constants';
import {callApi} from '../../../common';
import PNotify from "pnotify/dist/es/PNotify";


export const getListApi = (value) => {
    return dispatch =>  callApi(`${constants.LIST_GET}/${value}`, "POST", null).then(res=>{  
        dispatch(setList(res.data.data))      
    }); 
}
export const approveStuddentApi = (idCourse,idUser) => {
    return dispatch =>  callApi(`${constants.LIST_EDIT}/${idCourse}/${idUser}`, "POST", null).then(res=>{  
    }).then(b=>{
        PNotify.success({
          title: 'Success!',
          text: 'Thực hiện thành công',
          destroy:true,
          delay:500
        });
      }).catch(e=>{
        PNotify.error({
          title: 'Oh No!',
          text: 'Không thành công',
          destroy:true,
          delay:500
        });
      }) 
}
export const deleteStuddentApi = (idCourse,idUser) => {
    return dispatch =>  callApi(`${constants.LIST_DELETE}/${idCourse}/${idUser}`, "POST", null).then(res=>{  
    }).then(b=>{
        PNotify.success({
          title: 'Success!',
          text: 'Thực hiện thành công',
          destroy:true,
          delay:500
        });
      }).catch(e=>{
        PNotify.error({
          title: 'Oh No!',
          text: 'Không thành công',
          destroy:true,
          delay:500
        });
      }) 
}

export const setList = (value) => {
    return {
        type:constants.SET_LIST,
        value: value
    }
}
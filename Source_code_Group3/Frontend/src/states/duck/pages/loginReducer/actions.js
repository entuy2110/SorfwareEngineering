import * as constants from './constants';
import {callApi} from '../../../common';
import PNotify from "pnotify/dist/es/PNotify";


export const loginApi = (value) => {
    return dispatch =>  callApi(`${constants.LOGIN}`, "POST", value).then(res=>{  
       localStorage.setItem("idUser",res.data.data[0].idUser);
       dispatch(setLoginToken(res.data.data[0].idUser));
    }).then(b=>{
        PNotify.success({
          title: 'Success!',
          text: 'Đăng nhập thành công',
          destroy:true,
          delay:1000
        });
      }).catch(e=>{
        PNotify.error({
          title: 'Oh No!',
          text: 'Đăng nhập không thành công',
          destroy:true,
          delay:1000
        });
      })
}

export const logOut = () => {
    localStorage.clear();
}

export const setLoginToken = (value) => {
    return {
        type: constants.SET_LOGIN_TOKEN,
        value: value
    }
}


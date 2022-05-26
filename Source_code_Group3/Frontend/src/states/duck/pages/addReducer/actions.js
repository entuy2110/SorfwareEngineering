import * as constants from './constants';
import {callApi} from '../../../common';
import PNotify from "pnotify/dist/es/PNotify";



export const addUser = (value) => {
    return dispatch =>  callApi(`${constants.USER_NEW}`, "POST", value).then(res=>{ 
      console.log(res) 
      if(res.data.success){
        PNotify.success({
          title: 'Success!',
          text: 'Thêm người dùng thành công',
          destroy:true,
          delay:500
        });
      }else{
        PNotify.error({
          title: 'Oh No!',
          text: 'Email đã được sử dụng',
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




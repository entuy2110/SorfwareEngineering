import * as constants from './constants';
import {callApi,downloadApi} from '../../../common';
import PNotify from "pnotify/dist/es/PNotify";




export const getCourseApi = (course,user) => {
    
    return dispatch =>  callApi(`${constants.URL_FIND}/${course}/${user}`, "POST", null).then(res=>{  
        dispatch(setCourse(res.data.data))            
    }).catch(e=>{
      PNotify.success({
        title: 'Success!',
        text: 'Thực hiện thành công',
        destroy:true,
        delay:500
      });
    }) 
}

export const setCourse = (value) => {
    return {
        type:constants.SET_COURSE,
        value: value
    }
}


export const uploadContent = (value) => {
    return dispatch =>  callApi(`${constants.CONT_NEW}`, "POST", value).then(res=>{  
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
export const uploadDocument = (value) => {
    return dispatch =>  callApi(`${constants.DOC_NEW}`, "POST", value).then(res=>{  
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

export const uploadAssignment = (value) => {
    return dispatch =>  callApi(`${constants.ASSIGN_NEW}`, "POST", value).then(res=>{  
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

export const deleteContent = (value) => {
    return dispatch =>  callApi(`${constants.CONT_DEL}/${value}`, "POST", null).then(res=>{  
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
export const deleteDocument = (value) => {
    return dispatch =>  callApi(`${constants.DOC_DEL}/${value}`, "POST", null).then(res=>{  
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

export const deleteAssignment = (value) => {
    return dispatch =>  callApi(`${constants.ASSIGN_DEL}/${value}`, "POST", null).then(res=>{  
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

export const deleteCourse = (value) => {
  return dispatch =>  callApi(`${constants.COURSE_DEL}/${value}`, "POST", null).then(res=>{  
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

export const downloadDocument = (value) => {
  return dispatch =>  downloadApi(`${constants.DOC_DOW}/${value}`, "GET", null).then(res=>{  
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

// const downloadDocument = (value,name) => {
//   return dispatch =>  downloadApi(`documents/download/${value}`, "GET", null).then(res=>{  
//     console.log(res);
//   }).then(function(res){
//       var reader = new FileReader();
//       reader.readAsDataURL(res.data); 
//       reader.onloadend = ()=> {
//       var file = dataURLtoFile(reader.result, name);
//           setFile({
//               file: file,
//               src:reader.result,
//           })
//       }
//     })
// }
// function dataURLtoFile(dataurl, filename) {
//   var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
//       bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
//   while(n--){
//       u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], filename + "." + mime.slice(mime.indexOf("/") + 1) , {type:mime});
// }
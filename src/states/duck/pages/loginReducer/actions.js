import * as constants from './constants';
import callLoginApi from './../../../common/index';
import PNotify from "pnotify/dist/es/PNotify";

export const signInAdmin = (email, password) => {
    return dispatch =>  callLoginApi(constants.URL, "POST", {
        email: email,
        otp:"",
        password: password,
    }).then(res=>{
        localStorage.setItem('admin-token', res.data.token);
        dispatch(setAdminToken(res.data.token));
        PNotify.success({
            title: "Thành công",
            text: "Đăng nhập thành công",
            destroy: true,
            delay: 1000
          });
    },
    err=>{
        PNotify.error({
            title: "Thất bại",
            text: "Sai email hoặc mật khẩu",
            destroy: true,
            delay: 1000
          });
    })
}

export const signInTccd = (otp, phone) => {
    return dispatch =>  callLoginApi(constants.TCCD_URL, "POST", {
        otp:otp,
        phone:phone,
        role:"3",
        stockCode:"pgi"
    }).then(res=>{
        localStorage.setItem('tccd-token', res.data.token);
        dispatch(setTccdToken(res.data.token));
        PNotify.success({
            title: "Thành công",
            text: "Đăng nhập thành công",
            destroy: true,
            delay: 1000
          });
    }, err=> {
        PNotify.error({
            title: "Thất bại",
            text: "Sai mã OTP",
            destroy: true,
            delay: 1000
          });
    })
    
}


export const setLoginToggle = (title) => {
    return {
        type: constants.SET_TOGGLE,
        title:title,
    }
}

export const submitPhone = (value) => {
    return {
        type: constants.SUBMIT_PHONE,
        value: value,

    }
}

export const setAdminToken = (value) => {
    return {
        type: constants.SET_ADMIN_TOKEN,
        value: value
    }
}

export const setTccdToken = (value) => {
    return {
        type: constants.SET_TCCD_TOKEN,
        value: value
    }
}

export const signOut = () => {
    return {
        type: constants.LOG_OUT
    }
}
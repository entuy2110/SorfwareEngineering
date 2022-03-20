import React, {useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {setLoginToggle} from "./../../../states/duck/pages/loginReducer/actions";
import { useHistory } from "react-router-dom";
const loginType = [ {
    type: "/login/admin",
    title: "Đăng nhập quyền Admin"
},
{
    type: "invest",
    title: "Đăng nhập dành cho ban quan hệ cổ đông"
},
{
    type: "/login/tccd",
    title: "Đăng nhập dành cho ban kiểm tra tư cách cổ đông"
},
{
    type: "invest",
    title: "Đăng nhập dành cho ban kiểm phiếu"
},
{
    type: "invest",
    title: "Đăng nhập dành cho thư kí"
},

]

const LoginForm = () => {
    const dispatch = useDispatch();
    var history = useHistory();
    const onSubmit =(title) => {
        history.location.pathname=title;
        dispatch(setLoginToggle(history.location.pathname));
        history.push(title);
        
    }
    return (
        <div className="login-form">
        <div className="login-header">
            <img src="images/login-icon.png" alt=""/>
            <p className="title">Lựa chọn đăng nhập</p>
        </div>
        <div className="login-option">
            {loginType.map((item, index) => {
                return (
                    <div className="login-type_item" onClick={()=>onSubmit(item.type)}>
                        {item.title}
                    </div>
                )
            })}
        </div>
    
    </div>
    );
}

export default LoginForm;
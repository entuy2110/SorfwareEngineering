import React, {useState, useEffect} from 'react';
import * as actions from './../../../states/duck/pages/loginReducer/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

const LoginAdmin = () => {
    const [email,setEmail]=useState("admin0@gmail.com");
    const [password,setPassword]=useState("abc123");
    const dispatch = useDispatch();

    const adminToken = useSelector(state=>state.loginPage.adminToken);
    let history = useHistory();
    useEffect(()=>{
        if(adminToken !== ""){
             history.push("/admin");
        }
    }, [history, adminToken])
    return (
        <div className="login-admin">
        <div className="login-header">
                <img src="images/login-icon.png" alt=""/>
                <p className="title">Đăng nhập Admin</p>
            </div>
            <div className="login-option">
                <p>Tài khoản</p>
                <input type="text"  value={email} onChange={(e)=>setEmail(e.target.value)} />
                <p>Mật khẩu</p>
                <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit" onClick={() => dispatch(actions.signInAdmin(email, password))}> Tiếp tục</button>
            </div>
    </div>
    );
}

export default LoginAdmin;
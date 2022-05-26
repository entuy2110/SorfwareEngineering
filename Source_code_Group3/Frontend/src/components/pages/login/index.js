import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {loginApi} from '../../../states/duck/pages/loginReducer/actions';
import { useHistory } from "react-router-dom";
import useForm from 'react-hook-form';
const LoginPage= () => {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        
        const formData = {
            email : data.userName,
            password : data.password
        }
        dispatch(loginApi(formData));  
    }
    
    const token = useSelector(state=>state.loginPage.token);
    let history = useHistory();
    useEffect(()=>{
        if(token !== ""){
             history.push("/");
        }
    }, [token])
    return (
        <div>
        <section className="section-login">
            <div className="bs-container">
                <div className="desc-layer">
                        <img src="./images/desc1.png" alt=""/>
                </div>
                <div className="module module-login ">
                    <div className="module-header">

                    </div>
                    <div className="module-content">
                        <div className="login-component">
                            <div className="icon">
                                <img src="./images/login-icon.png" alt=""/>
                                <p>ĐĂNG NHẬP</p>
                            </div>
                            <form className="formData" onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-area">
                                    <p>Email</p>
                                    <input type="text" name="userName" ref={register}></input>
                                    <p>Mật khẩu</p>
                                    <input type="password" name="password" ref={register}></input>
                                    <button type="submit">ĐĂNG NHẬP</button>
                                   
                                </div>
                            </form>
                        </div>
                       
                    </div>
                </div>
            
            </div>
    </section>
  
        </div>
    );
}

export default LoginPage;


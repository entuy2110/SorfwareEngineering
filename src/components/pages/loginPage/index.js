import React, {useState, useEffect} from 'react';
// import * as actions from './../../../states/duck/pages/loginReducer/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from "./login-form";
import LoginAdmin from "./login-admin";
import LoginTccd from "./login-tccd";
import Header from "./../../layout/header";
import Footer from "./../../layout/footer";
import { useHistory } from "react-router-dom";
import {setLoginToggle} from "./../../../states/duck/pages/loginReducer/actions";
const LoginPage = () => {

    
    const Path = useSelector(state => state.loginPage.pathname);
    const dispatch = useDispatch();
    let history = useHistory();
    useEffect(() => {
        
        dispatch(setLoginToggle(history.location.pathname));
    }, [history]);
    console.log(Path);
    
    return (
    <div>
      <Header/> 
    
        <div className="section-login">
         <div className="bs-container">
             <div className="module module-login">
                 <div className="layer-1">
           
                 </div>
                 <div className="layer-2">
           
                 </div>
                 <div className="module-header"></div>
                 <div className="module-content">
                     <div className="bs-row">
                        {Path ==="/login" ? <LoginForm/> : ""}  
                        {Path ==="/login/admin" ? <LoginAdmin/> : ""} 
                        {Path ==="/login/tccd" ? <LoginTccd/> : ""}
                 
                     </div>
                 </div>
             
             </div>
         </div>
        </div>
   
       
       <Footer/>
        </div>
      
    );
}

export default LoginPage;
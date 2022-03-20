import React, {useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../../states/duck/pages/loginReducer/actions';
import { useHistory } from "react-router-dom";
import { useCountUp } from 'react-countup';
const LoginTccd = () => {
    
    const phoneValue = useSelector(state => state.loginPage.phone);
    const dispatch = useDispatch();
    const phoneFunction=(event)=>{
        var target= event.target;
        var name=target.name;
        var value=target.value;
            setPhone(value)
    }
    
    const [phone,setPhone]=useState("0968184555");
    const [otp,setOtp]=useState("66666");
    const [disable,setDisable]=useState(true);
    const tccdToken = useSelector(state=>state.loginPage.tccdToken);
    let history = useHistory();
    useEffect(()=>{
        if(tccdToken !== ""){
             history.push("/tccd");
        }
    }, [history, tccdToken])
    const { countUp,start, reset } = useCountUp({
        start: 60,
        end: 0,
        delay: 0,
        duration: 500,
        suffix:"s",
        onStart:()=>{setDisable(true);
        },
        onEnd:()=>{setDisable(false);
        },
      });
    return (
        <div className="login-tccd">
            <div className="login-header">
                <img src="images/login-icon.png" alt=""/>
                <p className="title">Đăng nhập ban kiểm tra tư cách cổ đông</p>
            </div>
            <div className="login-option">
                {phoneValue ?  
                <div className="otp">
                    <p>Vui lòng nhập Mã OTP được gửi tới số điện thoại</p>
                        <div className="input" >
                            <input type="text" defaultValue={otp} onChange={(e)=>setOtp(e.target.value)} />
                                <div className="cd">
                                  {countUp}
                                </div>
                        </div>
                    <p className="link">Không nhận được OTP? <button disabled={disable} onClick={reset,start}>Gửi lại OTP</button></p>
                <button type="submit" onClick={() => dispatch(actions.signInTccd(otp, phone))}> Tiếp tục </button>
                </div>
         :      <div className="phone">
                    <p>Vui lòng nhập số điện thoại đã cung cấp cho admin</p>
                    <input type="text" defaultValue={phone} onChange={phoneFunction}/>
                    <button onClick={()=>dispatch(actions.submitPhone(phone))}>Nhập</button>


                </div>}

              
                    
            </div>
        </div>
    );
}

export default LoginTccd;
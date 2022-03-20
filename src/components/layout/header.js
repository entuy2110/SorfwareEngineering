import React, { useState,  } from 'react';
import Icofont from 'react-icofont';
// import {signOut} from './../../states/duck/pages/loginReducer/actions';
import { useDispatch } from 'react-redux';

const Header = () => {
  
  return (
    <div id="header">
        <div className="bs-container">
          <div className="header-content">
          <div className="img"></div>
          <div className="return"><a href="/login">Trở về trang chủ</a> </div>
          </div>
        </div>
    </div>
  );
}

export default Header;

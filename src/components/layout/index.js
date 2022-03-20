import React, { Fragment, useState, useEffect } from 'react';
import {  Footer, LoginPage,Header,AdminPage,TccdPage} from '../../components';
import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {setAdminToken,setTccdToken} from './../../states/duck/pages/loginReducer/actions';
import { useHistory } from "react-router-dom";
const RouteLink =()=>{
  const dispatch=useDispatch();
  let history = useHistory();
  const localAToken=localStorage.getItem("admin-token");
  if(localAToken) {
    dispatch(setAdminToken(localAToken));
  }  
  const localTcToken=localStorage.getItem("tccd-token");
  if(localTcToken) {
    dispatch(setTccdToken(localTcToken));
  } 
  const adminToken = useSelector(state => state.loginPage.adminToken);
  const tccdToken = useSelector(state => state.loginPage.tccdToken);
    if(adminToken !== ""){
      return  <Route path="/admin" exact children={()=> <AdminPage/>} />
    }
    else if(tccdToken !== ""){
      return  <Route path="/tccd" exact children={()=> <TccdPage/>} />
    }
  
    else  {
      return <Redirect
        to={{
          pathname: "/login",
        }}
      />
    }
}


const Layout = () => {

  return (
    <Fragment>
      <Router>
        <div >
        
      
          <main id="main">
            <div className="main-content">
              <Switch>
                <RouteLink path="/" exact children={()=> <LoginPage/>} />
                <Route path="/login/admin" exact children={()=> <LoginPage/>} />
                <Route path="/login/tccd" exact children={()=> <LoginPage/>} />
                <Route path="/login" exact children={()=> <LoginPage/>} />
                <RouteLink path="/admin" exact children={()=> <AdminPage/>} />
                <RouteLink path="/tccd" exact children={()=> <TccdPage/>} />
           
              </Switch>
            </div>
          
          </main>
     
    
      
        </div>

    
        
      </Router>
    </Fragment>
  );
}

export default Layout;

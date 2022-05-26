import React, { Fragment, useEffect } from 'react';
import {Header,Footer,SideMenu,LoginPage,HomePage,ResultPage,CoursePage,BioPage,
  BioChangePage,Assignment,Upload,Content,StudentList,Create,UserAdd,Subject} from '../../components';
import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {setLoginToken} from '../../states/duck/pages/loginReducer/actions';
import { useHistory } from "react-router-dom";
import $ from 'jquery';

const RouteLink =({path,children})=>{
  const dispatch = useDispatch();
  const localToken = localStorage.getItem("idUser");
  if(localToken) {
    dispatch(setLoginToken(localToken));
  }    
  const storeToken = useSelector(state => state.loginPage.token);
    if(storeToken !== ""){
      return  <Route path={path} exact children={children} />
    }
    else{
      return <Redirect
        to={{
          pathname: "/login",
        }}
      />
    }
}

const Layout = () => {

  useEffect(() => {
    $(document).scroll(function () {
      if ($(this).scrollTop() >= $("#main").offset().top) {
          $(".back-top").show();

      } else {
          $(".back-top").hide();
      }
     
  });
  $(".back-top").on("click", function () {
      $(".back-top").hide();
      $("html, body").animate({
          scrollTop: 0
      }, 250);
  });

  }, [])

  return (
    <Fragment>
      <Router>
        <div >
        <Route exact children={ ({history})=>{
            if (history.location.pathname!=="/login")
            return <Header/>
            else return ""
          } }
         
          />
      
          <main id="main">
            <div className="main-content">
              <div className="content-cover">
                <Switch>
                  <RouteLink path="/" exact children={()=> <UserPage/>} />
                  <RouteLink path="/result" exact children={()=> <UserPage/>} />
                  <RouteLink path="/course" exact children={()=> <UserPage/>} />
                  <RouteLink path="/bio" exact children={()=> <UserPage/>} />
                  <RouteLink path="/change" exact children={()=> <UserPage/>} />
                  <RouteLink path="/assignment" exact children={()=> <UserPage/>} />
                  <RouteLink path="/upload" exact children={()=> <UserPage/>} />
                  <RouteLink path="/content" exact children={()=> <UserPage/>} />
                  <RouteLink path="/list" exact children={()=> <UserPage/>} />
                  <RouteLink path="/create" exact children={()=> <UserPage/>} />
                  <RouteLink path="/add" exact children={()=> <UserPage/>} />
                  <RouteLink path="/subject" exact children={()=> <UserPage/>} />
                  <Route path="/login" exact children={()=> <LoginPage/>} />
                </Switch>  
              
              </div>
            </div>

              <div className="back-top">
                  <img src="/images/btt.png" alt=""/>
              </div>
           
          </main>
          <Route exact children={ ({history})=>{
            if (history.location.pathname!=="/login")
            return <Footer/>
            else return ""
          } }
          />
        </div>
      </Router>
    </Fragment>
  );
}

const UserPage = () => {
  let history = useHistory();
  return (
    <div className="bs-container">
          <div className="page-link">
          Home {history.location.pathname}
          </div>

    <div className="bs-row row-lg-10">
          <div className="bs-col lg-75-10">
            <Switch>
              <RouteLink path="/" exact children={()=> <HomePage/>} />
              <RouteLink path="/result" exact children={()=> <ResultPage/>} />
              <RouteLink path="/course" exact children={()=> <CoursePage/>} />
              <RouteLink path="/bio" exact children={()=> <BioPage/>} />
              <RouteLink path="/change" exact children={()=> <BioChangePage/>} />
              <RouteLink path="/assignment" exact children={()=> <Assignment/>} />
              <RouteLink path="/upload" exact children={()=> <Upload/>} />
              <RouteLink path="/content" exact children={()=> <Content/>} />
              <RouteLink path="/list" exact children={()=> <StudentList/>} />
              <RouteLink path="/create" exact children={()=> <Create/>} />
              <RouteLink path="/add" exact children={()=> <UserAdd/>} />
              <RouteLink path="/subject" exact children={()=> <Subject/>} />
            </Switch>
          </div>
          <div className="bs-col lg-25-10">
              <SideMenu/>
          </div>
          </div>
    </div>
  );
}
export default Layout;

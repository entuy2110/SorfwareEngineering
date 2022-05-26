import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {getUserApi} from '../../states/duck/pages/userReducer/actions';
import {searchCourseApi} from '../../states/duck/pages/searchReducer/actions';
import {logOut,setLoginToken} from '../../states/duck/pages/loginReducer/actions';
const Header = () => {
const dispatch = useDispatch();
  
    
const idUser = localStorage.getItem("idUser");

  useEffect(() => {
    if(idUser!="")
    dispatch(getUserApi(idUser))
  }, [localStorage.getItem("idUser")])


const [Courses, setCourse] = useState([]);
const [User, setUser] = useState({});
const user = useSelector(state => state.homePage);
useEffect(() => {
  if(user !=null){
    setUser(user)
    setCourse(user.Courses);
  }
}, [user])

 

let history = useHistory();
const findCourse = (course)=>{
    history.push("/course");
    localStorage.setItem("idCourse",course)
}
const editBio = ()=>{
    history.push("/bio");
}
const [search, setSearch] = useState("");
const searchFunction=(event)=>{
    var target= event.target;
    var value=target.value;
    setSearch(value);
}
const searchCourse = ()=>{
  history.push("/result");
  dispatch(searchCourseApi(search))
}
const onLogOut = ()=>{
  dispatch(setLoginToken(""));
  logOut();
}
  return (
    <div id="header">
      <div className="bs-container">
        <div className="header-content">
          <div className="logo">
            <img src="/images/uet-logo.png" alt=""/>
            <p>UET ONLINE COURSES</p>
          </div>
          <div className="profile">
            <div className="avatar" onClick={() => editBio()}>
              <img src="/images/avt.png" alt=""/>
            </div>
            <div className="user-menu">
              {User.familyName+" "}{User.firstName}
              <div className="drop-down">
                <div className="item" onClick={() => editBio()}>
                  Hồ sơ
                </div>
                <div className="item" onClick={() => onLogOut()}>
                  Thoát
                </div>
              </div>
            </div>
            
          </div>
        </div>
     
      </div>
      <div className="navigation">
        <div className="bs-container">
          <div className="nav-content">
            <div className="nav-bar_list">
              <ul className="main-list">
                <li className="main-item">
                  <a href="/">Trang chủ</a>
                </li>
                <li className="main-item">
                  <a href="">Danh sách khóa học</a>
                  <div className="drop-down">
                    <ul className="drop-list">
                      {Courses.map((item,index)=>{
                            return (
                            <li onClick={() => findCourse(item.idCourse)} className="drop-item" key={index}> <p>{item.courseName+" "+item.courseCode}</p></li>
                            )
                        })}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Tìm kiếm khóa học" onChange={searchFunction}/>
              <div className="button" onClick={() => searchCourse()} >
                <img src="/images/icon-search.png" alt=""/>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}
export default Header;

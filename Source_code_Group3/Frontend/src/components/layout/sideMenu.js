import React, {useState, useEffect} from 'react';
import {useSelector } from 'react-redux';
// import $ from 'jquery';

import { useHistory } from "react-router-dom";
const SideMenu= () => {
    let history = useHistory();
    const [Courses, setCourse] = useState([]);
    const user = useSelector(state => state.homePage);
    useEffect(() => {
        if(user!=null){
            setCourse(user.Courses);
        }
    }, [user])
    
    // $(".branch-item_title").click(function () {
    //     if( $(this).attr('toggle')=="1" ){
    //         $($(this).attr('data-show')).hide();
    //         $(this).attr("toggle","2")
    //     }
    //     else {
    //         $($(this).attr('data-show')).show();
    //         $(this).attr("toggle","1")

    //     }
    // });
    // $(".list-item_p").click(function () {
    //     if( $(this).attr('toggle')=="1" ){
    //         $(this).siblings().show();
    //         $(this).attr("toggle","2")
    //     }
    //     else {
    //         $(this).siblings().hide();
    //         $(this).attr("toggle","1")
    //     }
    // });
    
    const findCourse=(course)=>{
        history.push("/course");
        localStorage.setItem("idCourse",course);
    }
    const getList=(course)=>{
        history.push("/list");
        localStorage.setItem("idCourse",course);
    }
    return (
        <div>
            <div className="side-menu_component">
                <div className="header">
                    Điều hướng
                </div>
                <div className="content">
                    <p>Nhà của tôi</p>
                    <ul className="branch">
                        <li className="branch-item">
                            <p className="branch-item_title" data-show=".course-list" toggle="1">Các khóa học của tôi</p>
                            <ul className="course-list">
                            {Courses.map((item,index)=>{
                            return (
                                <li className="list-item" key={index}>
                                    <p className="list-item_p" toggle="1">{item.courseName} {item.courseCode}</p>
                                    <ul className="list-item_expand">
                                        <li className="expand-item">
                                        <p onClick={() => getList(item.idCourse)}>Danh sách lớp</p>
                                        </li>
                                        <li className="expand-item">
                                        <p onClick={() => findCourse(item.idCourse)}>General</p>
                                        </li>
                                    </ul>
                                </li>
                            )
                            })}
                                
                            </ul>
                        </li>
                    </ul>
                </div>
                
            
            </div>
  
        </div>
    );
}

export default SideMenu;


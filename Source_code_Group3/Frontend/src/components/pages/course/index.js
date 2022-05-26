import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getCourseApi,deleteAssignment,deleteContent,deleteDocument,deleteCourse} from '../../../states/duck/pages/courseReducer/actions';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import {URL} from './../../../states/common/constants';
const CoursePage= () => {
    const dispatch = useDispatch();
    
    const course = useSelector(state => state.coursePage);
    const user = useSelector(state => state.homePage);
    const idCourse = localStorage.getItem("idCourse");
   
    const Course = course.courseInfo;
    const Content = course.courseContent;
    const Assign = course.courseAssign;
    const Doc = course.courseDoc;
    const Status = course.status;
    useEffect(() => {
        if(user.idUser){
            dispatch(getCourseApi(idCourse,user.idUser));
        }
    }, [user,idCourse]);

    let history = useHistory();
    const getCont = (value)=>{
        history.push("/content");
        localStorage.setItem("idCont",value)
    }
    const getAssign = (value)=>{
        history.push("/assignment");
        localStorage.setItem("idAssign",value)
    }
    const onDel = (type,value)=>{
        if(type =="Doc"){
            dispatch(deleteDocument(value))
            history.go(0)
        }else if(type=="Cont"){
            dispatch(deleteContent(value))
            history.go(0)
        }else if(type=="Assign"){
            dispatch(deleteAssignment(value))
            history.go(0)
        }else{
            dispatch(deleteCourse(value))
            localStorage.removeItem("idCourse")
            localStorage.removeItem("idCont")
             localStorage.removeItem("idAssign")
            history.go("/")
        }
    }
    const delCourse = () => {
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Bạn có chắc muốn xóa khóa học?',
          buttons: [
            {
              label: 'Đúng',
              onClick: () => onDel("Course",idCourse)
            },
            {
              label: 'Không',
              onClick: () => alert('Click No')
            }
          ]
        });
      };
    const render =()=> {
        let weeklist = [];
        for (let i = 1; i < parseInt(Course.courseWeeks)+1; i++){
            weeklist.push( 
                <li key = {i} className="week-item">
                    <div className="item-header">
                    <p>Tuần {i}</p>
                    <a href="/upload">
                        {user.idUser==Course.UserIdUser ?    <button>Thêm</button> : ""}
                    </a>
                    </div>
                    <ul className="doc-list">
                        {Doc.filter(item => item.docWeeks == i).map((item,index)=>{
                            return (
                            <li key = {index} className="doc-item">
                                <img src="/images/pdf.png" alt=""/>
                               <p><a href={`${URL}/documents/download/${item.idDoc}`} target="_self" download>
                                    {item.docName}
                                </a>
                                {user.idUser == Course.UserIdUser ? <button onClick={()=>onDel("Doc",item.idDoc)}>Xóa</button> : ""}  
                                </p> 
                               
                            </li>
                            )
                        })
                        }
                        {Content.filter(item => item.contWeeks == i).map((item,index)=>{
                            return (
                            <li key = {index} className="doc-item" >
                                <img src="/images/noti.png" alt=""/>
                                <p onClick={()=>getCont(item.idCont)}>
                                    {item.contName}
                                    {user.idUser == Course.UserIdUser ?  <button onClick={()=>onDel("Cont",item.idCont)}>Xóa</button> : ""} 
                                </p>
                               
                            </li>
                            )
                        })
                        }
                        {Assign.filter(item => item.assignWeeks == i).map((item,index)=>{
                            return (
                            <li key = {index} className="doc-item" >
                                <img src="/images/kcontent.png" alt=""/>
                                <p onClick={()=>getAssign(item.idAssignment)}>
                                    {item.assignName}
                                    {user.idUser == Course.UserIdUser ? <button onClick={()=>onDel("Assign",item.idAssignment)}>Xóa</button> : ""} 
                                </p>
                               
                            </li>
                            )
                        })
                        }
                    </ul>
                </li>
             )
        }
        return weeklist
      }
    return (
        <div>
        <section className="section-course">
                <div className="module module-course">
                    <div className="module-header">
                    </div>
                    <div className="module-content">
                        {Status == true ?  <div className="course-component">
                                            <div className="header">
                                                <ul className="noti-list">
                                                    <li>Nội dung khóa học</li>
                                                </ul>
                                                {user.idUser == Course.UserIdUser ? <button onClick={()=>delCourse()}>Xóa khóa học</button> : ""} 
                                            </div>
                                            <div className="schedule">
                                                <ul className="week-list">
                                                    {render()}                                   
                                                </ul>
                                            </div>
                                        </div> : "Bạn chưa được cấp quyền truy cập khóa học"}
                    </div>
                </div>
        </section>
  
        </div>
    );
}

export default CoursePage;


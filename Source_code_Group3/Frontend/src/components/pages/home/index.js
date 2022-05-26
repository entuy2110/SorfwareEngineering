import React, {useState, useEffect,useRef} from 'react';
import {useSelector } from 'react-redux';
import AOS from 'aos';
import Slider from "react-slick";
import $ from 'jquery';
import 'aos/dist/aos.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router-dom";
const HomePage= () => {

    AOS.init();
    const ref = useRef({});

    const next = () => {
      ref.current.slickNext();
    };
  
    const previous = () => {
      ref.current.slickPrev();
    };
    const [count, setCount] = useState(2);
    
    const [Courses, setCourse] = useState([]);
    const user = useSelector(state => state.homePage);
    useEffect(() => {
    if(user){
        setCourse(user.Courses);
    }
    }, [user])
    
  
    useEffect(() => {
        if($(window).width()<=1199) {
            setCount(2);
        }
        if($(window).width()<=479) {
            setCount(1);
        }
        if($(window).width()>1200){
            setCount(2);
        }
        $(window).resize(function () {
            
            if($(window).width()<=1199) {
                setCount(2);
            }
            if($(window).width()<=479) {
                setCount(1);
            }
            if($(window).width()>1200)  {
                setCount(2);
            }
        });
      
    }, [])
    
    let history = useHistory();
    const findCourse=(course)=>{
        history.push("/course");
        localStorage.setItem("idCourse",course)
    }

    return (
        <div>
        <section className="section-home">
                <div className="module module-home">
                    <div className="module-header">
                        
                    </div>
                    <div className="module-content">
                       {user&&user.RoleId !="3" ? 
                        <div className="course-slide_component">
                            <div className="header">
                                Các khóa học gần đây
                            </div>
                            <div className="slide-arrow">
                                <div className="prev_caro" onClick={previous}>
                                    <span aria-hidden="true">«</span>
                                </div>
                                <div className="next_caro"onClick={next}>
                                    <span aria-hidden="true">»</span>
                                </div>
                            
                            </div>
                            <div className="course-slide">
                            <Slider ref={ref} slidesToShow={count} autoplay={false} dots={false} arrows={false} pauseOnDotsHover={true} autoplaySpeed={3000}>
                                {Courses.map((item,index)=>{
                                return (
                                <div className="item" onClick={() => findCourse(item.idCourse)} key={index}>
                                    <div className="img">
                                        <img src="/images/course-bgr.png" alt=""/>
                                    </div>
                                    <div className="text">
                                        <p className="info">
                                           Học kì {item.courseSemester} năm {item.courseYear}
                                        </p>
                                        <p className="title">
                                            {item.courseName} {item.courseCode}
                                        </p>
                                    </div>
                                </div>
                                )
                                })}
                            </Slider>  
                            </div>
                            {user.RoleId=="1" ? <button onClick={()=> history.push("/create")}>Tạo khóa học mới</button> :""}
                        </div> 
                        :   <div className="course-slide_component">
                                <button onClick={()=> history.push("/add")}>Thêm người dùng mới</button>
                                <button onClick={()=> history.push("/subject")}>Thêm môn học mới</button>
                            </div>}
                        
                    </div>
                </div>
        </section>
  
        </div>
    );
}

export default HomePage;


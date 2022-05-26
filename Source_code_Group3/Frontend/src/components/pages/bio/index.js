import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
const BioPage= () => {
    let history = useHistory();
    const user = useSelector(state => state.homePage);
    const [Courses, setCourse] = useState([]);
   
    useEffect(() => {
    if(user){
        setCourse(user.Courses);
    }
    }, [user])
    return (
        <div>
        <section className="section-bio">
            <div className="module module-bio">
                <div className="module-header">
                </div>
                <div className="module-content">
                    <div className="bio-component">
                        <div className="header">
                        <div className="avatar">
                            <img src="/images/avt.png" alt=""/>
                        </div>
                        <h1>
                            {user.familyName +" "+user.firstName}
                        </h1>
                        </div>
                        <p>{user.userDes ? user.userDes : ""}</p>
                        <div className="content">
                            <div className="bs-row row-lg-10">
                                <div className="bs-col lg-50-10">
                                    <div className="user-info">
                                        <h3>Chi tiết người dùng</h3>
                                        <p onClick={() => history.push("/change")}>Sửa hồ sơ cá nhân</p>
                                        <ul className="list-info">
                                            <li className="list-item">
                                                <h5>Thư điện tử</h5>
                                                <p>{user.email}</p>
                                            </li>
                                            <li className="list-item">
                                                <h5>Ngày sinh</h5>
                                                <p>{user.birthday ? user.birthday : " "}</p>
                                            </li>
                                            <li className="list-item">
                                                <h5>Quốc gia</h5>
                                                <p>{user.country ? user.country : "Việt Nam"}</p>
                                            </li>
                                            <li className="list-item">
                                                <h5>Tỉnh/thành phố</h5>
                                                <p>{user.province ? user.province : " "}</p>
                                            </li>
                                            <li className="list-item">
                                                <h5>Quận/huyện</h5>
                                                <p>{user.district ? user.district : " "}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="bs-col lg-50-10">
                                    <div className="user-info">
                                        <h3>Chi tiết khóa học</h3>
                                        <p className="title">Mô tả sơ lược khóa học</p>
                                        <ul className="course-list">
                                        {Courses.map((item,index)=>{
                                            return (
                                                <li className="list-item" key={index}>
                                               {item.courseName} {item.courseCode}
                                                </li>
                                            )
                                        })
                                        }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  
        </div>
    );
}

export default BioPage;


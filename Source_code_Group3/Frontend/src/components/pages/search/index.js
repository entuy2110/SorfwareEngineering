import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {addListApi} from '../../../states/duck/pages/searchReducer/actions';
const ResultPage= () => {
    const dispatch = useDispatch();
    const result = useSelector(state => state.searchPage);
    const user = useSelector(state => state.homePage);
    const [resultList, setResultList] = useState([]);
    console.log(result.resultList);
    useEffect(() => {
        if(result.resultList){
            setResultList(result.resultList)
        }
    }, [result])

    let history = useHistory();
    const signUp = (value,idUser) => {
            const formData = {
                status : false,
                UserIdUser : user.idUser,
                CourseIdCourse: value,
                userName : user.familyName +" "+ user.firstName,
                userRole : user.RoleId,
                birthday:user.birthday
            }
            dispatch(addListApi(formData));  
            // history.go(0)
    }
    return (
        <div>
        <section className="section-result">
                <div className="module module-result">
                    <div className="module-header">
                    </div>
                    <div className="module-content">
                        <div className="search-result_component">
                            <div className="header">
                                Kết quả tìm kiếm: {resultList.length}
                            </div>
                            <div className="result-content">
                                <ul className="result-list">
                                {resultList.map((item,index)=>{
                                    return (
                                    <li className="result-item" key={index}>
                                        <h3>{item.courseName} {item.courseCode}</h3>
                                        <p>Giáo viên: {item.teacher}</p>
                                        <p>Học kì {item.courseSemester} năm {item.courseYear}</p>
                                        <p>Mô tả: {item.courseDes}</p>
                                        <button onClick={() => signUp(item.idCourse,item.UserIdUser)}>Đăng ký</button>
                                        {/* <button onClick={() => findCourse(item.idCourse)}>Nhấn vào đây để truy cập khóa học</button> */}
                                    </li>
                                    )
                                })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
  
        </div>
    );
}

export default ResultPage;


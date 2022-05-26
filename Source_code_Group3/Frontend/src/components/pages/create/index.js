import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getSubjectApi,createCourse} from '../../../states/duck/pages/createReducer/actions';
import {addListApi} from '../../../states/duck/pages/searchReducer/actions';
import useForm from 'react-hook-form';
import { useHistory } from "react-router-dom";
const Create= () => {
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        dispatch(getSubjectApi())
    }, [])
    const user = useSelector(state => state.homePage);
    const subject = useSelector(state => state.createPage);
    const [Subject, setSubject] = useState([]);
    useEffect(() => {
        setSubject(subject.subjectList)
    }, [subject]);
    useEffect(() => {
        if(subject.courseId!=""){
            const formData = {
                status : true,
                UserIdUser : user.idUser,
                CourseIdCourse: subject.courseId,
                userName : user.familyName +" "+ user.firstName,
                userRole : user.RoleId,
                birthday:user.birthday
            }
            dispatch(addListApi(formData)); 
            // history.go(0)
        }
    }, [subject.courseId]);


    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const formData = {
            courseName : data.name,
            courseCode : data.code,
            teacher : user.familyName+" "+user.firstName,
            courseSemester : data.semester,
            courseYear : data.year,
            courseDes : data.des,
            courseWeeks : data.week,
            UserIdUser : user.idUser,
            SubjectIdSubject : data.subject
        }
        dispatch(createCourse(formData));

    }
      
    return (
        <div>
        <section className="section-upload">
                <div className="module module-upload">
                    <div className="module-header">
                        <h1>Tạo khóa học mới</h1>
                    </div>
                    <div className="module-content">
                       <div className="title">
                           Nội dung 
                       </div>
                       <form className="formData" onSubmit={handleSubmit(onSubmit)}>
                       <table className="general-table">
                           <tbody>
                               <tr>
                                    <th className="cell c0">
                                        Tên khóa học
                                    </th>
                                    <td className="cell c1">
                                        <input name="name" type="text" ref={register({ required: true})}/>
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Mã khóa học
                                    </th>
                                    <td className="cell c1">
                                        <input name="code" type="text" ref={register({ required: true})}/>
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Giảng viên
                                    </th>
                                    <td className="cell c1">
                                        {user.familyName} {user.firstName}
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Học kì
                                    </th>
                                    <td className="cell c1">
                                        <select name="semester" ref={register({ required: true})}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Năm học
                                    </th>
                                    <td className="cell c1">
                                        <input name="year" type="number" ref={register({ required: true})}/>
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Môn học   
                                    </th>
                                    <td className="cell c1">
                                        <select name="subject" id="" placeholder="Chọn môn" ref={register({ required: true})}>
                                        {Subject.map((item,index)=>{
                                            return (
                                            <option value={item.idSubject} key={index}>{item.subjectName}</option>
                                            )
                                        })
                                        }
                                        </select>
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Số tuần
                                    </th>
                                    <td className="cell c1">
                                        <select name="week" ref={register({ required: true})}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                        </select>
                                    </td>
                               </tr>
                               
                               <tr>
                                    <th className="cell c0">
                                        Mô tả
                                    </th>
                                    <td className="cell c1">
                                        <textarea id="" cols="30" rows="10" name="des" ref={register({ required: true})} ></textarea>
                                    </td>
                               </tr> 
                              
                              
                             
                           </tbody>
                       </table>
                       <div className="submit">
                            <button type="submit">Thêm đệ trình</button>
                        </div>

                       </form>
                       
                    </div>
                </div>
        </section>
  
        </div>
    );
}

export default Create;


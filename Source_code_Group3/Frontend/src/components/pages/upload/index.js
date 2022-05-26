import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {uploadContent,uploadDocument,uploadAssignment} from '../../../states/duck/pages/courseReducer/actions';
import {getCourseApi} from '../../../states/duck/pages/courseReducer/actions';
import useForm from 'react-hook-form';
import { useHistory } from "react-router-dom";
const Upload= () => {
    const dispatch = useDispatch();
    let history = useHistory();

    const course = useSelector(state => state.coursePage);
    const user = useSelector(state => state.homePage);
    const idCourse = localStorage.getItem("idCourse");
    const Course = course.courseInfo;
    useEffect(() => {
        if(user.idUser){
            dispatch(getCourseApi(idCourse,user.idUser));
        }
    }, [user,idCourse]);

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
      
        if(data.type=="Content"){
            const formData = {
                contName : data.name,
                contDes : data.des,
                contWeeks : parseInt(data.week),
                UserIdUser : user.idUser,
                CourseIdCourse : idCourse
            }
            dispatch(uploadContent(formData));  
            // history.go(0)
        }
        else if(data.type=="Document"){
            let formData = new FormData();
            formData.append("docName",data.name)
            formData.append("docWeeks",Number(data.week))
            formData.append("UserIdUser",user.idUser)
            formData.append("CourseIdCourse",idCourse)
            formData.append("userDoc",File.file)
            
            dispatch(uploadDocument(formData));  
            // history.go(0)
        }
        else if(data.type=="Assignment"){
            const formData = {
                assignName : data.name,
                assignDes : data.des,
                assignDeadline : data.deadline,
                assignWeeks : Number(data.week),
                UserIdUser : user.idUser,
                CourseIdCourse : idCourse
            }
            dispatch(uploadAssignment(formData));  
            // history.go(0)
        }
    }

    const [File, setFile] = useState({file:"",src:"",name:""});

    let filePreview = null;
    if (File.file!=="") {
        filePreview = (<p>{File.name}</p>);
    }
    const loadFile=(e)=> {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setFile({
                file: file,
                src:reader.result,
                name:file.name
            })
        }
        reader.readAsDataURL(file)
      }

    const [type, setType] = useState("Document");  
    const changeType=(e)=> {
        setType(e.target.value)
      }
      const renderWeek =()=> {
        let weeklist = [];
        for (let i = 1; i < parseInt(Course.courseWeeks)+1; i++){
            weeklist.push( 
                <option value={i}>{i}</option>
             )
        }
        return weeklist
      }
    return (
        <div>
        <section className="section-upload">
                <div className="module module-upload">
                    <div className="module-header">
                        <h1>Thêm tài liệu</h1>
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
                                        Tên tài liệu
                                    </th>
                                    <td className="cell c1">
                                        <input name="name" type="text" ref={register({ required: true})}/>
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Loại tài liệu    
                                    </th>
                                    <td className="cell c1">
                                        <select onChange={changeType} name="type" ref={register({ required: true})}>
                                            <option value="Document">Document</option>
                                            <option value="Content">Content</option>
                                            <option value="Assignment">Homework</option>
                                        </select>
                                    </td>
                               </tr>
                               {type =="Document" ?   
                                <tr>
                                    <th className="cell c0">
                                        File
                                    </th>
                                    <td className="cell c1">
                                        <label>
                                            Thêm file
                                            <input type="file" className="file" name="file" ref={register({ required: true})} onChange={loadFile}/>
                                        </label>
                                        {filePreview}
                                    </td>
                               </tr>
                                : ""}
                              
                               <tr>
                                    <th className="cell c0">
                                        Tuần
                                    </th>
                                    <td className="cell c1">
                                        <select name="week" ref={register({ required: true})}> 
                                            {renderWeek()}
                                        </select>
                                        {/* <input type="number" min="1" max={course.courseWeeks} name="week" ref={register({ required: true})}/> */}
                                    </td>
                               </tr>
                               {type!="Document" ?  
                               <tr>
                                    <th className="cell c0">
                                        Mô tả
                                    </th>
                                    <td className="cell c1">
                                        <textarea name="desc" id="" cols="30" rows="10" name="des"ref={register({ required: true})} ></textarea>
                                    </td>
                               </tr> : ""}
                              
                               {type=="Assignment" ? 
                               <tr>
                                    <th className="cell c0">
                                        Hạn nộp
                                    </th>
                                    <td className="cell c1">
                                        <input name="deadline" type="date" ref={register({ required: true})}/>
                                    </td>
                               </tr> : ""}
                             
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

export default Upload;


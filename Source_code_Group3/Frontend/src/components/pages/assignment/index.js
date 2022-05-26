import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAssignment,uploadSubmission,getSubmission,deleteSubmission,getSubmissionList} from '../../../states/duck/pages/assignReducer/actions';
import useForm from 'react-hook-form';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {URL} from './../../../states/common/constants';

const Assignment= () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const user = useSelector(state => state.homePage);
    const Assignment = useSelector(state => state.assignmentPage.assignment);
    const Submission = useSelector(state => state.assignmentPage.submission);
    const SubmissionList = useSelector(state => state.assignmentPage.submissionList);
    const idAssign = localStorage.getItem("idAssign");
    useEffect(() => {
       dispatch(getAssignment(idAssign))
       dispatch(getSubmissionList(idAssign))
       if(user)
       dispatch(getSubmission(user.idUser,idAssign))
    }, [user])
    const now = Date.now();
    const deadLine = Date.parse(Assignment.assignDeadline);
    
 

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
    
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        let formData = new FormData();
        formData.append("submissionName",data.name)
        formData.append("submissionDes",data.des)
        formData.append("UserIdUser",user.idUser)
        formData.append("AssignmentIdAssignment",Assignment.idAssignment)
        formData.append("userSubmission",File.file)
        dispatch(uploadSubmission(formData));  
        history.go(0)
    }
    const onDelete = (value) => {
        dispatch(deleteSubmission(value));
        history.go(0)
    }
    return (
        <div>
        <section className="section-assignment">
                <div className="module module-assignment">
                    <div className="module-header">
                        <h1>{Assignment.assignName}</h1>
                        <p className="des">{Assignment.assignDes}</p>
                    </div>
                    <div className="module-content">
                       <div className="status">
                           Tình trạng nộp
                       </div>
                       {user.RoleId=="2" ?  
                       <form className="formData" onSubmit={handleSubmit(onSubmit)}>
                       <table className="general-table">
                           <tbody>
                               <tr>
                                    <th className="cell c0">
                                        Tình trạng nộp
                                    </th>
                                    <td className="cell c1">
                                        {Submission && Submission.updatedAt < Assignment.assignDeadline ? "Đã nộp" : "Không được tính điểm"}
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Hạn chót    
                                    </th>
                                    <td className="cell c1">
                                        {Assignment.assignDeadline}
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Thời gian còn lại
                                    </th>
                                    <td className="cell c1">
                                        {Submission ? "" : Math.round((deadLine - now)/(60*60*1000))+" giờ"}
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Sửa đổi lần cuối
                                    </th>
                                    <td className="cell c1">
                                        {Submission ? Submission.updatedAt : "-"}
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        File
                                    </th>
                                    <td className="cell c1">
                                        {Submission ? <a href={`${URL}/submissions/download/${Submission.idSubmission}`} target="_self" download>{Submission.submissionName}</a> : <div> <label>
                                            Thêm file
                                            <input type="file" className="file" name="file" ref={register({ required: true})} onChange={loadFile}/>
                                            
                                            
                                        </label>{filePreview}<input type="text" name="name" placeholder="Tên tài liệu" ref={register({ required: true})}/></div>}
                                        
                                        <textarea name="des" id="" cols="30" rows="10" defaultValue={Submission ? Submission.submissionDes : ""} placeholder="Bình luận" ref={register}></textarea>
                                    </td>
                               </tr>
                             
                           </tbody>
                       </table>
                       {Submission ? <div className="edit">
                            <button onClick={()=> onDelete(Submission.idSubmission)}>Xóa bài nộp</button>
                        </div> : <div className="submit">
                            <button type="submit">Thêm đệ trình</button>
                        </div>}
                        </form>: 
                        
                        <div className="rate-table">
                                <table>
                                    <thead>
                                    <tr>
                                        <td className="td-head">Số thứ tự</td>
                                        <td className="td-head">ID Sinh viên</td>
                                        <td className="td-head">Bài tập</td>
                                        <td className="td-head">Mô tả</td>
                                        <td className="td-head">Trạng thái</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {SubmissionList.map((item,index)=>{
                                            return (
                                            <tr key={index}>
                                                <td><div className="tb-cell">{index+1}</div></td>
                                                <td><div className="tb-cell">{item.UserIdUser} </div></td>
                                                <td><div className="tb-cell"><a href={`${URL}/submissions/download/${item.idSubmission}`} target="_self" download>{item.submissionName}</a> </div></td>
                                                <td><div className="tb-cell">{item.submissionDes}</div></td>
                                                <td><div className="tb-cell">{item.updatedAt < Assignment.assignDeadline ? "Đúng hạn" : "Quá hạn"}</div></td>
                                            </tr>
                                            )
                                        })}
                                        
                                    </tbody>
                                </table>
                               
                        </div>}
                      
                    </div>
                </div>
        </section>
  
        </div>
    );
}

export default Assignment;


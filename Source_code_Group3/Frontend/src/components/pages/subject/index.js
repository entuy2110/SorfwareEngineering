import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createSubject} from '../../../states/duck/pages/createReducer/actions';
import {getSubjectApi} from '../../../states/duck/pages/createReducer/actions';
import { useHistory } from "react-router-dom";
import useForm from 'react-hook-form';
const Subject= () => {
    const dispatch = useDispatch();
    let history = useHistory();
    useEffect(() => {
        dispatch(getSubjectApi())
    }, [])
    const subject = useSelector(state => state.createPage);
    const [Subject, setSubject] = useState([]);
    useEffect(() => {
        setSubject(subject.subjectList)
    }, [subject]);

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const formData = {
            subjectName : data.name,
            subjectCode : data.code
        }
        dispatch(createSubject(formData));
        // history.go(0)
    }
      
    return (
        <div>
        <section className="section-upload">
                <div className="module module-upload">
                    <div className="module-header">
                        <h1>Thêm môn học mới</h1>
                    </div>
                    <div className="module-content">
                       <div className="title">
                           Thông tin 
                       </div>
                       <form className="formData" onSubmit={handleSubmit(onSubmit)}>
                       <table className="general-table">
                           <tbody>
                               <tr>
                                    <th className="cell c0">
                                        Tên môn học
                                    </th>
                                    <td className="cell c1">
                                        <input name="name" type="text" ref={register}/>
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Mã môn học
                                    </th>
                                    <td className="cell c1">
                                        <input name="code" type="text" ref={register}/>
                                    </td>
                               </tr>
                           </tbody>
                       </table>
                       <div className="submit">
                            <button type="submit">Thêm môn học</button>
                        </div>

                       </form>
                       <div className="rate-table">
                                <table>
                                    <thead>
                                    <tr>
                                        <td className="td-head">Số thứ tự</td>
                                        <td className="td-head">Tên môn học</td>
                                        <td className="td-head">Mã môn học</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {Subject.map((item,index)=>{
                                            return (
                                            <tr key={index}>
                                                <td><div className="tb-cell">{index+1}</div></td>
                                                <td><div className="tb-cell">{item.subjectName}</div></td>
                                                <td><div className="tb-cell">{item.subjectCode}</div></td>
                                            </tr>
                                            )
                                        })}
                                        
                                    </tbody>
                                </table>
                               
                        </div>
                    </div>
                </div>
        </section>
  
        </div>
    );
}

export default Subject;


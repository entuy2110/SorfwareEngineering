import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from "react-js-pagination";
import {getListApi,approveStuddentApi,deleteStuddentApi} from '../../../states/duck/pages/listReducer/actions';
import { useHistory } from "react-router-dom";
const StudentList= () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const user = useSelector(state => state.homePage);
    const idCourse = localStorage.getItem("idCourse");

    useEffect(() => {
        dispatch(getListApi(idCourse));
    }, [idCourse]);
   
    const List = useSelector(state => state.listPage.studentList);
    const onApproval=(idUser)=>{
        dispatch(approveStuddentApi(idCourse,idUser));
        history.go(0)
    }
    const onDelete=(idUser)=>{
        dispatch(deleteStuddentApi(idCourse,idUser));
        history.go(0)
    }
    return (
        <div>
        <section className="section-list">
                <div className="module module-list">
                    <div className="module-header">
                        <h1>Danh sách sinh viên</h1>
                    </div>
                    <div className="module-content">
                        <div className="student-list">
                        <div className="rate-table-wrap">
                            <div className="rate-table">
                                <table>
                                    <thead>
                                    <tr>
                                        <td className="td-head">Số thứ tự</td>
                                        <td className="td-head">ID</td>
                                        <td className="td-head">Tên</td>
                                        <td className="td-head">Ngày sinh</td>
                                        <td className="td-head">Vai trò</td>
                                        {user.RoleId=="1" ? <td className="td-head">Trạng thái</td> : ""}
                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {List.filter(item => item.status == true && item.userRole=="2").map((item,index)=>{
                                            return (
                                                <tr key={index}>
                                                <td><div className="tb-cell">{index+1}</div></td>
                                                <td><div className="tb-cell">{item.UserIdUser} </div></td>
                                                <td><div className="tb-cell">{item.userName} </div></td>
                                                <td><div className="tb-cell">{item.birthday} </div></td>
                                                <td><div className="tb-cell">{item.userRole=="1" ? "Giảng viên" : "Sinh viên"} </div></td>
                                                {user.RoleId=="1" ? <td><div className="tb-cell"><button onClick={() => onDelete(item.UserIdUser)}>Xóa</button></div></td> : ""}
                                                
                                            </tr>
                                            )
                                        })}
                                        
                                    </tbody>
                                </table>
                              
                            </div>
                        <h1>Danh sách chờ</h1>
                        <div className="rate-table">
                                <table>
                                    <thead>
                                    <tr>
                                        <td className="td-head">Số thứ tự</td>
                                        <td className="td-head">ID</td>
                                        <td className="td-head">Tên</td>
                                        <td className="td-head">Ngày sinh</td>
                                        <td className="td-head">Vai trò</td>
                                        {user.RoleId=="1" ? <td className="td-head">Trạng thái</td> : ""}
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {List.filter(item => item.status == false).map((item,index)=>{
                                            return (
                                                <tr key={index}>
                                                <td><div className="tb-cell">{index+1}</div></td>
                                                <td><div className="tb-cell">{item.UserIdUser} </div></td>
                                                <td><div className="tb-cell">{item.userName} </div></td>
                                                <td><div className="tb-cell">{item.birthday} </div></td>
                                                <td><div className="tb-cell">{item.userRole=="1" ? "Giảng viên" : "Sinh viên"} </div></td>
                                                {user.RoleId=="1" ? <td><div className="tb-cell"><button onClick={() => onApproval(item.UserIdUser)}>Thêm</button></div></td> : ""}
                                                
                                            </tr>
                                            )
                                        })}
                                        
                                    </tbody>
                                </table>
                               
                            </div>      
                          
                            </div>
                        </div>
                    </div>
                </div>
        </section>
  
        </div>
    );
}

export default StudentList;


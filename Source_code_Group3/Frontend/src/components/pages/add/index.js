import React, {useState} from 'react';
import { useDispatch} from 'react-redux';
import {addUser} from '../../../states/duck/pages/addReducer/actions';
import useForm from 'react-hook-form';
import { useHistory } from "react-router-dom";
const UserAdd= () => {
    const dispatch = useDispatch();
    let history = useHistory();

    //Quoc gia
    const countryArr =[];
    let Country = require('./../../../local-json/countries/countries.json');
    for(var item in Country){
        countryArr.push(Country[item].name);
    }
    //Thanh pho
    const cityArr =[];
    let City = require('./../../../local-json/provinces/tinh_tp.json');
    for(var item in City){
        cityArr.push(City[item].name);
    }
    const [cityValue, setCityValue] = useState("");
    //Quan,huyen
    var DistCode="";
    for(var item in City){
        if (City[item].name==cityValue)
        DistCode=City[item].code;
    }

    const addressFunction=(event)=>{
        var target= event.target;
        var name=target.name;
        var value=target.value;
        if(name=="province"){
            setCityValue(value);
            setCity(value);
            setDist("");
        }
        else if(name=="district"){setDist(value)}
        else if(name=="country"){
            setCountry(value)
            if(value!="Việt Nam"){
                setCity("unknown");
                setDist("unknown");
            }
        }
    }
    
    var District="";
    if(DistCode!=""){
        District =require(`./../../../local-json/districts/${DistCode}.json`);
    }
    const distArr =[];
    for(var item in District){
        distArr.push(District[item].name);
    }
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [dist, setDist] = useState("");

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const formData = {
            familyName : data.familyName,
            firstName : data.firstName,
            birthday : data.birthday,
            email : data.email,
            password : data.password,
            country : country,
            province : city,
            district : dist,
            RoleId : data.role
        }
        dispatch(addUser(formData));
        // history.go(0);
    }
      
    return (
        <div>
        <section className="section-upload">
                <div className="module module-upload">
                    <div className="module-header">
                        <h1>Thêm người dùng mới</h1>
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
                                        Họ và tên đệm
                                    </th>
                                    <td className="cell c1">
                                        <input name="familyName" type="text" ref={register({ required: true})}/>
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Tên
                                    </th>
                                    <td className="cell c1">
                                        <input name="firstName" type="text" ref={register({ required: true})}/>
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Ngày sinh
                                    </th>
                                    <td className="cell c1">
                                        <input name="birthday" type="date" ref={register({ required: true})}/>
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Email
                                    </th>
                                    <td className="cell c1">
                                        <input name="email" type="text" ref={register({ required: true})}/>    
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Mật khẩu
                                    </th>
                                    <td className="cell c1">
                                        <input name="password" type="password" ref={register({ required: true})}/>
                                    </td>
                               </tr>
                               <tr>
                                    <th className="cell c0">
                                        Quốc gia  
                                    </th>
                                    <td className="cell c1">
                                        <select name="country" onChange={addressFunction} value={country}>
                                        <option>Quốc gia</option>
                                            {countryArr.map((item,index)=>{
                                                return (
                                                <option value={item} key={index}>{item}</option>
                                                )
                                            })}
                                        </select>
                                    </td>
                               </tr>
                               {country=="Việt Nam" ?  
                               <tr>
                                    <th className="cell c0">
                                        Tỉnh/Thành phố 
                                    </th>
                                    <td className="cell c1">
                                        <select name="province" onChange={addressFunction} value={city}>
                                            <option>Tỉnh/thành</option>
                                            {cityArr.map((item,index)=>{
                                                return (
                                                <option value={item} key={index}>{item}</option>
                                                )
                                            })}
                                        </select>
                                    </td>
                               </tr> : ""}
                               {country=="Việt Nam" ?  
                               <tr>
                                <th className="cell c0">
                                    Quận/Huyện 
                                </th>
                                <td className="cell c1">
                                    <select name="district" onChange={addressFunction} value={dist}>
                                        {dist !=="" ? <option>{dist}</option> : <option>Quận/huyện</option> }        
                                        {distArr.map((item,index)=>{
                                            return (
                                            <option value={item} key={index}>{item}</option>
                                            )
                                        })}
                                    </select>
                                </td>
                                </tr> : ""}
                               
                               <tr>
                                    <th className="cell c0">
                                        Vai trò   
                                    </th>
                                    <td className="cell c1">
                                        <select name="role" ref={register({ required: true})}>
                                        <option value="1">Giảng viên</option>
                                        <option value="2">Sinh viên</option>
                                        <option value="3">Admin</option>
                                        </select>
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

export default UserAdd;


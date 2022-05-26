import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from 'react-hook-form';
import { useHistory } from "react-router-dom";
import {editUserApi} from '../../../states/duck/pages/userReducer/actions';
const BioChangePage= () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const user = useSelector(state => state.homePage);
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
        if(name=="country" && value !="Việt Nam"){
            setCity("unknown");
            setDist("unknown")
        }
        if(name=="province"){
            setCityValue(value);
            setCity(value);
            setDist("");
        }
        else if(name=="district"){setDist(value)}
        else if(name=="country"){setCountry(value)}
    }
    
    var District="";
    if(DistCode!=""){
        District =require(`./../../../local-json/districts/${DistCode}.json`);
    }
    const distArr =[];
    for(var item in District){
        distArr.push(District[item].name);
    }

    const [country, setCountry] = useState("Unknown");
    const [city, setCity] = useState("Unkhown");
    const [dist, setDist] = useState("Unknown");

    useEffect(() => {
        setCountry(user.country)
        setCity(user.province)
        setDist(user.district)
    }, [user]);

    const [password, setPassword] = useState("");
    const changePassord = (event)=>{
        var target= event.target;
        var value=target.value;
        setPassword(value);
    }
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        if(data.password){
            const formData = {
                familyName : data.familyName,
                firstName : data.firstName,
                birthday : data.birthday,
                country : country,
                province : city,
                district : dist,
                userDes : data.userDes,
                password : data.password
            }
            dispatch(editUserApi(user.idUser,formData))
            history.go(0)
            history.push("/bio")
        }else{
            const formData = {
                familyName : data.familyName,
                firstName : data.firstName,
                birthday : data.birthday,
                country : country,
                province : city,
                district : dist,
                userDes : data.userDes,
            }
            dispatch(editUserApi(user.idUser,formData))
            history.go(0)
            history.push("/bio")
        }
        
    }

    return (
        <div>
        <section className="section-change">
        <div className="module module-change">
                <div className="module-header">
                </div>
                <div className="module-content">
                    <div className="input-component">
                    <form className="formData" onSubmit={handleSubmit(onSubmit)}>
                        <div className="name">
                            {user.familyName +" "+user.firstName}
                        </div>
                        <ul className="input-block">
                            <li className="input-block_item">
                                <div className="header">
                                    Thông tin chung
                                </div>
                                <ul className="input">
                                    <li className="input-field">
                                        <div className="field">
                                            Tên
                                        </div>
                                        <input type="text" name="firstName" ref={register} defaultValue={user.firstName}/>
                                    </li>
                                    <li className="input-field">
                                        <div className="field">
                                            Họ và tên đệm
                                        </div>
                                        <input type="text" name="familyName" ref={register} defaultValue={user.familyName}/>
                                    </li>
                                    <li className="input-field">
                                        <div className="field">
                                           Ngày sinh
                                        </div>
                                        <input type="date" name="birthday" ref={register} defaultValue={user.birthday}/>
                                    </li>
                                    <li className="input-field">
                                        <div className="field">
                                            Thư điện tử
                                        </div>
                                        <input type="text" name="email" ref={register} value={user.email}/>
                                    </li>
                                    <li className="input-field">
                                        <div className="field">
                                            Quốc gia                                        
                                        </div>
                                        <select name="country" onChange={addressFunction} value={country}>
                                        <option>Quốc gia</option>
                                            {countryArr.map((item,index)=>{
                                                return (
                                                <option value={item}>{item}</option>
                                                )
                                            })}
                                        </select>
                                    </li>
                                    {country=="Việt Nam" ?   
                                     <li className="input-field">
                                        <div className="field">
                                            Tỉnh/Thành phố
                                        </div>
                                        <select name="province" onChange={addressFunction} value={city}>
                                            <option>Tỉnh/thành</option>
                                            {cityArr.map((item,index)=>{
                                                return (
                                                <option value={item}>{item}</option>
                                                )
                                            })}
                                        </select>
                                    </li> : ""}
                                    {country=="Việt Nam" ?   
                                    <li className="input-field">
                                       <div className="field">
                                           Quận/Huyện
                                       </div>
                                       <select name="district"  onChange={addressFunction} value={dist}>
                                           {dist !=="" ? <option>{dist}</option> : <option>Quận/huyện</option> }        
                                           {distArr.map((item,index)=>{
                                               return (
                                               <option value={item}>{item}</option>
                                               )
                                           })}
                                       </select>
                                   </li> : ""}   
                                  
                                    <li className="input-field">
                                        <div className="field">
                                            Phần mô tả                                        
                                        </div>
                                        <textarea name="userDes" ref={register} id="" cols="30" rows="10" placeholder="Mô tả bản thân" defaultValue={user.userDes}></textarea>
                                    </li>
                                    <li className="input-field">
                                        <p>-ĐỔI MẬT KHẨU-</p>
                                    </li>
                                    <li className="input-field">
                                        <div className="field">
                                            Nhập mật khẩu cũ
                                        </div>
                                        <input type="password" onChange={changePassord}/>
                                    </li>
                                    {password==user.password ?
                                     <li className="input-field">
                                        <div className="field">
                                            Nhập mật khẩu mới
                                        </div>
                                        <input type="text" name="password" ref={register}/>
                                    </li>:""}
                                </ul>
                            </li>
                        </ul>
                        <div className="submit">
                            <button  type="submit">Cập nhật hồ sơ</button>
                            <button>Hủy bỏ</button>
                        </div>
                    </form>    
                    </div>
                </div>
            </div>
            <form className="formData">

            </form> 
        </section>
  
        </div>
    );
}

export default BioChangePage;


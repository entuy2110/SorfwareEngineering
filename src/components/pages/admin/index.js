import React, {useState, useEffect} from 'react';
import {setAdminToggle,getConferenceApi,createConference} from './../../../states/duck/pages/adminReducer/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import ImageUploader from './../../../states/react-images-upload/compiled';
import useForm from 'react-hook-form';
import axios from "axios";
import {URL} from './../../../states/common/constants';
import {signOut} from './../../../states/duck/pages/loginReducer/actions';
import PNotify from "pnotify/dist/es/PNotify";
const AdminPage = () => {
    const dispatch = useDispatch();
 
    useEffect(() => {
        dispatch(getConferenceApi())
   }, [dispatch]);

    const cityArr =[];
    let City = require('./../../../local-vn/tinh-thanh/tinh_tp.json');
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
        var cl=target.className;
        if(cl=="diachi")
        {
            if(name=="province"){
                setCityValue(value);
                setCity1(value);
                setDist1("");
                setTown1("");
            }
            else if(name=="district"){setDistValue(value);setDist1(value)}
            else if(name=="wards") {setTownValue(value);setTown1(value)}
            else {setDetail1(value)}
        }
        else {
            if(name=="province"){
                setCityValue(value);
                setCity2(value);
                setDist2("");
                setTown2("");
            }
            else if(name=="district"){setDistValue(value);setDist2(value)}
            else if(name=="wards") {setTownValue(value);setTown2(value)}
            else {setDetail2(value)}
        }
      
    }
    
    var District="";
    if(DistCode!=""){
        District =require(`./../../../local-vn/quan-huyen/${DistCode}.json`);
    }
    const distArr =[];
    for(var item in District){
        distArr.push(District[item].name);
    }
    const [distValue, setDistValue] = useState("");
//Xa,phuong
    var TownCode="";
    for(var item in District){
        if (District[item].name==distValue)
        TownCode=District[item].code;
    }
    var Town="";
    if(TownCode!=""){
        Town =require(`./../../../local-vn/xa-phuong/${TownCode}.json`);
    }
    const townArr =[];
    for(var item in Town){
        townArr.push(Town[item].name);
    }
    const [townValue, setTownValue] = useState("");

//Dia chi
    const adminState=useSelector(state => state.adminPage);
    
    const address=adminState.address;
    const [city1, setCity1] = useState("");
    const [dist1, setDist1] = useState("");
    const [town1, setTown1] = useState("");
    const [detail1, setDetail1] = useState("");
//Dia diem hop
    const addressMeeting=adminState.addressMeeting;
    const [city2, setCity2] = useState("");
    const [dist2, setDist2] = useState("");
    const [town2, setTown2] = useState("");
    const [detail2, setDetail2] = useState("");   
    useEffect(() => {
        setCity1(address.province)
        setDist1(address.district)
        setTown1(address.wards)
        setDetail1(address.details)
        setCity2(addressMeeting.province)
        setDist2(addressMeeting.district)
        setTown2(addressMeeting.wards)
        setDetail2(addressMeeting.details)
        getImage(`${URL}/${adminState.urlLogo}`,"logo");
        getImage(`${URL}/${adminState.urlBanner}`,"banner");
   }, [adminState]);
   var addressChange={province:city1,district:dist1,wards:town1,details:detail1};
   var addressMeetingChange={province:city2,district:dist2,wards:town2,details:detail2};
  
   
    ///
    const toggleMenu = useSelector(state => state.adminPage.toggleMenu);
    
    
const livestreamLink=adminState.livestreamLink;
const statedLink=adminState.statedLink;
    
//Form
const { register, handleSubmit } = useForm();
const onSubmit = (data) => {
    const timeMeeting={start:data.start,end:data.end};
    
    let formData = new FormData();
    formData.append("nameCompany",data.nameCompany)
    formData.append("stockCode",data.stockCode)
    formData.append("businessCode",data.businessCode)
    formData.append("totalShareholder",Number(data.totalShareholder))
    formData.append("totalShares",Number(data.totalShares))
    formData.append("phone",data.phone)
    formData.append("fax",data.fax)
    formData.append("address",JSON.stringify(addressChange))
    formData.append("timeMeeting",JSON.stringify(timeMeeting))
    formData.append("addressMeeting",JSON.stringify(addressMeetingChange))
    formData.append("nameMeeting",data.nameMeeting)
    formData.append("content",data.content)
    formData.append("preside",data.preside)
    formData.append("secretary",data.secretary)
    formData.append("livestreamLink",livestreamLink)
    formData.append("statedLink",statedLink)
    formData.append("logo",logo.file)
    formData.append("banner",banner.file)
 
    dispatch(createConference(formData))  
 
}

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename + "." + mime.slice(mime.indexOf("/") + 1) , {type:mime});
}
const getImage = (url,name) => {
    return axios({
        method: 'get',
        url: url,
        responseType: 'blob',
        headers: {
          'Access-Control-Allow-Origin': "*",
        },
         crossdomain: true 
      }).then(function(res){
        var reader = new FileReader();
        reader.readAsDataURL(res.data); 
        reader.onloadend = ()=> {
            var file = dataURLtoFile(reader.result, name);
            if(name=="logo") {
                setLogo({
                    file: file,
                    src:reader.result,
                  })
            }else {
                setBanner({
                    file: file,
                    src:reader.result,
                  })
            }
        }
      })
  }




const [logo, setLogo] = useState({file:"",src:""});
const [banner, setBanner] = useState({file:"",src:""});
const loadImg=(e)=> {

    let reader = new FileReader();
    let file = e.target.files[0];
    const name=e.target.name;
    reader.onloadend = () => {
        if(name=="logo"){
            setLogo({
                file: file,
                src:reader.result,
              })
            
        }else {
            setBanner({
                file: file,
                src:reader.result,
              })
        }
    }
    reader.readAsDataURL(file)
  }

let logoPreview = null;
  if (logo.file!=="") {
    logoPreview = (<img src={logo.src} />);
  }
let bannerPreview = null;
  if (banner.file!=="") {
    bannerPreview = (<img src={banner.src} />);
  } 

const signOutFn=()=>{
    localStorage.setItem('admin-token', "");
    dispatch(signOut());
}


    return (
        <div className="section-admin">
                <div className="module module-admin">
                    <div className="layer-1">
                        <img src="./images/top-layer.png" alt=""/>
                    </div>
                    <div className="layer-2">
                        <img src="./images/bot-layer.png" alt=""/>
                    </div>
                    
                    <div className={`${toggleMenu ? "left-side-on" : ""} left-side`}> 
                        <div className="close-menu" >
                            <img src="./images/close-menu.png" alt="" onClick={()=>dispatch(setAdminToggle())} />
                        </div>
                        <img src="./images/h-logo.png" alt=""/>
                        <ul>
                        {leftMenu.map((item,index)=>{
                            return (
                            <li> <a href=""><p>{item.title}</p> </a></li>
                            )
                        })}
                        </ul>
                        <img className="f-logo" src="./images/f-logo.png" alt=""/>
                    </div>  
                    <div className="module-main">
                        <div className="bs-container-fluid">
                            <div className="module-header">
                                <div className="res-logo">
                                    <img src="./images/h-logo.png" alt=""/>
                                </div>
                                <div className="button-cover">
                                    <div className="result">
                                        Xem kết quả đại hội
                                    </div>
                                    <div className="name">
                                        Nguyen Van A
                                        <div className="drop-down">
                                            <ul>
                                                <li onClick={signOutFn}> <p>Đăng xuất </p> </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="open-menu">
                                    <img src="./images/open-menu.png" alt="" onClick={()=>dispatch(setAdminToggle())}/>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="title">
                                    Khai báo thông tin cơ bản
                                </div>
                                <form className="formData" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="input">
                                        <div className="bs-row row-sm-15">
                                            <div className="bs-col sm-50-15">
                                                <div className="input-item">
                                                    <p>Tên công ty</p>
                                                    <input type="text" defaultValue={adminState.nameCompany}  name="nameCompany" ref={register({ required: true})}/>
                                                </div>
                                            </div>
                                            <div className="bs-col sm-50-15">
                                                <div className="input-item">
                                                    <p>Mã chứng khoán</p>
                                                    <input type="text" defaultValue={adminState.stockCode} name="stockCode" ref={register({ required: true})}/>
                                                </div>
                                            </div>
                                            <div className="bs-col sm-50-15">
                                                <div className="input-item">
                                                    <p>Mã số doanh nghiệp</p>
                                                    <input type="text" defaultValue={adminState.businessCode} name="businessCode" ref={register({ required: true})}/>
                                                </div>
                                            </div>
                                            <div className="bs-col sm-50-15">
                                                <div className="input-item">
                                                    <p>Tổng số cổ đông</p>
                                                    <input type="text" defaultValue={adminState.totalShareholder} name="totalShareholder" ref={register({ required: true})}/>
                                                </div>
                                            </div>
                                            <div className="bs-col sm-50-15">
                                                <div className="input-item">
                                                    <p>Tổng số cổ phần</p>
                                                    <input type="text" defaultValue={adminState.totalShares} name="totalShares" ref={register({ required: true})}/>
                                                </div>
                                            </div>
                                            <div className="bs-col sm-25-15">
                                                <div className="input-item">
                                                    <p>Số điện thoại</p>
                                                    <input type="text" defaultValue={adminState.phone} name="phone" ref={register({ required: true})}/>
                                                </div>
                                            </div>
                                            <div className="bs-col sm-25-15">
                                                <div className="input-item">
                                                    <p>Fax</p>
                                                    <input type="text" defaultValue={adminState.fax} name="fax" ref={register({ required: true})}/>
                                                </div>
                                            </div>
                                            <div className="bs-col sm-70-15">
                                                <div className="bs-row row-sm-10">
                                                    <div className="bs-col md-25-10 sm-33-10">
                                                        <div className="input-item">
                                                            <p>Địa chỉ</p>  
                                                            <select className="diachi" name="province" onChange={addressFunction} value={city1} ref={register({ required: true})}>
                                                                <option>Tỉnh/thành</option>
                                                                {cityArr.map((item,index)=>{
                                                                    return (
                                                                    <option value={item}>{item}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="bs-col md-25-10 sm-33-10">
                                                        <div className="input-item">
                                                            <p className="hide">Fax</p>
                                                            <select className="diachi" name="district" onChange={addressFunction} value={dist1} ref={register({ required: true})}>
                                                                {dist1 !=="" ? <option>{dist1}</option> : <option>Quận/huyện</option> }        
                                                                {distArr.map((item,index)=>{
                                                                    return (
                                                                    <option value={item}>{item}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="bs-col md-25-10 sm-33-10">
                                                        <div className="input-item">
                                                            <p className="hide">Fax</p>
                                                            <select className="diachi" name="wards" onChange={addressFunction} value={town1} ref={register({ required: true})}>
                                                                {town1 !=="" ? <option>{town1}</option> : <option>Xã/phường</option> } 
                                                                {townArr.map((item,index)=>{
                                                                    return (
                                                                    <option value={item}>{item}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="bs-col md-25-10 sm-100-10">
                                                        <div className="input-item">
                                                            <p className="hide">Fax</p>
                                                            <input type="text" placeholder="Chi tiết" defaultValue={detail1} className="diachi" name="details" onChange={addressFunction} ref={register({ required: true})}/>
                                                        </div>
                                                    </div>
                                                    <div className="bs-col md-35-10 sm-50-10">
                                                        <div className="input-item">
                                                            <p>Thời gian họp</p>
                                                            <input className="time" type="text" defaultValue={adminState.timeMeeting.start} placeholder="Khai mạc" name="start" ref={register({ required: true})}/>
                                                        </div>
                                                    </div>
                                                    <div className="bs-col md-35-10 sm-50-10">
                                                        <div className="input-item">
                                                            <p className="hide">Fax</p>
                                                            <input className="time" type="text" defaultValue={adminState.timeMeeting.end} placeholder="Bế mạc" name="end" ref={register({ required: true})}/>
                                                        </div>
                                                    </div>
                                                    <div className="bs-col md-30-10 ">
                                                    
                                                    </div>
                                                    <div className="bs-col md-25-10 sm-33-10">
                                                        <div className="input-item">
                                                            <p>Địa điểm họp</p>  
                                                            <select className="hop" name="province" onChange={addressFunction} value={city2} ref={register({ required: true})}>
                                                                <option>Tỉnh/thành</option>
                                                                {cityArr.map((item,index)=>{
                                                                    return (
                                                                    <option value={item}>{item}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="bs-col md-25-10 sm-33-10">
                                                        <div className="input-item">
                                                            <p className="hide">Fax</p>
                                                            <select className="hop" name="district" onChange={addressFunction} value={dist2} ref={register({ required: true})}>
                                                                {dist2 !=="" ? <option>{dist2}</option> : <option>Quận/huyện</option> }        
                                                                {distArr.map((item,index)=>{
                                                                    return (
                                                                    <option value={item}>{item}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="bs-col md-25-10 sm-33-10">
                                                        <div className="input-item">
                                                            <p className="hide">Fax</p>
                                                            <select className="hop" name="wards" onChange={addressFunction} value={town2} ref={register({ required: true})}>
                                                                {town2 !=="" ? <option>{town2}</option> : <option>Xã/phường</option> }        
                                                                {townArr.map((item,index)=>{
                                                                    return (
                                                                    <option value={item}>{item}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="bs-col md-25-10 sm-100-10">
                                                        <div className="input-item">
                                                            <p className="hide">Fax</p>
                                                            <input type="text" placeholder="Chi tiết" defaultValue={detail2} className="hop" name="details" onChange={addressFunction} ref={register({ required: true})}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bs-col sm-30-15">
                                                <div className="input-item img">
                                                    <label>
                                                       {logo.file==="" ?   <div className="text">
                                                            <img src="./images/img-icon.png" alt=""/>
                                                            <p>Upload logo</p>
                                                        </div> : "" }
                                                      
                                                        <input type="file" onChange={loadImg} name="logo"/>
                                                    </label>
                                                    {logoPreview}
                                                </div>
                                            </div>
                                            <div className="bs-col sm-50-15">
                                                <div className="input-item">
                                                    <p>Tên cuộc họp</p>
                                                    <input type="text" defaultValue={adminState.nameMeeting} name="nameMeeting" ref={register({ required: true})}/>
                                                </div>
                                                <div className="input-item">
                                                    <p>Chương trình và nội dung</p>
                                                    <input type="text" defaultValue={adminState.content} name="content" ref={register({ required: true})}/>
                                                </div>
                                                <div className="input-item">
                                                    <p>Chủ tọa đại hội</p>
                                                    <input type="text" name="preside" defaultValue={adminState.preside} ref={register({ required: true})}/>
                                                </div>
                                                <div className="input-item">
                                                    <p>Thư kí đại hội</p>
                                                    <input type="text" defaultValue={adminState.secretary} name="secretary" ref={register({ required: true})}/>
                                                </div>
                                            </div>
                                            <div className="bs-col sm-50-15">
                                                <div className="input-item img banner">
                                                    <label>
                                                        {banner.file==="" ?    <div className="text">
                                                            <img src="./images/img-icon.png" alt=""/>
                                                            <p>Upload banner index</p>
                                                        </div> : ""}
                                                      
                                                        <input type="file" onChange={loadImg} name="banner"/>
                                                    </label>
                                                    {bannerPreview}
                                                </div>
                                                <button className="submit" type="submit">Lưu</button>
                                            </div>
                                        
                                        </div>
                                    </div>
                                </form>
                              
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}
const leftMenu = [ {
    path: "#",
    title: "Khai báo thông tin cơ bản"
},
{
    path: "#",
    title: "Khởi tạo tờ trình (Nội dung)"
},
{
    path: "#",
    title: "Khai báo đoàn chủ tịch"
},
{
    path: "#",
    title: "Khai báo ban kiểm phiếu"
},
{
    path: "#",
    title: "Khai báo thư ký"
},
{
    path: "#",
    title: "Khai báo ban kiểm tra tư cách CĐ"
},
{
    path: "#",
    title: "Khai báo ban quan hệ cổ đông"
},
{
    path: "#",
    title: "DS cổ đông đủ tư cách tham gia"
},
{
    path: "#",
    title: "Quản lý trạng thái cổ đông"
},
{
    path: "#",
    title: "Thời gian biểu quyết"
},
]
export default AdminPage;
import React, {useState, useEffect} from 'react';
import {setTccdToggle,getStatisticApi,getTableApi,getPageNumber,setFilter,getReport} from "./../../../states/duck/pages/tccdReducer/actions";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";
import { transformNumber,readNumber } from "./../../bases/configs"
import {signOut} from './../../../states/duck/pages/loginReducer/actions';


const TccdPage = () => {
    const toggleMenu = useSelector(state => state.tccdPage.toggleMenu);
    const dispatch = useDispatch();
 
    useEffect(() => {
        dispatch(getStatisticApi());
        dispatch(getReport())
    }, [dispatch]);
    const stat=useSelector(state => state.tccdPage.statistic);
    
    const print =useSelector(state => state.tccdPage.print);

    const pageNumber = useSelector(state => state.tccdPage.pageNumber);
    const total = useSelector(state => state.tccdPage.total);
    let tableList = useSelector(state => state.tccdPage.table);
    const filter = useSelector(state => state.tccdPage.filter);
    

    const getPage = (number) => {
        dispatch(getTableApi(number));
       
        dispatch(getPageNumber(number));
      }
    useEffect(() => {
        dispatch(getTableApi(pageNumber,""));
    }, []);
    
    const shareHolder = [ 
        {
            number: `${stat.percent}%`,
            title: "Tỷ lệ tham gia",
            img : "./images/checkin1.png",
            total:"Total shares",
            share:`${stat.totalShares}`,
            color : "#f436c4c9"
        },
        {
            number:`${stat.totalJoinedVotedOnline}`,
            title: "Cổ đông tham gia online",
            img : "./images/checkin1.png",
            total:"Total shares",
            share:`${stat.totalSharesJoinedVotedOnline}`,
            color : "#fd9500"
        },
        {
            number:`${stat.totalJoinedVotedLive}`,
            title: "Cổ đông tham gia trực tiếp",
            img : "./images/checkin2.png",
            total:"Total shares",
            share:`${stat.totalSharesJoinedVotedLive}`,
            color : "#00aef6"
        },
        {
            number:`${stat.totalJoinedVotedAuthority}`,
            title: "Cổ đông ủy quyền",
            img : "./images/checkin3.png",
            total:"Total shares",
            share:`${stat.totalSharesJoinedVotedAuthority}`,
            color : "#0cc567"
        }
        
        ]
    const signOutFn=()=>{
            localStorage.setItem('tccd-token', "");
            for (var item in localStorage){
                if(item!=='tccd-token' &&item!=='admin-token'){
                    localStorage.removeItem(item);
                }
            }
            dispatch(signOut());
        }
    const filterFunction =(e)=>{
        var target=e.target;
        dispatch(setFilter(target.value))
    }
    const setFilterFunction =()=>{
        if(filter!=="")
        {
            dispatch(getTableApi(1,filter));
        }else {
            dispatch(getTableApi(pageNumber,""));
        }
        
    }
    const printFunction =()=>{
       let w=window.open();
        w.document.write(document.getElementById('doc').innerHTML);
        w.print();
        w.close();
    }
    const downloadFunction =()=>{
        Export2Doc("document");
}
   
const Export2Doc=(filename = '')=>{
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+document.getElementById("doc").innerHTML+postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    filename = filename?filename+'.doc':'document.doc';
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
}
    
    
let listManager = useSelector(state => state.tccdPage.list);
let subList=[];

if(listManager !==[]) {
        for(var i=0 ; i< listManager.length ; i++ ){
            {
                for( var j=i+1;j<listManager.length;j++)
                {
                    if (listManager[i].isManager!==null && listManager[i].isManager===false && listManager[j].isManager===true){
                        
                        var temp =listManager[i];
                        listManager[i]=listManager[j];
                        listManager[j]=temp;
                    } 
                }
            }
         }
         subList=listManager;
}
 
const percent =localStorage.getItem("percent");
const totalSharesJoinedVoted =localStorage.getItem("totalSharesJoinedVoted");
const totalSharesJoinedVotedOnline =localStorage.getItem("totalSharesJoinedVotedOnline");
const totalJoinedVotedOnline =localStorage.getItem("totalJoinedVotedOnline");
const totalJoinedVotedAuthority =localStorage.getItem("totalJoinedVotedAuthority");
const totalSharesJoinedVotedAuthority =localStorage.getItem("totalSharesJoinedVotedAuthority");
const totalJoinedVotedLive =localStorage.getItem("totalJoinedVotedLive");
const totalSharesJoinedVotedLive =localStorage.getItem("totalSharesJoinedVotedLive");
const totalShareholder =localStorage.getItem("totalShareholder");
const totalShares =localStorage.getItem("totalShares");
const nameCompany =localStorage.getItem("nameCompany");
const preside =localStorage.getItem("preside");
const province =localStorage.getItem("province");
const businessCode =localStorage.getItem("businessCode");
const totalShareholderJoinedVoted =localStorage.getItem("totalShareholderJoinedVoted");
const time =localStorage.getItem("time");
const nWord = readNumber(Number(totalShares));
    return (
        <div className="">
            
            
            <div className="section-tccd">
                <div className="module module-admin">
                    <div className="layer-1">
                        <img src="./images/top-layer.png" alt=""/>
                    </div>
                    <div className="layer-2">
                        <img src="./images/bot-layer.png" alt=""/>
                    </div>
                    <div className={`${toggleMenu ? "left-side-on" : ""} left-side`}>
                        <div className="close-menu" >
                            <img src="./images/close-menu.png" alt="" onClick={()=>dispatch(setTccdToggle())} />
                        </div>
                        <img src="./images/h-logo.png" alt=""/>
                        <ul>
                            <li> <a href="/"><p>Xử lý checkin</p></a>  </li>
                            <li className="child-li"> <a href="/"><p>Thủ công</p></a>  </li>
                            <li className="child-li"> <a href="/"><p>QR code</p></a>  </li>
                            <li> <a href="/"><p>Quản lý checkin</p></a>  </li>
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
                                    <img src="./images/open-menu.png" alt="" onClick={()=>dispatch(setTccdToggle())}/>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="title">
                                    Quản lí checkin
                                </div>
                                <div className="cover-div">
                                    <div className="input">
                                            <div className="bs-row row-sm-5">
                                                {shareHolder.map((item,index)=>{
                                                    
                                                    
                                                    return (
                                                    <div className="bs-col sm-50-5  md-25-5">
                                                        <div className="th-item"  style={{ background: `${item.color}` }}>
                                                            <p>{item.title}</p>
                                                            <p className="digit">{item.number}</p>
                                                            <p>{item.total} <span>{transformNumber(item.share)}</span></p>
                                                            <img src={item.img} alt=""/>
                                                        </div>
                                                    </div>
                                                    )
                                                })}
                                              
                                            </div>
                                    </div>
                                    <div className="info-table">
                                        <div className="button">
                                            <div className="part1">
                                                <button className="report" onClick={printFunction} >In báo cáo</button>
                                  
                                                <button className="download" onClick={downloadFunction} >tải xuống báo cáo</button>
                                                
                                            </div>
                                            <div className="part2">
                                                <input type="text" className="filter-input" placeholder="Nhập tên/CMND/CCCD" onChange={filterFunction}/>
                                                <button className="filter" onClick={setFilterFunction}>Lọc</button>
                                            </div>
                                            
                                            
                                        </div>
                                        <div className="rate-table-wrap">
                                            <div className="rate-table">
                                                <table>
                                                    <thead>
                                                    <tr>
                                                        <td className="td-head">tên cổ đông</td>
                                                        <td className="td-head">cmnd/cccd</td>
                                                        <td className="td-head">hình thức tham gia</td>
                                                        <td className="td-head">loại cổ đông</td>
                                                        <td className="td-head">người xử lí checkin</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        {tableList.map((item,index)=>{

                                                            return (
                                                                <tr key={index}>
                                                                    <td><div className="tb-cell">{item.name} </div></td>
                                                                    <td><div className="tb-cell">{item.identityNumber} </div></td>
                                                                    <td><div className="tb-cell">{item.joinType} </div></td>
                                                                    <td><div className="tb-cell">{item.shareholderType} </div></td>
                                                                    <td><div className="tb-cell">{item.stockCode} </div></td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                               {total > 10 ? <Pagination activePage={pageNumber} totalItemsCount={total} pageRangeDisplayed={3} onChange={getPage}  /> : "" } 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 


            <section id="doc" style={{fontFamily: 'times-new-roman',display:'none'}}>
    <div>
  <table style={{width: '100%'}} data-tablestyle="MsoNormalTable" data-tablelook={480}>
    <tbody>
      <tr>
        <td data-celllook={0}>
    <p style={{textAlign: 'center'}}><strong><span data-contrast="auto" style={{textTransform:"uppercase"}}>Tổng công ty cp bảo hiểm petrolimex</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:2,&quot;335551620&quot;:2,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240}"> </span></p>
          <p style={{textAlign: 'center'}}><strong><span data-contrast="auto">MS: 0100979011</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:2,&quot;335551620&quot;:2,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240}"> </span></p>
          <p style={{textAlign: 'center'}}><strong><span data-contrast="auto">---o0o---</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:2,&quot;335551620&quot;:2,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240}"> </span></p>
          <p style={{textAlign: 'center'}}><em><span data-contrast="auto">Số</span></em><em><span data-contrast="auto">:  01/</span></em><em><span data-contrast="auto">2017</span></em><em><span data-contrast="auto">- BBKTTC/BVG</span></em><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:2,&quot;335551620&quot;:2,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240}"> </span></p>
        </td>
        <td data-celllook={0}>
          <p style={{textAlign: 'center'}}><strong><span data-contrast="auto">       CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:3,&quot;335551620&quot;:3,&quot;335559685&quot;:235,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240}"> </span></p>
          <p style={{textAlign: 'center'}}><strong><span data-contrast="auto">              Độc lập - Tự do - Hạnh phúc</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559685&quot;:943,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240,&quot;469777462&quot;:[943],&quot;469777927&quot;:[0],&quot;469777928&quot;:[1]}"> </span></p>
          <p style={{textAlign: 'center'}}><strong><span data-contrast="auto">          -----o0o-----</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559685&quot;:943,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240,&quot;469777462&quot;:[943],&quot;469777927&quot;:[0],&quot;469777928&quot;:[1]}"> </span></p>
    <p style={{textAlign: 'center'}}><em><span data-contrast="auto">             {province}</span></em><em><span data-contrast="auto">, {time.slice(6)}</span></em><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:3,&quot;335551620&quot;:3,&quot;335559738&quot;:240,&quot;335559739&quot;:120,&quot;335559740&quot;:240,&quot;469777462&quot;:[802],&quot;469777927&quot;:[0],&quot;469777928&quot;:[1]}"> </span></p>
        </td>
      </tr>
    </tbody>
  </table>
    <p style={{textAlign: 'center'}}><strong><span data-contrast="auto">BIÊN BẢN KIỂM TRA TƯ CÁCH CỔ ĐÔNG ĐẠI HỘI ĐỒNG CỔ ĐÔNG THƯỜNG NIÊN 2017 </span></strong><strong><span data-contrast="auto" style={{textTransform:"uppercase"}}>{nameCompany} </span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:2,&quot;335551620&quot;:2,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:360}"> </span></p>
  <p><span data-contrast="auto">Ban kiểm tra tư cách cổ đông tham dự Đại hội đồng cổ đông thường niên năm 2017 của {nameCompany} được Ban tổ chức Đại hội đề cử gồm:</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:6,&quot;335551620&quot;:6,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240}"> </span></p>
  <ol>
    {subList.map((item,index)=>{
        return (
            <li style={{marginBottom: '5px'}}><span data-contrast="auto">Ông/bà : {item.name} - {item.isManager ? "Trưởng ban" : "Ủy viên"} </span></li>
        )
    })}
  </ol>
  
  <p><span data-contrast="auto">Ban Kiểm tra tư cách cổ đông đã thực hiện kiểm tra tư cách cổ đông tham dự Đại hội đồng cổ đông thường niên năm 2017 tại địa điểm tổ chức họp.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:6,&quot;335551620&quot;:6,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240,&quot;469777462&quot;:[8640],&quot;469777927&quot;:[1],&quot;469777928&quot;:[4]}"> </span></p>
  <p><strong><span data-contrast="auto">Kết quả kiểm tra tư cách cổ đông như sau:</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:6,&quot;335551620&quot;:6,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240,&quot;469777462&quot;:[8640],&quot;469777927&quot;:[1],&quot;469777928&quot;:[4]}"> </span></p>
    <p><strong><span data-contrast="auto">1.</span></strong><strong><span data-contrast="auto">Tổng số cổ đông của Công ty </span></strong><strong><em><span data-contrast="auto">(theo danh sách tại ngày chốt </span></em></strong><strong><em><span data-contrast="auto">……………….</span></em></strong><strong><em><span data-contrast="auto">):</span></em></strong><strong><em><span data-contrast="auto"> </span></em></strong><strong><em><span data-contrast="auto">{totalShareholder}</span></em></strong><strong><em><span data-contrast="auto"> </span></em></strong><strong><em><span data-contrast="auto">cổ đông</span></em></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:6,&quot;335551620&quot;:6,&quot;335559685&quot;:426,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240,&quot;335559991&quot;:426,&quot;469777462&quot;:[426,8640],&quot;469777927&quot;:[0,1],&quot;469777928&quot;:[1,4]}"> </span></p>
  <ul>
    <li data-leveltext="" data-font="Symbol" data-listid={9} data-aria-posinset={1} data-aria-level={1}><span data-contrast="auto">Tổng số cổ phần sở hữu</span><em><span data-contrast="auto">: </span></em><span data-contrast="auto">{transformNumber(totalShares)}</span><em><span data-contrast="auto"> ({nWord})</span></em><em><span data-contrast="auto"> </span></em><span data-contrast="auto">cổ phần.</span><span data-ccp-props="{&quot;134233117&quot;:true,&quot;134233118&quot;:true,&quot;201341983&quot;:0,&quot;335559739&quot;:200,&quot;335559740&quot;:240}"> </span></li>
    <li data-leveltext="" data-font="Symbol" data-listid={9} data-aria-posinset={2} data-aria-level={1}><span data-contrast="auto"> Tổng số phiếu biểu quyết: </span><span data-contrast="auto">{transformNumber(totalShares)}</span><em><span data-contrast="auto"> ({nWord})</span></em><em><span data-contrast="auto"> </span></em><span data-contrast="auto">phiếu biểu quyết.</span><span data-ccp-props="{&quot;134233117&quot;:true,&quot;134233118&quot;:true,&quot;201341983&quot;:0,&quot;335559739&quot;:200,&quot;335559740&quot;:240}"> </span></li>
  </ul>
    <p><strong><span data-contrast="auto">2.</span></strong><strong><span data-contrast="auto">Tổng số cổ đông tham dự Đại hội </span></strong><strong><em><span data-contrast="auto">(trực tiếp hoặc thông qua người được ủy quyền</span></em></strong><strong><em><span data-contrast="auto"> </span></em></strong><strong><em><span data-contrast="auto">hoặc online</span></em></strong><strong><em><span data-contrast="auto">)</span></em></strong><strong><span data-contrast="auto"> </span></strong><strong><span data-contrast="none">{totalShareholderJoinedVoted}</span></strong><strong><span data-contrast="auto"> cổ đông</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:6,&quot;335551620&quot;:6,&quot;335559685&quot;:426,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240,&quot;335559991&quot;:426,&quot;469777462&quot;:[426,8640],&quot;469777927&quot;:[0,1],&quot;469777928&quot;:[1,4]}"> </span></p>
    <p><span data-contrast="auto">    </span><span data-contrast="auto">Tổng số cổ phần sở hữu: </span><strong><span data-contrast="none">{totalSharesJoinedVoted}</span></strong><strong><span data-contrast="auto"> </span></strong><span data-contrast="auto">cổ phần</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:6,&quot;335551620&quot;:6,&quot;335559685&quot;:426,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240,&quot;335559991&quot;:426,&quot;469777462&quot;:[426,8640],&quot;469777927&quot;:[0,1],&quot;469777928&quot;:[1,4]}"> </span></p>
  <p><span data-contrast="auto">Tổng số phiếu biểu quyết dự họp : </span><strong><span data-contrast="none">{totalSharesJoinedVoted}</span></strong><span data-contrast="auto"> phiếu biểu quyết.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559685&quot;:426,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240,&quot;469777462&quot;:[851],&quot;469777927&quot;:[0],&quot;469777928&quot;:[1]}"> </span></p>
  <p><em><span data-contrast="auto">Trong đó :</span></em><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:6,&quot;335551620&quot;:6,&quot;335559685&quot;:426,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240,&quot;335559991&quot;:426,&quot;469777462&quot;:[426,8640],&quot;469777927&quot;:[0,1],&quot;469777928&quot;:[1,4]}"> </span></p>
    <p><span data-contrast="auto">Cổ đông trực tiếp tham dự: {totalJoinedVotedLive} người, sở hữu: </span><strong><span data-contrast="none">{totalSharesJoinedVotedLive}</span></strong><span data-contrast="none"> </span><span data-contrast="auto">cổ phần.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559685&quot;:426,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240,&quot;469777462&quot;:[851],&quot;469777927&quot;:[0],&quot;469777928&quot;:[1]}"> </span></p>
    <p><span data-contrast="auto">Cổ đông tham dự thông qua người được ủy quyền:</span><span data-contrast="none">{totalJoinedVotedAuthority}</span><span data-contrast="auto"> người, sở hữu : </span><strong><span data-contrast="none">{totalSharesJoinedVotedAuthority}</span></strong><span data-contrast="none"> </span><span data-contrast="auto">cổ phần.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559685&quot;:426,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240,&quot;469777462&quot;:[851],&quot;469777927&quot;:[0],&quot;469777928&quot;:[1]}"> </span></p>
    <p><span data-contrast="auto">Cổ đông tham gia online: </span><span data-contrast="auto">{totalJoinedVotedOnline}</span><span data-contrast="auto"> người, sở hữu: </span><span data-contrast="auto">{totalSharesJoinedVotedOnline}</span><span data-contrast="auto"> Cổ phần</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559685&quot;:426,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240,&quot;469777462&quot;:[851],&quot;469777927&quot;:[0],&quot;469777928&quot;:[1]}"> </span></p>
    <p><span data-contrast="auto">Như vậy tổng số cổ phần của các cổ đông tham dự Đại hội là </span><strong><span data-contrast="none">{totalSharesJoinedVoted}</span></strong><strong><span data-contrast="auto"> </span></strong><span data-contrast="auto">cổ phần, chiếm </span><strong><span data-contrast="none">{percent.slice(0,5)}%</span></strong><span data-contrast="auto"> tổng số cổ phần có quyền biểu quyết của Công ty và số phiếu biểu quyết của các cổ đông dự họp chiếm </span><strong><span data-contrast="none">{percent.slice(0,5)}%</span></strong><strong><span data-contrast="auto"> </span></strong><span data-contrast="auto"> tổng</span><span data-contrast="auto"> số phiếu biểu quyết của Công ty. Sau khi kiểm tra </span><strong><span data-contrast="none">{totalShareholderJoinedVoted}</span></strong><strong><span data-contrast="auto"> </span></strong><span data-contrast="auto">cổ đông đều đủ tư cách tham </span><span data-contrast="auto">dự </span><span data-contrast="auto"> </span><span data-contrast="auto">Đại</span><span data-contrast="auto"> hội theo quy định.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:6,&quot;335551620&quot;:6,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:360,&quot;469777462&quot;:[8640],&quot;469777927&quot;:[1],&quot;469777928&quot;:[4]}"> </span></p>
  <p><span data-contrast="auto">Theo quy định tại Luật Doanh nghiệp và Điều lệ tổ chức và hoạt động của Công ty, Đại hội đã đáp ứng đủ điều kiện để tiến hành.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:6,&quot;335551620&quot;:6,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240,&quot;469777462&quot;:[8640],&quot;469777927&quot;:[1],&quot;469777928&quot;:[4]}"> </span></p>
  <p><span data-contrast="auto">Đính kèm là Danh sách cổ đông tham dự cuộc họp Đại hội đồng cổ đông.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240}"> </span></p>
    <p><span data-contrast="auto">Biên bản này được lập hồi </span><span data-contrast="auto">{time}</span><span data-contrast="auto">.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:6,&quot;335551620&quot;:6,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240}"> </span></p>
  <p style={{textAlign: 'right'}}><strong><span data-contrast="auto">T/M. BAN KIỂM TRA TƯ CÁCH CỔ ĐÔNG</span></strong><strong><span data-contrast="auto"> </span></strong></p>
  <p style={{textAlign: 'right',marginRight:"100px"}}><strong><span data-contrast="auto">TRƯỞNG BAN                       </span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:2,&quot;335551620&quot;:2,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240}"> </span></p>
  <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:2,&quot;335551620&quot;:2,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240}"> </span></p>
  <p style={{textAlign: 'right',marginRight:"100px"}}><span data-contrast="auto">         </span><span data-contrast="auto">                                                </span><strong><span data-contrast="auto">{preside}                       </span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335551550&quot;:2,&quot;335551620&quot;:2,&quot;335559738&quot;:120,&quot;335559739&quot;:120,&quot;335559740&quot;:240}"> </span></p>
</div>


            </section>                             
           
        </div>
         
       
    );
}

export default TccdPage;


import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getContent} from '../../../states/duck/pages/contentReducer/actions';
const Content= () => {
    const dispatch = useDispatch();
   
    const Content = useSelector(state => state.contentPage);
    const idCont = localStorage.getItem("idCont");
    useEffect(() => {
       dispatch(getContent(idCont))
    }, [])
    
    return (
        <div>
        <section className="section-assignment">
                <div className="module module-assignment">
                    <div className="module-header">
                        <h1>{Content.contName}</h1>
                    </div>
                    <div className="module-content">
                        <p className="text-area">
                            {Content.contDes}
                        </p>                      
                    </div>
                </div>
        </section>
  
        </div>
    );
}

export default Content;


import React from 'react';
import {Link} from 'react-router-dom'

const RelativeLink = ({title}) =>  {
    return(
        <div className="realtive-link">
            <ul className="relative-list">
                <li className="relative-list__item">
                    <Link className="relative-item__link" to="/">Trang chủ</Link>
                </li>
                <li className="relative-list__item">{title}</li>
            </ul>
        </div>
    )
}
 export default RelativeLink;
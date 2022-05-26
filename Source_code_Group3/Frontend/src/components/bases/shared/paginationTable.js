import React, {Fragment} from "react";

const PaginationTable = ({ total, pageSize, pageNumber, getPage }) => {
  const paginationList =
    total % pageSize > 0
      ? Math.floor(total / pageSize) + 1
      : Math.floor(total / pageSize);
  return (
    <div className="pagination">
    <ul className="pagination-list">
     {
      paginationList > 1 ? <Fragment>
      {
          pageNumber > 1 ? <li className="pagination-list__item" onClick={() => getPage(pageNumber - 1)}>&#60;</li> :   <li className="pagination-list__item disable">&#60;</li>
      }
    
            {renderPagination(paginationList, pageNumber, getPage)}
            {
          pageNumber < paginationList ? <li className="pagination-list__item" onClick={() => getPage(pageNumber + 1)}>&#62;</li> :   <li className="pagination-list__item disable">&#62;</li>
      }
        </Fragment> : ""}
      </ul> 
    
      
    </div>
  );
};
export default PaginationTable;

const renderPagination = (paginationList, pageNumber, getPage) => {
  var paginationHtml = [];
  for (let i = 1; i <= paginationList; i++) {
    paginationHtml.push(
      <li className={`pagination-list__item ${pageNumber === i ? "active" : ""}`} key={i} onClick={() => getPage(i)}>
        {i}
      </li>
    );
  }
  return paginationHtml;
};

import React, { useState, useEffect } from "react";


const ShowTab = (tabItems, keyword) => {
  var html = null;
  const tabItemsClone = [...tabItems];
  if (tabItems.length > 0) {
    const tabItemClone = tabItemsClone.find(item => {
      return item.label === keyword;
    });
    html = tabItemClone.main;
  }
  return html();
};
const BsTab = props => {
  const tabItemArr = [];
  var isActive = 0;
  for (var index in props) {
    tabItemArr.push(props[index]);
    if (props[index].isActive) {
      isActive = index;
    }
  }
  const [tabDefault, setTabDefault] = useState(tabItemArr[isActive].label);
  useEffect(() => {
    for (var index in props) {
      tabItemArr.push(props[index]);
      if (props[index].isActive) {
        isActive = index;
      }
    }
    setTabDefault(tabItemArr[isActive].label);
  }, [props]);
  return (
    <div className="bs-tab">
      <div className="tab-container">
        <div className="tab-control">
          <ul className="control-list">
            {tabItemArr.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`control-list__item ${
                    tabDefault === item.label ? "active" : ""
                  }`}
                  onClick={() => {
                    setTabDefault(item.label);
                  }}
                >
                    {item.head()}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="tab-content">{ShowTab(tabItemArr, tabDefault)}</div>
      </div>
    </div>
  );
};
export default BsTab;

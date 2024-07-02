import React from 'react';

function TestListEdit({ measureListItems }) {
  return (
    <div className="test-items-div">
      {measureListItems.map((item) => (
        <div key={item.id} className="test-items-body-each-div">
          <div className="test-items-body-each-text">{item.testItem}</div>
          <div className="test-items-body-each-text">{item.USL}</div>
          <div className="test-items-body-each-text">{item.CL}</div>
          <div className="test-items-body-each-text">{item.LSL}</div>
          <div className="test-items-body-each-text">{item.Unit}</div>
          <div className="test-items-body-each-text">
            <button className="btn btn-info" >編輯</button>
            <button className="btn btn-danger" >刪除</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TestListEdit;

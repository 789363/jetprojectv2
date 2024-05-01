import React from 'react';

function TestItems({ measureListItems, handleTestItemEdit, handleTestDelete }) {
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
            <button className="btn btn-info" onClick={() => handleTestItemEdit(item)}>編輯</button>
            <button className="btn btn-danger" onClick={() => handleTestDelete(item.id)}>刪除</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TestItems;

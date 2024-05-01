import React from 'react';

const TestItems = ({ measureListItems, handleTestItemEdit, handleTestDelete }) => {
  return (
    <>
    <div style={{ display: "flex", alignItems: "center" }}>
      <h4 style={{ marginRight: "10px" }}>Edit OQC CheckLists</h4>

    </div>

    <div className="test-items-div">
      
      <div style={{ height: '5vh' }}>
        <div className="test-items-title-div">
          <div className="test-items-title-text">TestItem</div>
          <div className="test-items-title-text">USL</div>
          <div className="test-items-title-text">CL</div>
          <div className="test-items-title-text">LSL</div>
          <div className="test-items-title-text">Unit</div>
          <div className="test-items-title-text">Action</div>
        </div>
      </div>
      <div className="test-items-body-div">
        {measureListItems.map((item) => (
          <div key={item.id} className="test-items-body-each-div">
            <div className="test-items-body-each-text">{item.testItem}</div>
            <div className="test-items-body-each-text">{item.USL}</div>
            <div className="test-items-body-each-text">{item.CL}</div>
            <div className="test-items-body-each-text">{item.LSL}</div>
            <div className="test-items-body-each-text">{item.Unit}</div>
            <div className="test-items-body-each-text">
              <button
                className="btn btn-info"
                style={{
                  backgroundColor: '#30B16C',
                  border: '0px',
                  borderRadius: '10px',
                  width: '10vh',
                  boxShadow: '0px 2px 2px #ccc',
                  fontSize: '16px',
                  marginRight: '10px',
                }}
                onClick={() => handleTestItemEdit(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-info"
                style={{
                  backgroundColor: '#FB5144',
                  border: '0px',
                  borderRadius: '10px',
                  width: '10vh',
                  boxShadow: '0px 2px 2px #ccc',
                  fontSize: '16px',
                  marginRight: '5px',
                }}
                onClick={() => handleTestDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default TestItems;

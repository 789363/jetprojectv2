import React, { useState, useEffect } from 'react';

const TestItems = () => {
  const [measureListItems, setMeasureListItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/items'); // 假設這是你的API端點
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      const formattedItems = formatItems(data); // 將取得的資料格式化
      setMeasureListItems(formattedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const formatItems = (items) => {
    console.log(items)
    // 將從 API 取得的項目資料轉換成指定格式
    return items.map((item, index) => ({
      id: index + 1,
      testItem: item.item_name,
      USL: item.USL,
      CL: item.CL,
      LSL: item.LSL,
      Unit: item.unit,
      measureResult: "",
      measureResultIsPass: "",
    }));
  };

  const handleTestItemEdit = async (item) => {
    try {
      const response = await fetch(`http://localhost:3000/api/items/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      });
      if (!response.ok) {
        throw new Error('Failed to update item');
      }
      fetchItems(); // 重新获取列表以更新UI
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleTestDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/items/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      fetchItems(); // 删除后更新列表
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h4 style={{ marginRight: "10px" }}>Edit OQC CheckLists</h4>
        <button
          type="button"
          className="btn btn-info"
          style={{
            backgroundColor: "#F3934D",
            border: "0px",
            borderRadius: "10px",
            boxShadow: "0px 2px 2px #ccc",
            fontSize: "16px",
            height: "40px",
            marginBottom:"10px"
          }}
        >
          Add CheckListItem
        </button>
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
                    width: '80px', // 調整寬度
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
                    width: '80px', // 調整寬度
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

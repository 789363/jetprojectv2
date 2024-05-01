import React, { useState, useEffect } from 'react';

const TestItems = ({ selectModel }) => {
 
  const [measureListItems, setMeasureListItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // 存储正在编辑的条目

  useEffect(() => {
  
    fetchItems();
  }, [selectModel]);

  const fetchItems = async () => {
    
    try {
      const response = await fetch(`http://localhost:3000/api/items/${selectModel}`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      const formattedItems = formatItems(data);
      setMeasureListItems(formattedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const formatItems = (items) => {
    return items.map((item) => ({
      id: item.item_id,
      testItem: item.item_name,
      USL: item.USL,
      CL: item.CL,
      LSL: item.LSL,
      Unit: item.unit,
      measureResult: "",
      measureResultIsPass: "",
    }));
  };

  const handleEditClick = (item) => {
    setEditingItem({ ...item });
  };

  const handleInputChange = (e, field) => {
    setEditingItem(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    if (!editingItem) return;
    try {
      const updateData = {
        item_name: editingItem.testItem, // 只更新item_name
        unit: editingItem.Unit,          // 只更新unit
        module_id:selectModel ,
      }

      const response = await fetch(`http://localhost:3000/api/items/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });
      if (!response.ok) {
        throw new Error('Failed to update item');
      }
      setEditingItem(null);
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

  const handleAddCheckListItem = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          module_id:selectModel ,
          item_name: 'New CheckListItem',
          USL: 10,
          CL: 5,
          LSL: 0,
          unit: 'mm',
        })
      });
      if (!response.ok) {
        throw new Error('Failed to add check list item');
      }
      fetchItems(); // 新增后重新获取列表以更新UI
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
          onClick={handleAddCheckListItem}
        >
          Add CheckListItem
        </button>
      </div>

      <div className="test-items-div">
        {measureListItems.map((item) => (
          <div key={item.id} className="test-items-body-each-div">
            {editingItem && editingItem.id === item.id ? (
              <>
                <input value={editingItem.testItem} onChange={(e) => handleInputChange(e, 'testItem')} />
                <input value={editingItem.USL} onChange={(e) => handleInputChange(e, 'USL')} />
                <input value={editingItem.CL} onChange={(e) => handleInputChange(e, 'CL')} />
                <input value={editingItem.LSL} onChange={(e) => handleInputChange(e, 'LSL')} />
                <input value={editingItem.Unit} onChange={(e) => handleInputChange(e, 'Unit')} />
                <button onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <div>{item.testItem}</div>
                <div>{item.USL}</div>
                <div>{item.CL}</div>
                <div>{item.LSL}</div>
                <div>{item.Unit}</div>
                <button onClick={() => handleEditClick(item)}>Edit</button>
                <button onClick={() => handleTestDelete(item.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TestItems;

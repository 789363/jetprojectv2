import React, { useState, useEffect } from "react";
import "../../style/set.scss";
import AddCheckListItemModal from './CheckListEdit/AddCheckListItemModal';
import EditCheckListItemModal from './CheckListEdit/EditCheckListItemModal';

const SetModelPage = (props) => {
  const {
    selectModel,
    who,
    createNewModelVersion,
    modelListsItems,
    setModelListsItems,
  } = props;
  console.log(props)
  
  const [checkLists, setCheckLists] = useState([]);
  const [opIds, setOpIds] = useState([]); // 新状态用于存储OPID列表
  
// Fetch test items based on the modelId
useEffect(() => {
  const fetchTestItems = async () => {
    // 檢查 selectModel 是否存在且包含 modelId
    if (selectModel) {
      try {
        const response = await fetch(`http://localhost:3000/api/checkitems/${selectModel}`);
        const data = await response.json();
        // 轉換每個條目的理由為對象格式
        const formattedData = data.map(item => ({
          ...item,
          reasons: item.reasons.map((reason, index) => ({ id: index, description: reason }))
        }));
        setCheckLists(formattedData);
      } catch (error) {
        setCheckLists([])
        console.error("Failed to fetch test items:", error);
      }
    }
  };

  fetchTestItems();
}, [selectModel]);

  const [editItem, setEditItem] = useState({
    id: 0,
    text: "",
    status: "NA",
    reasons: [],
    selectedReason: "NA",
    disabledReason: true,
    checked: false,
    isNew: false,
  });

  // 單獨測項修改
  const [showModal, setShowModal] = useState(false);

  // 新增檢查項目
  const handleAddCheckItem = () => {
    const newItem = {
      id: checkLists.length + 1,
      text: "",
      status: "NA",
      reasons: [],
      selectedReason: "NA",
      disabledReason: true,
      checked: false,
      isNew: true,
    };
    setEditItem(newItem);
    setShowModal(true);
  };

  // 編輯的彈跳視窗
  const handleEdit = (item) => {
    setEditItem({ ...item, isNew: false });
    setShowModal(true);
  };

// 刪除檢查項目
const handleDelete = async (itemId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/checkitems/${itemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete check item with status: ${response.status}`);
    }

    // 更新狀態以移除客户端列表中的項目
    setCheckLists(prevCheckLists => prevCheckLists.filter(item => item.id !== itemId));
    alert('Item deleted successfully');
  } catch (error) {
    console.error('Failed to delete check item:', error);
    alert('Error deleting check item: ' + error.message);
  }
};


  const handleReasonChange = (e) => {
    setEditItem({ ...editItem, selectedReason: e.target.value });
  };

  const handleAddReason = async () => {
    const newReasonDescription = prompt("Enter new reason:");
    if (newReasonDescription && editItem.id) {
        try {
            const response = await fetch(`http://localhost:3000/api/reasons`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: newReasonDescription,
                    checkitem_id: editItem.id
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to add reason: ${response.statusText}`);
            }

            const newReason = await response.json();
            setCheckLists(prevCheckLists =>
                prevCheckLists.map(item =>
                    item.id === editItem.id
                    ? { ...item, reasons: [...item.reasons, { id: newReason.reason_id, description: newReason.description }] }
                    : item
                )
            );
            alert('Reason added successfully');
        } catch (error) {
            console.error('Error adding reason:', error);
            alert(`Failed to add reason: ${error.message}`);
        }
    }
}
  const fetchCheckItems = async () => {
    if (selectModel) {
      try {
        const response = await fetch(`http://localhost:3000/api/checkitems/${selectModel}`);
        const data = await response.json();
        const formattedData = data.map(item => ({
          ...item,
          reasons: item.reasons.map((reason, index) => ({ id: index, description: reason }))
        }));
        setCheckLists(formattedData);
      } catch (error) {
        console.error("Failed to fetch check items:", error);
      }
    }
  };
  
  useEffect(() => {
    fetchCheckItems();
  }, [selectModel]);

const handleStatusChange = (e, itemId) => {
  const newStatus = e.target.value;
  // 更新清单项状态
  setCheckLists(prevCheckLists =>
    prevCheckLists.map(item =>
      item.id === itemId ? { ...item, status: newStatus } : item
    )
  );
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
        }}
        onClick={handleAddCheckItem}
      >
        Add CheckListItem
      </button>
    </div>
    <div className="model-checklist-div">
      {checkLists.map((item) => (
        <div key={item.id} className="model-checklist-body-each-div">
          <div className="model-checklist-body-each-text-div">
            {item.id}. {item.text}
          </div>
          <div style={{ width: "15%", display: "flex", justifyContent: "center" }}>
            <select style={{ borderRadius: "5px", marginRight: "10px" }} value={item.status} onChange={(e) => handleStatusChange(e, item.id)}>
              <option value="NA">NA</option>
              <option value="PASS">PASS</option>
              <option value="FAIL">FAIL</option>
            </select>
            <select style={{ borderRadius: "5px", marginRight: "10px" }} value={item.selectedReason} onChange={(e) => handleReasonChange(e, item.id)}>
              {item.status === "FAIL" ? item.reasons.map((reason, index) => (<option key={index} value={reason.id}>{reason.description}</option>)) : <option value="NA">NA</option>}
            </select>
            <button className="btn btn-info" style={{ backgroundColor: "#30B16C", border: "0px", borderRadius: "10px", width: "10vh", boxShadow: "0px 2px 2px #ccc", fontSize: "16px", marginRight: "10px" }} onClick={() => handleEdit(item)}>Edit</button>
            <button className="btn btn-info" style={{ backgroundColor: "#FB5144", border: "0px", borderRadius: "10px", width: "10vh", boxShadow: "0px 2px 2px #ccc", fontSize: "16px", marginRight: "5px" }} onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
          <hr className="hr-style" />
          
        </div>
      ))}
    
    </div>
        <AddCheckListItemModal
      showModal={showModal && editItem.isNew}
      setShowModal={setShowModal}
      editItem={editItem}
      setEditItem={setEditItem}
      selectModel={selectModel}
      onRefresh={fetchCheckItems} // 传递刷新函数
    />
    <EditCheckListItemModal
      showModal={showModal && !editItem.isNew}
      setShowModal={setShowModal}
      handleAddReason={handleAddReason}
      editItem={editItem}
      setEditItem={setEditItem}
      onRefresh={fetchCheckItems} // 传递刷新函数
    />
  </>
);
};

export default SetModelPage;

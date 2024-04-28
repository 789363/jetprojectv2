import React, { useState, useEffect } from "react";
import "../style/set.scss";

const SetModelPage = (pros) => {
  const {
    selectModel,
    who,
    createNewModelVersion,
    modelListsItems,
    setModelListsItems,
  } = pros;
  console.log(pros)
  const [checkLists, setCheckLists] = useState([]);

  // Fetch test items based on the modelId
  useEffect(() => {
    const fetchTestItems = async () => {
      if (selectModel && selectModel.modelId) {
        try {
          const response = await fetch(`http://localhost:3000/api/checkitems/${selectModel.modelId}`);
          const data = await response.json();
          // 轉換每個條目的理由為對象格式
          const formattedData = data.map(item => ({
            ...item,
            reasons: item.reasons.map((reason, index) => ({ id: index, description: reason }))
          }));
          setCheckLists(formattedData);
        } catch (error) {
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

  // 可編輯的OPID，預設是看不到的，要按使用者按鈕才可以看到
  const [showEditOPID, setEditOPID] = useState(false);

  const [canEditOPID, setCanEditOPID] = useState([]);
  useEffect(() => {
    // GETselectModel的checkLists
    // GETselectModel的canEditOPID
  }, []);

  useEffect(() => {
    who === "manage" ? setEditOPID(true) : setEditOPID(false);
  }, [who]);

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

  // 刪除可編輯的OPID
  const removeOPID = (opidToRemove) => {
    const updatedOPIDs = canEditOPID.filter((opid) => opid !== opidToRemove);

    setCanEditOPID(updatedOPIDs);
  };

  // 新增可編輯的OPID
  const addOPID = () => {
    const newOPID = prompt("Add OPID:");
    // 如果newOPID有值，而且長度是6，而且canEditOPID裡面沒有newOPID，01就新增canEditOPID
    if (newOPID && newOPID.length === 6 && !canEditOPID.includes(newOPID)) {
      setCanEditOPID([...canEditOPID, newOPID]);
    } else {
      alert("Invalid OPID!");
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
        setEditItem(prev => ({
          ...prev,
          reasons: [...prev.reasons, { id: newReason.reason_id, description: newReason.description }]
        }));
        alert('Reason added successfully');
      } catch (error) {
        console.error('Error adding reason:', error);
        alert(`Failed to add reason: ${error.message}`);
      }
    }
  };
  const saveChanges = async () => {
    try {
        const method = editItem.isNew ? 'POST' : 'PUT';
        const url = `http://localhost:3000/api/checkitems/${editItem.isNew ? '' : editItem.id}`;
        const bodyData = {
            description: editItem.text,  // 'description' 對應後端的字段名
            status: editItem.status,  // 確認後端是否有這個字段，如果沒有，需要適當調整
            reasons: editItem.reasons.join(','),  // 如果後端接收的是字符串，需要進行轉換
            selectedReason: editItem.selectedReason,
            module_id: editItem.isNew ? selectModel.modelId : undefined
        };

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        setCheckLists(prevCheckLists => {
            if (editItem.isNew) {
                return [...prevCheckLists, { ...result, id: result.checkitem_id, text: result.description }];
            } else {
                return prevCheckLists.map(item => item.id === editItem.id ? { ...item, ...result, text: result.description } : item);
            }
        });

        setShowModal(false);
        alert('更改已成功保存！');
    } catch (error) {
        console.error('保存检查项目失败:', error);
        alert('保存检查项目时出错：' + error.message);
    }
};

const handleRemoveReason = async (reasonId) => {
  console.log(reasonId)
  console.log(123)
  try {
      // 确保 reasonId 是一个数字或字符串类型的 ID，而不是一个对象
      const response = await fetch(`http://localhost:3000/api/reasons/${reasonId}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
          throw new Error('Failed to delete reason');
      }

      // 更新状态以移除客户端列表中的项
      setEditItem(prev => ({
          ...prev,
          reasons: prev.reasons.filter(r => r.id !== reasonId) // 假设每个理由对象都有一个 id 属性
      }));
      alert('Reason deleted successfully');
  } catch (error) {
      console.error('Error deleting reason:', error);
      alert('Failed to delete reason: ' + error.message);
  }
};

  
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h4 style={{ marginRight: "10px" }}>Edit OQC CheckLists</h4>
        <button
          type="button"
          class="btn btn-info"
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
            <div
              style={{
                width: "15%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <select
                style={{ borderRadius: "5px", marginRight: "10px" }}
                value={item.status}
                onChange={(e) =>
                  setCheckLists(
                    checkLists.map((checkItem) =>
                      checkItem.id === item.id
                        ? { ...checkItem, status: e.target.value }
                        : checkItem
                    )
                  )
                }
              >
                <option value="NA">NA</option>
                <option value="PASS">PASS</option>
                <option value="FAIL">FAIL</option>
              </select>
              <select
                style={{ borderRadius: "5px", marginRight: "10px" }}
                value={item.selectedReason}
                onChange={(e) =>
                  setCheckLists(
                    checkLists.map((checkItem) =>
                      checkItem.id === item.id
                        ? {
                            ...checkItem,
                            selectedReason: e.target.value,
                          }
                        : checkItem
                    )
                  )
                }
              >
                {item.status === "FAIL" ? (
                  item.reasons.map((reason, index) => (
                    <option key={index} value={reason}>
                      {reason}
                    </option>
                  ))
                ) : (
                  <option value="NA">NA</option>
                )}
              </select>
            </div>
            <div
              style={{
                width: "15%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                class="btn btn-info"
                style={{
                  backgroundColor: "#30B16C",
                  border: "0px",
                  borderRadius: "10px",
                  width: "10vh",
                  boxShadow: "0px 2px 2px #ccc",
                  fontSize: "16px",
                  marginRight: "10px",
                }}
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                class="btn btn-info"
                style={{
                  backgroundColor: "#FB5144",
                  border: "0px",
                  borderRadius: "10px",
                  width: "10vh",
                  boxShadow: "0px 2px 2px #ccc",
                  fontSize: "16px",
                  marginRight: "5px",
                }}
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
            <hr className="hr-style" />
          </div>
        ))}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {showEditOPID ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "15%",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  可編輯的OPID：
                </div>
                {canEditOPID.map((opid, index) => (
                  <div
                    key={index}
                    style={{
                      width: "15%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    <div>{opid}</div>
                    <button
                      class="btn btn-info"
                      style={{
                        backgroundColor: "#FB5144",
                        border: "0px",
                        borderRadius: "10px",
                        width: "10vh",
                        boxShadow: "0px 2px 2px #ccc",
                        fontSize: "16px",
                        marginRight: "5px",
                      }}
                      onClick={() => removeOPID(opid)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  class="btn btn-info"
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxShadow: "0px 2px 2px #ccc",
                    fontSize: "16px",
                    marginTop: "10px",
                  }}
                  onClick={addOPID}
                >
                  + 新增可編輯的OPID
                </button>
              </div>
            </>
          ) : (
            <div></div>
          )}
        
        </div>
      </div>
      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editItem.isNew
                    ? "Add New CheckListItem"
                    : "Edit CheckListItem"}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div style={{ marginBottom: "10px" }}>CheckListItem-Text：</div>
                <input
                  type="text"
                  class="form-control"
                  value={editItem.text}
                  onChange={(e) =>
                    setEditItem({ ...editItem, text: e.target.value })
                  }
                />
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                  Fail Reasons：
                </div>
                <div>
                
                <select
  value={editItem.selectedReason}
  style={{ borderRadius: "5px", marginRight: "10px" }}
  onChange={handleReasonChange}
>
  {editItem.reasons.map((reason, index) => (
    <option key={index} value={reason.id}>
      {reason.description}
    </option>
  ))}
</select>
                        {editItem.isNew ? (
                    <button
                      class="btn btn-info"
                      style={{
                        backgroundColor: "#38D335",
                        border: "0px",
                        borderRadius: "5px",
                        boxShadow: "0px 2px 2px #ccc",
                        fontSize: "16px",
                        marginLeft: "5px",
                      }}
                      onClick={handleAddReason}
                    >
                      + Add Reason
                    </button>
                  ) : (
                    <>
                      <button
                        class="btn btn-info"
                        style={{
                          backgroundColor: "#38D335",
                          border: "0px",
                          borderRadius: "5px",
                          width: "5vh",
                          boxShadow: "0px 2px 2px #ccc",
                          fontSize: "20px",
                          marginRight: "5px",
                        }}
                        onClick={handleAddReason}
                      >
                        +
                      </button>
                      <button
                        class="btn btn-info"
                        style={{
                          backgroundColor: "#F54B4B",
                          border: "0px",
                          borderRadius: "5px",
                          width: "5vh",
                          boxShadow: "0px 2px 2px #ccc",
                          fontSize: "20px",
                        }}
                        onClick={handleRemoveReason}
                      >
                        -
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  class="btn btn-info"
                  style={{
                    backgroundColor: "#3668A4",
                    border: "0px",
                    borderRadius: "5px",
                    width: "10vh",
                    boxShadow: "0px 2px 2px #ccc",
                    fontSize: "20px",
                  }}
                  type="button"
                  onClick={saveChanges}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SetModelPage;

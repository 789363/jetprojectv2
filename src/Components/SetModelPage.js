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
          setCheckLists(data);  // Assuming the API returns an array of test items
          console.log(data)
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

  const [canEditOPID, setCanEditOPID] = useState(["123456", "222222"]);
  useEffect(() => {
    // GETselectModel的checkLists
    // GETselectModel的canEditOPID
  }, []);

  useEffect(() => {
    who === "admin" ? setEditOPID(true) : setEditOPID(false);
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
  const handleDelete = (itemId) => {
    const updatedCheckLists = checkLists.filter((item) => item.id !== itemId);
    setCheckLists(updatedCheckLists);
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

  const handleSaveAllModels = () => {
    const newModel = createNewModelVersion();
    const updatedModelList = [...modelListsItems, newModel];

    // 將Model進行排序，將版本直接分組到對應的基本模型下
    updatedModelList.sort((a, b) => {
      const baseNameA = a.modelName.split("_version")[0];
      const baseNameB = b.modelName.split("_version")[0];

      // 如果基本名稱相同，則按版本號排序
      if (baseNameA === baseNameB) {
        const versionNumberA = parseInt(
          a.modelName.split("_version")[1] || 0,
          10
        );
        const versionNumberB = parseInt(
          b.modelName.split("_version")[1] || 0,
          10
        );
        return versionNumberA - versionNumberB;
      }
      return a.modelName.localeCompare(b.modelName);
    });

    setModelListsItems(updatedModelList);
    // setActiveModel(newModel);
    alert(`Saved as new version: ${newModel.modelName}`);
  };

  const handleReasonChange = (e) => {
    setEditItem({ ...editItem, selectedReason: e.target.value });
  };

  const handleAddReason = () => {
    const newReason = prompt("Enter new reason:");
    if (newReason && !editItem.reasons.includes(newReason)) {
      setEditItem({
        ...editItem,
        reasons: [...editItem.reasons, newReason],
        selectedReason: newReason,
      });
    }
  };

  const saveChanges = () => {
    if (editItem.isNew) {
      checkLists.push(editItem);
    } else {
      const updatedCheckLists = checkLists.map((item) =>
        item.id === editItem.id ? { ...editItem } : item
      );
      setCheckLists(updatedCheckLists);
    }
    setShowModal(false);
  };

  const handleRemoveReason = () => {
    const updatedReasons = editItem.reasons.filter(
      (reason) => reason !== editItem.selectedReason
    );
    setEditItem({
      ...editItem,
      reasons: updatedReasons,
      selectedReason: updatedReasons.length > 0 ? updatedReasons[0] : "NA",
    });
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
          <button
            type="button"
            class="btn btn-info"
            style={{
              backgroundColor: "#3668A4",
              border: "0px",
              borderRadius: "10px",
              // width: "10vh",
              boxShadow: "0px 2px 2px #ccc",
              fontSize: "20px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            onClick={handleSaveAllModels}
          >
            Seve All
          </button>
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
                      <option key={index} value={reason}>
                        {reason}
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

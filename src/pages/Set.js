import React, { useState } from "react";
import "../style/set.scss";

const Set = (pros) => {
  const { toggleShowSet, enteredOPID } = pros;

  const modelList = [
    {
      modelId: 1,
      modelName: "Model01",
      checkLists: [
        {
          id: 1,
          text: "No wrong, missing, reverse, damaged, broken, extra part,...",
          status: "NA",
          reasons: ["Reason 1-1", "Reason 1-2", "Reason 1-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 2,
          text: "No extra flux PCBA surface or solder dreg on PCBA surface",
          status: "NA",
          reasons: ["Reason 2-1", "Reason 2-2", "Reason 2-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 3,
          text: "No scratch, surface blister, voids, oxiding, peel off,...",
          status: "NA",
          reasons: ["Reason 3-1", "Reason 3-2", "Reason 3-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 4,
          text: "Connect direction correct way, including: damage,...",
          status: "NA",
          reasons: ["Reason 4-1", "Reason 4-2", "Reason 4-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 5,
          text: "Function test",
          status: "NA",
          reasons: ["Reason 5-1", "Reason 5-2", "Reason 5-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 6,
          text: "The content in the label must be right place, complete, clear ...",
          status: "NA",
          reasons: ["Reason 6-1", "Reason 6-2", "Reason 6-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 7,
          text: "Product packing specification verification",
          status: "NA",
          reasons: ["Reason 7-1", "Reason 7-2", "Reason 7-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 8,
          text: "The label in the right position and direction, clear to verify and ...",
          status: "NA",
          reasons: ["Reason 8-1", "Reason 8-2", "Reason 8-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 9,
          text: "The label in the right position and direction, clear to verify and ...",
          status: "NA",
          reasons: ["Reason 9-1", "Reason 9-2", "Reason 9-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 10,
          text: "The label in the right position and direction, clear to verify and ...",
          status: "NA",
          reasons: ["Reason 10-1", "Reason 10-2", "Reason 10-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
      ],
      canEditOPID: ["123456", "222222"],
    },
    {
      modelId: 2,
      modelName: "Model02",
      checkLists: [
        {
          id: 1,
          text: "Is booting normal?",
          status: "NA",
          reasons: ["Reason 1-1", "Reason 1-2", "Reason 1-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 2,
          text: "No extra flux PCBA surface or solder dreg on PCBA surface",
          status: "NA",
          reasons: ["Reason 2-1", "Reason 2-2", "Reason 2-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 3,
          text: "No scratch, surface blister, voids, oxiding, peel off,...",
          status: "NA",
          reasons: ["Reason 3-1", "Reason 3-2", "Reason 3-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 4,
          text: "Connect direction correct way, including: damage,...",
          status: "NA",
          reasons: ["Reason 4-1", "Reason 4-2", "Reason 4-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 5,
          text: "Function test",
          status: "NA",
          reasons: ["Reason 5-1", "Reason 5-2", "Reason 5-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 6,
          text: "The content in the label must be right place, complete, clear ...",
          status: "NA",
          reasons: ["Reason 6-1", "Reason 6-2", "Reason 6-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 7,
          text: "Product packing specification verification",
          status: "NA",
          reasons: ["Reason 7-1", "Reason 7-2", "Reason 7-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 8,
          text: "The label in the right position and direction, clear to verify and ...",
          status: "NA",
          reasons: ["Reason 8-1", "Reason 8-2", "Reason 8-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 9,
          text: "The label in the right position and direction, clear to verify and ...",
          status: "NA",
          reasons: ["Reason 9-1", "Reason 9-2", "Reason 9-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 10,
          text: "The label in the right position and direction, clear to verify and ...",
          status: "NA",
          reasons: ["Reason 10-1", "Reason 10-2", "Reason 10-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
      ],
      canEditOPID: ["222222"],
    },
    {
      modelId: 3,
      modelName: "Model03",
      checkLists: [
        {
          id: 1,
          text: "La La La~",
          status: "NA",
          reasons: ["Reason 1-1", "Reason 1-2", "Reason 1-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 2,
          text: "No extra flux PCBA surface or solder dreg on PCBA surface",
          status: "NA",
          reasons: ["Reason 2-1", "Reason 2-2", "Reason 2-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 3,
          text: "No scratch, surface blister, voids, oxiding, peel off,...",
          status: "NA",
          reasons: ["Reason 3-1", "Reason 3-2", "Reason 3-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 4,
          text: "Connect direction correct way, including: damage,...",
          status: "NA",
          reasons: ["Reason 4-1", "Reason 4-2", "Reason 4-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 5,
          text: "Function test",
          status: "NA",
          reasons: ["Reason 5-1", "Reason 5-2", "Reason 5-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 6,
          text: "The content in the label must be right place, complete, clear ...",
          status: "NA",
          reasons: ["Reason 6-1", "Reason 6-2", "Reason 6-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 7,
          text: "Product packing specification verification",
          status: "NA",
          reasons: ["Reason 7-1", "Reason 7-2", "Reason 7-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 8,
          text: "The label in the right position and direction, clear to verify and ...",
          status: "NA",
          reasons: ["Reason 8-1", "Reason 8-2", "Reason 8-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 9,
          text: "The label in the right position and direction, clear to verify and ...",
          status: "NA",
          reasons: ["Reason 9-1", "Reason 9-2", "Reason 9-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
        {
          id: 10,
          text: "The label in the right position and direction, clear to verify and ...",
          status: "NA",
          reasons: ["Reason 10-1", "Reason 10-2", "Reason 10-3"],
          selectedReason: "NA",
          disabledReason: true,
          checked: false,
        },
      ],
      canEditOPID: ["333333"],
    },
  ];

  const [modelListsItems, setModelListsItems] = useState(modelList);

  // 如果是Admin，就可以看到所有的Model，如果是User，就只能看到自己的Model
  const [showAllModels, setShowAllModels] = useState(false);

  // 單獨測項修改
  const [showModal, setShowModal] = useState(false);

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

  // 可編輯的OPID，預設是看不到的，要按使用者按鈕才可以看到
  const [showEditOPID, setEditOPID] = useState(false);

  const displayedModels = showAllModels
    ? modelListsItems
    : modelListsItems.filter((model) =>
        model.canEditOPID.includes(enteredOPID)
      );

  const [activeModel, setActiveModel] = useState(displayedModels[0]);

  // 回到OQC的Show畫面
  const handleShowClick = () => {
    window.history.pushState({}, null, "/");
    toggleShowSet(false);
  };

  const handleModelSelect = (model) => {
    setActiveModel(model);
  };

  const handleDelete = (itemId) => {
    if (activeModel) {
      const updatedCheckLists = activeModel.checkLists.filter(
        (item) => item.id !== itemId
      );
      const updatedModel = { ...activeModel, checkLists: updatedCheckLists };
      setActiveModel(updatedModel);
      setModelListsItems(
        modelListsItems.map((model) =>
          model.modelId === updatedModel.modelId ? updatedModel : model
        )
      );
    }
  };

  // 新增
  const handleAddCheckItem = () => {
    const newItem = {
      id: activeModel.checkLists.length + 1,
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
      activeModel.checkLists.push(editItem);
    } else {
      const updatedCheckLists = activeModel.checkLists.map((item) =>
        item.id === editItem.id ? { ...editItem } : item
      );
      setActiveModel({ ...activeModel, checkLists: updatedCheckLists });
    }
    setShowModal(false);
    setModelListsItems(
      modelListsItems.map((model) =>
        model.modelId === activeModel.modelId ? activeModel : model
      )
    );
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

  // 新增可編輯的OPID
  const addOPID = () => {
    const newOPID = prompt("Add OPID:");
    // 如果newOPID有值，而且長度是6，而且canEditOPID裡面沒有newOPID，就新增canEditOPID
    if (
      newOPID &&
      newOPID.length === 6 &&
      !activeModel.canEditOPID.includes(newOPID)
    ) {
      setActiveModel({
        ...activeModel,
        canEditOPID: [...activeModel.canEditOPID, newOPID],
      });
    } else {
      alert("Invalid OPID!");
    }
  };

  // 刪除可編輯的OPID
  const removeOPID = (opidToRemove) => {
    if (activeModel) {
      const updatedOPIDs = activeModel.canEditOPID.filter(
        (opid) => opid !== opidToRemove
      );
      const updatedModel = {
        ...activeModel,
        canEditOPID: updatedOPIDs,
      };
      setActiveModel(updatedModel);
      setModelListsItems(
        modelListsItems.map((model) =>
          model.modelId === activeModel.modelId ? updatedModel : model
        )
      );
    }
  };

  const handleCanEditOPIDButtonClick = (value) => {
    if (value === "admin") {
      setShowAllModels(true);
      setEditOPID(true);
    } else {
      setShowAllModels(false);
      setEditOPID(false);
    }
  };

  const createNewModelVersion = () => {
    // 提取不含版本號的基本型號名稱
    const baseModelName = activeModel.modelName.split("_version")[0];

    // 篩選掉所有以基本模型名稱開頭的模型並計算有幾個版本
    const existingVersions = modelListsItems.filter((model) =>
      model.modelName.startsWith(baseModelName + "_version")
    );

    // 取得最高版本號，如果不存在任何版本則從 0 開始
    const highestVersionNumber = existingVersions.reduce((max, model) => {
      const versionSuffix = model.modelName.split("_version")[1];
      return Math.max(max, parseInt(versionSuffix, 10) || 0);
    }, 0);

    // 增加新Model的最高版本號
    const newModelName = `${baseModelName}_version${highestVersionNumber + 1}`;
    const newModel = {
      ...activeModel,
      modelName: newModelName,
      modelId: modelListsItems.length + 1,
    };

    return newModel;
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
    setActiveModel(newModel);
    alert(`Saved as new version: ${newModel.modelName}`);
  };

  return (
    <>
      <div className="row">
        <div className="left-side">
          <div
            className="col"
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <div
              className="list-group"
              style={{
                marginLeft: "-15px",
                marginRight: "-15px",
                height: "75%",
                overflowY: "auto",
              }}
              id="list-tab"
              role="tablist"
            >
              {displayedModels.map((item) => (
                <a
                  key={item.modelId}
                  className={`list-group-item list-group-item-action ${
                    activeModel && activeModel.modelId === item.modelId
                      ? "active"
                      : ""
                  }`}
                  id={`list-${item.modelId}-list`}
                  data-toggle="list"
                  href={`#ModelId-${item.modelId}`}
                  role="tab"
                  onClick={() => handleModelSelect(item)}
                >
                  {item.modelName}
                </a>
              ))}
            </div>
            <div
              style={{
                height: "25%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginLeft: "-10px",
                paddingBottom: "10px",
              }}
            >
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
                onClick={handleShowClick}
              >
                退出編輯模式
              </button>
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
                onClick={() => handleCanEditOPIDButtonClick("user")}
              >
                User
              </button>

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
                onClick={() => handleCanEditOPIDButtonClick("admin")}
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        <div
          className="col"
          style={{
            alignContent: "center",
            backgroundColor: "#DDE3EC",
          }}
        >
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
            {activeModel &&
              activeModel.checkLists.map((item) => (
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
                        setActiveModel({
                          ...activeModel,
                          checkLists: activeModel.checkLists.map((checkItem) =>
                            checkItem.id === item.id
                              ? { ...checkItem, status: e.target.value }
                              : checkItem
                          ),
                        })
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
                        setActiveModel({
                          ...activeModel,
                          checkLists: activeModel.checkLists.map((checkItem) =>
                            checkItem.id === item.id
                              ? {
                                  ...checkItem,
                                  selectedReason: e.target.value,
                                }
                              : checkItem
                          ),
                        })
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
                    {activeModel.canEditOPID.map((opid, index) => (
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

export default Set;

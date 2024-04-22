import React, { useState, useEffect } from "react";
import "../style/show.scss";

const Show = (pros) => {
  const { getShowInfo, toggleShowSet, enteredOPID } = pros;

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

  //   測量項目的內容有TestItem、USL、CL、LSL、Unit、測量結果(要自己手動輸入)、測量結果是否合格(要自己手動輸入)、測量結果是否合格
  const measureItems = [
    {
      id: 1,
      text: "TestItem1",
      USL: 10,
      CL: 5,
      LSL: 0,
      Unit: "mm",
      measureResult: "",
      measureResultIsPass: "",
    },
    {
      id: 2,
      text: "TestItem2",
      USL: 10,
      CL: 5,
      LSL: 0,
      Unit: "mm",
      measureResult: "",
      measureResultIsPass: "",
    },
    {
      id: 3,
      text: "TestItem3",
      USL: 10,
      CL: 5,
      LSL: 0,
      Unit: "mm",
      measureResult: "",
      measureResultIsPass: "",
    },
    {
      id: 4,
      text: "TestItem4",
      USL: 10,
      CL: 5,
      LSL: 0,
      Unit: "mm",
      measureResult: "",
      measureResultIsPass: "",
    },
    {
      id: 5,
      text: "TestItem5",
      USL: 10,
      CL: 5,
      LSL: 0,
      Unit: "mm",
      measureResult: "",
      measureResultIsPass: "",
    },
  ];

  //針對checkList(操作員要做什麼事情)的動作
  const [modelListsItems, setModelListsItems] = useState(modelList);
  // 選擇哪個model的下拉式選單
  const [selectModel, setSelectModel] = useState(0);
  //checkList的全選
  const [selectAll, setSelectAll] = useState(false);
  //checkList的下拉式選單(for狀態[NA,PASS,FAIL])
  const [selectAllValue, setSelectAllValue] = useState("NA");
  //針對測量項目的動作
  const [measureListItems, setMeasureListItems] = useState(measureItems);
  // 開始測試時間
  // const [startTestTime, setStartTestTime] = useState("");

  // useEffect(() => {
  //   const now = new Date();
  //   const formattedTime = formatDateTime(now);
  //   setStartTestTime(formattedTime);
  // }, []);

  // // 將日期時間格式化為 yyyy-mm-dd hh:mm:ss
  const formatDateTime = (date) => {
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      " " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2)
    );
  };

  // 處理單個複選框變化
  const handleCheckboxChange = (modelId, checklistId) => {
    setModelListsItems(
      modelListsItems.map((model) =>
        model.modelId === modelId
          ? {
              ...model,
              checkLists: model.checkLists.map((item) =>
                item.id === checklistId
                  ? { ...item, checked: !item.checked }
                  : item
              ),
            }
          : model
      )
    );
  };

  // 處理全選複選框變化
  const handleSelectAllChange = (e) => {
    const newChecked = e.target.checked;
    setSelectAll(newChecked);
    setModelListsItems(
      modelListsItems.map((model) => ({
        ...model,
        checkLists: model.checkLists.map((item) => ({
          ...item,
          checked: newChecked,
        })),
      }))
    );
  };

  // 處理全選下拉選單變化
  const handleSelectAllDropdownChange = (e) => {
    const newStatus = e.target.value;
    setSelectAllValue(newStatus);
    setModelListsItems(
      modelListsItems.map((model) => ({
        ...model,
        checkLists: model.checkLists.map((item) => ({
          ...item,
          status: newStatus,
          selectedReason: newStatus === "FAIL" ? item.reasons[0] : "NA",
          disabledReason: newStatus !== "FAIL",
          checked: selectAll ? true : item.checked,
        })),
      }))
    );
  };

  // 處理checkList狀態選擇下拉選單變化
  const handleStatusChange = (modelId, checklistId, newStatus) => {
    setModelListsItems(
      modelListsItems.map((model) =>
        model.modelId === modelId
          ? {
              ...model,
              checkLists: model.checkLists.map((item) =>
                item.id === checklistId || item.checked
                  ? {
                      ...item,
                      status: newStatus,
                      selectedReason:
                        newStatus === "FAIL" ? item.reasons[0] : "NA",
                      disabledReason: newStatus !== "FAIL",
                    }
                  : item
              ),
            }
          : model
      )
    );
  };

  // 處理checkList原因選擇下拉選單變化
  const handleReasonChange = (modelId, checklistId, newReason) => {
    setModelListsItems(
      modelListsItems.map((model) =>
        model.modelId === modelId
          ? {
              ...model,
              checkLists: model.checkLists.map((item) =>
                item.id === checklistId
                  ? { ...item, selectedReason: newReason }
                  : item
              ),
            }
          : model
      )
    );
  };

  //   輸入測量結果時，測量結果是否合格會自動判斷
  const handleMeasureResultChange = (id, newResult) => {
    setMeasureListItems(
      measureListItems.map((item) =>
        item.id === id
          ? {
              ...item,
              measureResult: newResult,
              measureResultIsPass:
                newResult >= item.LSL && newResult <= item.USL ? "PASS" : "NG",
            }
          : item
      )
    );
  };

  // 按下Edit按鈕的事件
  const handleEditButtonClick = () => {
    toggleShowSet(true);
  };

  // selectModel的下拉式選單
  const handleSelectModelChange = (e) => {
    console.log("e.target.value", e.target.value);
    setSelectModel(Number(e.target.value));
  };

  // 按下Send按鈕的事件
  const handleSendButtonClick = () => {
    // 如果modelListsItems的每個model的checkLists的每個item的status都是PASS，status就是PASS，否則就是FAIL
    const status = modelListsItems.every((model) =>
      model.checkLists.every((item) => item.status === "PASS")
    )
      ? "PASS"
      : "FAIL";

    const endTestTime = new Date();
    const endTestTimeFormat = formatDateTime(endTestTime);

    getShowInfo({
      endTestTimeFormat,
      status,
      measureListItems,
    });
  };
  return (
    <>
      <div class="row my-4">
        <div class="col-md-6" style={{ height: "60vh" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "6vh",
            }}
          >
            {/* selectModel的下拉式選單，預設選項為-----請選擇Model------，onChange呼叫handleSelectModelChange事件去setSelectModel*/}
            <select
              value={selectModel}
              onChange={handleSelectModelChange}
              style={{
                height: "40px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "20px",
                paddingLeft: "10px",
                marginRight: "10px",
              }}
            >
              <option value={0}>-----請選擇Model------</option>
              {modelListsItems
                .filter((model) => model.canEditOPID.includes(enteredOPID))
                .map((model) => (
                  <option key={model.modelId} value={model.modelId}>
                    {model.modelName}
                  </option>
                ))}
            </select>

            <button
              type="button"
              class="btn btn-info"
              style={{
                backgroundColor: "#F3934D",
                border: "0px",
                borderRadius: "10px",
                width: "10vh",
                boxShadow: "0px 2px 2px #ccc",
                fontSize: "20px",
                height: "40px",
              }}
              onClick={handleEditButtonClick}
            >
              Edit
            </button>
          </div>

          <div
            style={{
              height: "54vh",
            }}
          >
            <div className="selectall-div">
              <div className="select-all">
                <input
                  style={{ marginRight: "10px" }}
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
                Select All
                <select
                  value={selectAllValue}
                  onChange={handleSelectAllDropdownChange}
                >
                  <option value="NA">NA</option>
                  <option value="PASS">PASS</option>
                  <option value="FAIL">FAIL</option>
                </select>
              </div>
            </div>
            <div className="checklist-container">
              {/* 根據modelListsItems的selectModel顯示 */}
              {modelListsItems
                .filter((model) => model.modelId === selectModel)
                .map((model) =>
                  model.checkLists.map((item) => (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div key={item.id}>
                          <input
                            className="checklist-checkbox"
                            type="checkbox"
                            checked={item.checked}
                            onChange={() =>
                              handleCheckboxChange(model.modelId, item.id)
                            }
                          />
                          {item.id}. {item.text}
                        </div>
                        <div>
                          <select
                            value={item.status}
                            onChange={(e) =>
                              handleStatusChange(
                                model.modelId,
                                item.id,
                                e.target.value
                              )
                            }
                            style={{ borderRadius: "5px" }}
                          >
                            <option value="NA">NA</option>
                            <option value="PASS">PASS</option>
                            <option value="FAIL">FAIL</option>
                          </select>
                          <select
                            value={item.selectedReason}
                            onChange={(e) =>
                              handleReasonChange(
                                model.modelId,
                                item.id,
                                e.target.value
                              )
                            }
                            disabled={item.disabledReason}
                            className="checklist-select"
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
                      </div>
                      <hr className="hr-style" />
                    </>
                  ))
                )}
            </div>
          </div>
        </div>

        <div class="col-md-6" style={{ height: "60vh" }}>
          <div
            style={{
              width: "100%",
              height: "40vh",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                height: "6vh",
                alignContent: "center",
              }}
            >
              測量項目
            </div>

            <div className="test-items-div">
              <div
                style={{
                  height: "5vh",
                }}
              >
                <div className="test-items-title-div">
                  <div className="test-items-title-text">TestItem</div>
                  <div className="test-items-title-text">USL</div>
                  <div className="test-items-title-text">CL</div>
                  <div className="test-items-title-text">LSL</div>
                  <div className="test-items-title-text">Unit</div>
                  <div className="test-items-title-text">TestResults</div>
                  <div className="test-items-title-text">PassOrFail</div>
                </div>
              </div>
              <div className="test-items-body-div">
                {measureListItems.map((item) => (
                  <>
                    <div className="test-items-body-each-div">
                      <div className="test-items-body-each-text">
                        {item.text}
                      </div>
                      <div className="test-items-body-each-text">
                        {item.USL}
                      </div>
                      <div className="test-items-body-each-text">{item.CL}</div>
                      <div className="test-items-body-each-text">
                        {item.LSL}
                      </div>
                      <div className="test-items-body-each-text">
                        {item.Unit}
                      </div>
                      <div className="test-items-body-each-text">
                        <input
                          class="form-control"
                          type="text"
                          value={item.measureResult}
                          onChange={(e) =>
                            handleMeasureResultChange(item.id, e.target.value)
                          }
                        />
                      </div>
                      {item.measureResultIsPass === "PASS" ? (
                        <div
                          style={{
                            color: "green",
                            width: "14%",
                          }}
                        >
                          ✓
                        </div>
                      ) : item.measureResultIsPass === "NG" ? (
                        <div
                          style={{
                            color: "red",
                            width: "14%",
                          }}
                        >
                          ✗
                        </div>
                      ) : (
                        <div style={{ width: "14%" }}></div>
                      )}
                    </div>
                    <hr className="hr-style" />
                  </>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "20vh",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                height: "6vh",
                alignContent: "center",
              }}
            >
              回傳結果
            </div>
            <div className="return-results-div">
              <div style={{ margin: "10px" }}>保留彈性用</div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div
          class="col-12"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "70vh",
              alignItems: "center",
            }}
          >
            <div style={{ margin: "10px" }}>PCBWO</div>
            <div style={{ margin: "10px" }}>
              <select style={{ borderRadius: "5px" }}>
                <option value="NA">NA</option>
                <option value="OK">OK</option>
                <option value="NG">NG</option>
              </select>
            </div>
            <div style={{ width: "70%" }}>
              <input
                type="text"
                class="form-control"
                placeholder="Remember to enter a note..."
                style={{
                  fontStyle: "italic",
                  color: "gray",
                  margin: "10px",
                  width: "100%",
                }}
              />
            </div>
          </div>
          {/* 如果Model沒有被選擇的情況，button就不能被按 */}
          <button
            type="button"
            class="btn btn-info"
            style={{
              backgroundColor: "#3668A4",
              border: "0px",
              borderRadius: "10px",
              width: "10vh",
              boxShadow: "0px 2px 2px #ccc",
              fontSize: "20px",
              marginTop: "10px",
            }}
            onClick={handleSendButtonClick}
            disabled={selectModel === 0}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Show;

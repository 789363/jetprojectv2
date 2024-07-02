import React, { useState, useEffect } from "react";
import "../style/show.scss";
import "../components/ModelSelcet";
import ModelPage from "../components/ModelSelcet";

const Show = (pros) => {
  const {headerListsItems, toggleShowSet, enteredOPID } = pros;
  console.log(pros)

  
  //針對checkList(操作員要做什麼事情)的動作
  const [modelListsItems, setModelListsItems] = useState([]);
  // 選擇哪個model的下拉式選單
  const [selectModel, setSelectModel] = useState(0);
  //針對測量項目的動作
  const [measureListItems, setMeasureListItems] = useState([]);
  const [startTestTime, setStartTestTime] = useState("");
  const [endTestTime, setEndTestTime] = useState("");
  const [checkListData, setCheckListData] = useState([]);
  useEffect(() => {
    const now = new Date();
    setStartTestTime(formatDateTime(now)); // 設置測試開始時間



    const fetchModels = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/modules');
        if (!response.ok) throw new Error('Failed to fetch models');
        const models = await response.json();
        setModelListsItems(models.map(model => ({
          modelId: model.module_id,
          modelName: model.module_name,
          canEditOPID: [enteredOPID]
        })));
      } catch (error) {
        console.error('Fetch models error:', error);
        alert('無法從後端獲取模型資料，請檢查網絡連接。');
      }
    };
    fetchModels();
  }, [enteredOPID]);
  const formatDateTime = (date) => {
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;
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
const handleSelectModelChange = async (e) => {
    const selectedModelId = Number(e.target.value);
    setSelectModel(selectedModelId);

    // 设置测试开始时间
    setStartTestTime(formatDateTime(new Date()));  // 使用当前时间作为开始时间

    if (selectedModelId === 0) {
        setMeasureListItems([]);  // 清空项
        return;  // 提前退出函数
    }

    try {
        const response = await fetch(`http://localhost:3000/api/items/${selectedModelId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const items = await response.json();
        setMeasureListItems(items.map(item => ({
            id: item.item_id,
            text: item.item_name,
            USL: item.USL,
            CL: item.CL,
            LSL: item.LSL,
            Unit: item.unit.replace(/\"/g, ''),
            measureResult: "",
            measureResultIsPass: ""
        })));
    } catch (error) {
        console.error('Failed to fetch measure items:', error);
        alert('No exist measure items ');  // 提供给用户的反馈
    }
};


  // 按下Send按鈕的事件
  const handleSendButtonClick = () => {
    const now = new Date();
    setEndTestTime(formatDateTime(new Date()));
    
     // 获取 PCBWO 的值
    const PCBWOValue = document.querySelector('#pcbwoSelect').value;
      // 處理測量項目數據
      const measurements = measureListItems.map(item => ({
        name: item.text, // 測試項目名稱
        result: item.measureResult || 'NA', // 如果測試結果為空，則顯示 'NA'
        status: item.measureResult ? item.measureResultIsPass : 'NA' // 如果測試結果為空，狀態為 'NA'
      }));


     // 检查任何测试项或检查列表数据是否包含状态为 'FAIL' 或 'NG'
     const anyFail = measurements.concat(checkListData).some(item => item.status === 'FAIL' || item.status === 'NG');
    // 生成 API 需要的数据格式
    const preparedData = {
      guid: `LINE${headerListsItems.find(item => item.headertitle === "LineName").headervalue}${formatDateTime(now).replace(/[- :]/g, '')}${headerListsItems.find(item => item.headertitle === "MachineID").headervalue}`,
      opid: headerListsItems.find(item => item.headertitle === "OPID").headervalue,
      lineName: headerListsItems.find(item => item.headertitle === "LineName").headervalue,
      machineID: headerListsItems.find(item => item.headertitle === "MachineID").headervalue,
      startTestTime,
      endTestTime,
      status: anyFail ? 'FAIL' : 'PASS', // 这应根据实际情况动态设置 ->只要TestItems有一項是fali 就為fali
      program: headerListsItems.find(item => item.headertitle === "Program").headervalue,
      productName: 'OQC_CHECKLIST',//productName
      pcbid:  headerListsItems.find(item => item.headertitle === "SN").headervalue,
      PCBWO: PCBWOValue,
      
      measurement: [
        ...measurements, // 將測試項目數據包含進來
        { name: 'PCBWO', result: PCBWOValue, status: PCBWOValue === 'NA' ? 'NA' : 'PASS' }, // PCBWO 的數據
        ...checkListData
      ],
    };

    fetch("/api/JETAPI/OQCUpload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparedData),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Success:", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  const handleDataFromModal = (data) => {
    console.log("Received data from ModalPage:", data);
    setCheckListData(data); // 保存数据到状态
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
  style={{ height: "40px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "20px", paddingLeft: "10px", marginRight: "10px" }}
>
  <option value={0}>-----Select Model------</option>
  {modelListsItems.map((model) => (
    <option key={model.modelId} value={model.modelId}>{model.modelName}</option>
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

          <ModelPage selectModel={selectModel} sendDataToParent={handleDataFromModal}/>
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
              TestItemsList
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
              Result
            </div>
            <div className="return-results-div">
              <div style={{ margin: "10px" }}></div>
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
  <select id="pcbwoSelect" style={{ borderRadius: "5px" }}>
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

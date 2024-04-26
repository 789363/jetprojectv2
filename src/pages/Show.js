import React, { useState, useEffect } from "react";
import "../style/show.scss";
import "../components/ModelPage";
import ModelPage from "../components/ModelPage";

const Show = (pros) => {
  const { getShowInfo, toggleShowSet, enteredOPID } = pros;

  const modelList = [
    {
      modelId: 1,
      modelName: "Model01",
      canEditOPID: ["123456", "222222"],
    },
    {
      modelId: 2,
      modelName: "Model02",
      canEditOPID: ["222222"],
    },
    {
      modelId: 3,
      modelName: "Model03",
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
  const [modelListsItems, setModelListsItems] = useState([]);
  // 選擇哪個model的下拉式選單
  const [selectModel, setSelectModel] = useState(0);

  //針對測量項目的動作
  const [measureListItems, setMeasureListItems] = useState(measureItems);
  // 開始測試時間
  // const [startTestTime, setStartTestTime] = useState("");

  // useEffect(() => {
  //   const now = new Date();
  //   const formattedTime = formatDateTime(now);
  //   setStartTestTime(formattedTime);
  // }, []);
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/modules');
        if (!response.ok) throw new Error('Failed to fetch models');
        const models = await response.json();
        setModelListsItems(models.map(model => ({
          modelId: model.module_id,
          modelName: model.module_name,
          canEditOPID: [enteredOPID]  // 假設每個模型都可以由 enteredOPID 編輯
        })));
      } catch (error) {
        console.error('Fetch models error:', error);
        alert('無法從後端獲取模型資料，請檢查網絡連接。');
      }
    };
  
    fetchModels();
  }, [enteredOPID]);  // 依賴於 enteredOPID，以確保它變化時重新加載數據
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
  style={{ height: "40px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "20px", paddingLeft: "10px", marginRight: "10px" }}
>
  <option value={0}>-----請選擇Model------</option>
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

          <ModelPage selectModel={selectModel} />
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

import "./bootstrap/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import "./App.css";
import Show from "./pages/ShowOqcPage.js";
import Set from "./pages/SetOqcPage.js";
import Vrm from "./pages/VrmPage.js";

const App = () => {
  // header欄位
  const headerLists = [
    { id: 1, headertitle: "OPID", headervalue: "", isDisabled: false },
    { id: 2, headertitle: "MachineID", headervalue: "", isDisabled: false },
    { id: 3, headertitle: "LineName", headervalue: "", isDisabled: false },
    { id: 4, headertitle: "ProductName", headervalue: "", isDisabled: false },
    { id: 5, headertitle: "SN", headervalue: "", isDisabled: false },
    {
      id: 6,
      headertitle: "Program",
      headervalue: "version1_Model01_20230419160202",
      isDisabled: true,
    },
  ];

  const [headerListsItems, setHeaderListsItems] = useState(headerLists);

  // 控制OQC的Show和Set的頁面顯示
  const [showSet, setShowSet] = useState(false);

  // 用來顯示header欄位輸入完的結果
  const [messages, setMessages] = useState([]);

  // 根據輸入完的header資訊判定是否要顯示頁面
  const [canUsePage, setCanUsePage] = useState(false);

  // 目前是哪個系統(OQC、VRM、...)，預設是OQC
  const [systemName, setSystemName] = useState("OQC");

  // VRM那需要的type
  const [vrmType, setVrmType] = useState("WIP");

  // 開始測試時間
  const [startTestTime, setStartTestTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedTime = formatDateTime(now);
    setStartTestTime(formattedTime);
  }, []);

  // 將日期時間格式化為 yyyy-mm-dd hh:mm:ss
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

  // 處理下拉選單改變的事件
  const handleTypeChange = (event) => {
    setVrmType(event.target.value);
  };

  // 設定選擇系統名稱
  const getSystemName = (systemName) => {
    setSystemName(systemName);
  };

  const toggleShowSet = (shouldShowSet) => {
    setShowSet(shouldShowSet);
  };

  // Header欄位input的onChange事件
  const handleHeaderChange = (e, id) => {
    const { value } = e.target;
    setHeaderListsItems((headerListsItems) =>
      headerListsItems.map((headerListsItem) =>
        headerListsItem.id === id
          ? { ...headerListsItem, headervalue: value }
          : headerListsItem
      )
    );
  };

  // 處理按下Enter鍵的事件(輸入完Header資訊)
  const handleKeyPress = async (event, headerListsItem) => {
    if (event.key === "Enter") {
      const { headertitle, headervalue, id } = headerListsItem;
      let isValid = false;
      let url = '';

      switch (headertitle) {
        case "OPID":
          isValid = headervalue.length === 6;
          if (isValid) {
            url = `http://localhost:3000/api/ops/${headervalue}`; // 准备调用 API 验证 OPID
          }
          break;
        case "MachineID":
        case "LineName":
          isValid = headervalue.length === 4;
          break;
        case "SN":
          isValid = headervalue.length === 14; // SN 验证长度为 14，但不锁定
          break;
        default:
          isValid = true; // 其他字段默认为有效
      }

      if (!isValid) {
        alert(`${headertitle} 格式错误，请重新输入`);
        return;
      }

      if (url) {
        // 如果有 URL，则进行 API 调用
        try {
          const response = await fetch(url);
          if (response.ok) {
            // 如果 API 调用成功，锁定该输入框
            lockInput(id, headertitle);
          } else {
            // 如果 API 调用失败，给出提示
            alert(`${headertitle} 验证失败，请确认数据正确性`);
          }
        } catch (error) {
          console.error('网络请求错误:', error);
          alert('网络错误，请稍后再试');
        }
      } else {
     
        if (headertitle === "MachineID" || headertitle === "LineName") {
          lockInput(id, headertitle);
        }
        // 对于不涉及 API 调用的字段，调用验证函数检查所有字段是否已通过验证
        checkAllFieldsValidated();
      }
      console.log(canUsePage)
    }
  };

const lockInput = (id, headertitle) => {
  setHeaderListsItems(items =>
    items.map(item => item.id === id ? { ...item, isDisabled: true } : item)
  );
  setMessages(prev => [...prev, `${headertitle} 验证通过。`]);
  checkAllFieldsValidated();
};


const checkAllFieldsValidated = () => {
  // 首先检查OPID, MachineID, LineName是否被正确锁定
  const essentialFieldsValidated = headerListsItems.every(item => 
    ["OPID", "MachineID", "LineName"].includes(item.headertitle) ? item.isDisabled : true
  );

  // 检查SN字段长度是否为14
  const snValidated = headerListsItems.find(item => item.headertitle === "SN").headervalue.length === 14;

  // 最终验证结果
  const allValidated = essentialFieldsValidated && snValidated;

  console.log("All fields validated: ", allValidated);  // 输出验证结果以便调试
  setCanUsePage(allValidated);
};

  const getShowInfo = (data) => {
   
    // 將OPID、MachineID、LineName的input設為disabled，但ProductName、PCBID的input不變
    setHeaderListsItems((headerListsItems) =>
      headerListsItems.map((headerListsItem) =>
        headerListsItem.headertitle === "OPID" ||
        headerListsItem.headertitle === "MachineID" ||
        headerListsItem.headertitle === "LineName"
          ? { ...headerListsItem, isDisabled: true }
          : headerListsItem
      )
    );

    const LineName = headerListsItems.filter(
      (headerListsItems) => headerListsItems.headertitle === "LineName"
    )[0].headervalue;

    const MachineID = headerListsItems.filter(
      (headerListsItems) => headerListsItems.headertitle === "MachineID"
    )[0].headervalue;

    // 把data["startTestTime"] (2024-4-13 11:1:53)轉成20240413110153形式，個位數補0
    const startTestTimeFormat = startTestTime.split(" ");
    const date = startTestTimeFormat[0].split("-");
    const time = startTestTimeFormat[1].split(":");
    const year = date[0];
    const month = date[1].length === 1 ? "0" + date[1] : date[1];
    const day = date[2].length === 1 ? "0" + date[2] : date[2];
    const hour = time[0].length === 1 ? "0" + time[0] : time[0];
    const minute = time[1].length === 1 ? "0" + time[1] : time[1];
    const second = time[2].length === 1 ? "0" + time[2] : time[2];
    const startTestTimeTemp = year + month + day + hour + minute + second;

    const guid = "LINE" + LineName + startTestTimeTemp + MachineID;

    const OPID = headerListsItems.filter(
      (headerListsItems) => headerListsItems.headertitle === "OPID"
    )[0].headervalue;

    const endTestTime = data["endTestTimeFormat"];
    const status = data["status"];

    const Program = headerListsItems.filter(
      (headerListsItems) => headerListsItems.headertitle === "Program"
    )[0].headervalue;

    const ProductName = headerListsItems.filter(
      (headerListsItems) => headerListsItems.headertitle === "ProductName"
    )[0].headervalue;

    const SN = headerListsItems.filter(
      (headerListsItems) => headerListsItems.headertitle === "SN"
    )[0].headervalue;

    // 將data["checkListsItems"]的陣列中每個物件只取出text(並把變數名稱取成name)、selectedReason(並把變數名稱取成result)、status
    // 並將name、result、status組成新的陣列
    const modelListsItems = data["measureListItems"].map((item) => {
      const {
        text: name,
        measureResult: result,
        measureResultIsPass: status,
      } = item;
      return { name, result, status };
    });

    const errorData = [];

    // 呼叫OQC上傳用API
    fetch("http://10.7.21.251:5072/JETAPI/OQCUpload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guid,
        OPID,
        LineName,
        MachineID,
        startTestTime,
        endTestTime,
        status,
        Program,
        ProductName,
        SN,
        modelListsItems,
        errorData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const OPID = headerListsItems.filter(
    (headerListsItems) => headerListsItems.headertitle === "OPID"
  )[0].headervalue;

  const Program = headerListsItems.filter(
    (headerListsItems) => headerListsItems.headertitle === "Program"
  )[0].headervalue;

  return (
    <div
      class="container-fluid"
      style={{ backgroundColor: "#DDE3EC", height: "100vh" }}
    >
      <div class="row" className="AllHeaderDiv">
        <div className="HeaderDiv">
          <select
            class="form-control"
            style={{ width: "200px" }}
            value={systemName}
            onChange={(e) => getSystemName(e.target.value)}
          >
            <option value="OQC">OQC</option>
            <option value="VRM">VRM</option>
          </select>
          {systemName === "OQC" ? (
            <div
              style={{
                fontSize: "20",
                alignContent: "center",
              }}
            >
              {headerLists
                .filter((headerLists) => headerLists.headertitle === "Program")
                .map((headerLists) => headerLists.headervalue)}
            </div>
          ) : (
            <div className="type-starttime-div">
              <div style={{ display: "flex", alignItems: "center" }}>
                Type：
                <select
                  className="form-control"
                  style={{ width: "100px" }}
                  value={vrmType}
                  onChange={handleTypeChange}
                >
                  <option value="WIP">WIP</option>
                  <option value="PCBA">PCBA</option>
                  <option value="Keypart">Keypart</option>
                </select>
              </div>
              <div>Start Time：{startTestTime}</div>
            </div>
          )}

          {headerListsItems
            .filter(
              (headerListsItem) =>
                headerListsItem.headertitle !== "Program" &&
                headerListsItem.headertitle !== "ProductName"
            )
            .map((headerListsItem) => (
              <div key={headerListsItem.id} className="HeaderInfoDiv">
                <div>{headerListsItem.headertitle}</div>
                <input
                  type="text"
                  class="form-control"
                  onKeyDown={(e) => handleKeyPress(e, headerListsItem)}
                  placeholder="Type here & press Enter"
                  disabled={headerListsItem.isDisabled}
                  onChange={(e) => handleHeaderChange(e, headerListsItem.id)}
                />
              </div>
            ))}
        </div>
      </div>
      {/* 如果systemName為"OQC"且canUsePage為true就顯示<Show />，但還會再依據showSet決定是否顯示<Set />(true就顯示，false就不顯示)。如果systemName為"OQC"但canUsePage為false則顯示<div />，如果systemName為"VRM"且canUsePage為true就顯示<Vrm />，如果systemName為"VRM"但canUsePage為false則顯示<div /> */}
      {systemName === "OQC" && canUsePage ? (
        showSet ? (
          <Set toggleShowSet={toggleShowSet} enteredOPID={OPID} />
        ) : (
          <Show
            getShowInfo={getShowInfo}
            toggleShowSet={toggleShowSet}
            enteredOPID={OPID}
          />
        )
      ) : systemName === "OQC" && !canUsePage ? (
        <div style={{ textAlign: "center", margin: "10px" }}>
          請輸入完所有Header欄位
        </div>
      ) : systemName === "VRM" && canUsePage ? (
        <Vrm Program={Program} />
      ) : (
        <div style={{ textAlign: "center", margin: "10px" }}>
          請輸入完所有Header欄位
        </div>
      )}
    </div>
  );
};

export default App;

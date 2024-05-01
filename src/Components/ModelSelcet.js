import React, { useState, useEffect } from "react";
import "../style/show.scss";

const ModelPage = (pros) => {
  const { selectModel } = pros;
  const [checkLists, setCheckLists] = useState([]); 

  //checkList的全選
  const [selectAll, setSelectAll] = useState(false);

  //checkList的下拉式選單(for狀態[NA,PASS,FAIL])
  const [selectAllValue, setSelectAllValue] = useState("NA");

  useEffect(() => {
    // 只有当 selectModel 是有效且特定非默认值时才执行 fetch
    if (selectModel && selectModel !== '0') {  
        const fetchCheckLists = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/checkitems/${selectModel}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setCheckLists(data.map(item => ({
                        ...item,
                        selectedReason: "NA",
                        disabledReason: true,
                        checked: false,
                        status: "NA"
                    })));
                } else if (data && typeof data === 'object') {
                    setCheckLists([{
                        ...data,
                        selectedReason: "NA",
                        disabledReason: true,
                        checked: false,
                        status: "NA"
                    }]);
                } else {
                    console.error('Data format error: Expected an object or an array but got:', data);
                }
            } catch (error) {
                console.error('Failed to fetch checklists:', error);
                setCheckLists([]);
                alert('No exist check items: ');
            }
        };
        fetchCheckLists();
    } else {
        // 当选择是 "-----Modal----" 或其他无效选项时，清空列表
        setCheckLists([]);
    }
}, [selectModel]);

  // 處理checkList狀態選擇下拉選單變化
  const handleStatusChange = (checklistId, newStatus) => {
    setCheckLists(
      checkLists.map((item) =>
        item.id === checklistId || item.checked
          ? {
              ...item,
              status: newStatus,
              selectedReason: newStatus === "FAIL" ? item.reasons[0] : "NA",
              disabledReason: newStatus !== "FAIL",
            }
          : item
      )
    );
  };

  // 處理checkList原因選擇下拉選單變化
  const handleReasonChange = (checklistId, newReason) => {
    setCheckLists(
      checkLists.map((item) =>
        item.id === checklistId ? { ...item, selectedReason: newReason } : item
      )
    );
  };

  // 處理單個複選框變化
  const handleCheckboxChange = (checklistId) => {
    setCheckLists(
      checkLists.map((item) =>
        item.id === checklistId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // 處理全選複選框變化
  const handleSelectAllChange = (e) => {
    const newChecked = e.target.checked;
    setSelectAll(newChecked);
    setCheckLists(
      checkLists.map((item) => ({
        ...item,
        checked: newChecked,
      }))
    );
  };

  // 處理全選下拉選單變化
  const handleSelectAllDropdownChange = (e) => {
    const newStatus = e.target.value;
    setSelectAllValue(newStatus);
    setCheckLists(
      checkLists.map((item) => ({
        ...item,
        status: newStatus,
        selectedReason: newStatus === "FAIL" ? item.reasons[0] : "NA",
        disabledReason: newStatus !== "FAIL",
        checked: selectAll ? true : item.checked,
      }))
    );
  };

  return (
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
        {checkLists.map((item) => (
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
                  onChange={() => handleCheckboxChange(item.id)}
                />
                {item.id}. {item.text}
              </div>
              <div>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  style={{ borderRadius: "5px" }}
                >
                  <option value="NA">NA</option>
                  <option value="PASS">PASS</option>
                  <option value="FAIL">FAIL</option>
                </select>
                <select
                  value={item.selectedReason}
                  onChange={(e) => handleReasonChange(item.id, e.target.value)}
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
        ))}
      </div>{" "}
    </div>
  );
};

export default ModelPage;

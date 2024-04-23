import React, { useState, useEffect } from "react";
import "../style/show.scss";

const ModelPage = (pros) => {
  const { selectModel } = pros;
  const [checkLists, setCheckLists] = useState([
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
  ]);

  //checkList的全選
  const [selectAll, setSelectAll] = useState(false);

  //checkList的下拉式選單(for狀態[NA,PASS,FAIL])
  const [selectAllValue, setSelectAllValue] = useState("NA");

  useEffect(() => {
    // GETselectModel的checkLists
  }, []);

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

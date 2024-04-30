import React, { useState, useEffect } from "react";
import "../style/set.scss";
import CheckListEdit from "../components/CheckListEdit/CheckListEdit";
import TestListEdit from "../components/TestListEdit/EditTestListItemModal";
import RoleSwitchButton from "../components/SetOqcPage/RoleSwitchButton"
const Set = (props) => {
  const { toggleShowSet, enteredOPID } = props;

  const [modelListsItems, setModelListsItems] = useState([]);
  const [showAllModels, setShowAllModels] = useState(false);
  const [who, setWho] = useState("user");
  const [activeModel, setActiveModel] = useState(null);

  useEffect(() => {
    // Fetching OP info to determine user role
    fetch(`http://localhost:3000/api/ops/${enteredOPID}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.op_name === "manage") {
          setWho("manage");
          setShowAllModels(true);
          fetchAllModels();
        } else {
          setWho("user");
          setShowAllModels(false);
          fetchUserModels(enteredOPID);
        }
      })
      .catch(error => console.error('Error fetching OP info:', error));
  }, [enteredOPID]);

  const fetchAllModels = () => {
    fetch(`http://localhost:3000/api/setmodules/`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
          if (Array.isArray(data) && data.length > 0) {
              setModelListsItems(data);
              setActiveModel(data[0]); // 確保始終設置一個模型作為活躍模型
          } else {
              console.error('Expected an array but got:', data);
          }
      })
  
      .catch(error => console.error('Error fetching all models:', error));
  };

const fetchUserModels = (opId) => {
    fetch(`http://localhost:3000/api/setmodules/${enteredOPID}`)
      .then(response => response.json())
      .then(data => {
          if (Array.isArray(data)) {
              setModelListsItems(data);
              if (data.length > 0) {
                  setActiveModel(data[0]);
              }
          } else {
              console.error('Expected an array but got:', data);
          }
      })
      .catch(error => console.error('Error fetching user models:', error));
};

{Array.isArray(modelListsItems) && modelListsItems.length > 0 && (
  modelListsItems.map((item) => (
      <a
        key={item.modelId}
        className={`list-group-item list-group-item-action ${activeModel && activeModel.modelId === item.modelId ? "active" : ""}`}
        id={`list-${item.modelId}-list`}
        data-toggle="list"
        href={`#ModelId-${item.modelId}`}
        role="tab"
        onClick={() => handleModelSelect(item)}
      >
        {item.modelName}
      </a>
  ))
)}

  const handleShowClick = () => {
    window.history.pushState({}, null, "/");
    toggleShowSet(false);
  };

  const handleModelSelect = (model) => {
    setActiveModel(model);
  };

  const handleCanEditOPIDButtonClick = (value) => {
    if (value === "manage" && who !== "manage") {
      setShowAllModels(true);
      fetchAllModels();
    } else if (value === "user" && who !== "user") {
      setShowAllModels(false);
      fetchUserModels(enteredOPID);
    }
    setWho(value);
  };

  return (
    <>
      <div className="row">
        <div className="left-side">
          <div className="col" style={{ height: "100%", width: "100%" }}>
            <div className="list-group" style={{ marginLeft: "-15px", marginRight: "-15px", height: "75%", overflowY: "auto" }} id="list-tab" role="tablist">
              {/* list rendering logic remains unchanged */}
            </div>
            <div style={{ height: "25%", display: "flex", flexDirection: "column", justifyContent: "space-between", marginLeft: "-10px", paddingBottom: "10px" }}>
              <button type="button" className="btn btn-info" style={buttonStyle} onClick={() => toggleShowSet(false)}>退出編輯模式</button>
              <RoleSwitchButton who={who} onSwitch={handleCanEditOPIDButtonClick} style={buttonStyle} />
            </div>
          </div>
        </div>
  
        <div className="col" style={{ alignContent: "center", backgroundColor: "#DDE3EC" }}>
          {activeModel && (
            <CheckListEdit selectModel={activeModel.modelId} who={who} modelListsItems={modelListsItems} setModelListsItems={setModelListsItems} />
            
          )}
          
        </div>
        
      </div>
    </>
  );
};

const buttonStyle = {
  backgroundColor: "#fff", color: "#000", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0px 2px 2px #ccc", fontSize: "16px", marginTop: "10px"
};

export default Set;

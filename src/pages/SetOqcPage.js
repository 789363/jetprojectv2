import React, { useState, useEffect } from "react";
import "../style/set.scss";
import CheckListEdit from "../components/SetOqcPage/CheckListEdit";
import TestListEdit from "../components/SetOqcPage/TestListEdit";
import RoleSwitchButton from "../components/SetOqcPage/RoleSwitchButton"
import OpIdManager from '../components/SetOqcPage/OpIdManager';
import { Accordion } from 'react-bootstrap';
const Set = (props) => {
  const { toggleShowSet, enteredOPID } = props;
  const [modelListsItems, setModelListsItems] = useState([]);
  const [showAllModels, setShowAllModels] = useState(false);
  const [who, setWho] = useState("user");
  const [activeModel, setActiveModel] = useState(null);
  const [showEditOPID, setEditOPID] = useState(false);
  const [measureListItems, setMeasureListItems] = useState([
    {
      id: 1,
      testItem: "TestItem1",
      USL: 10,
      CL: 5,
      LSL: 0,
      Unit: "mm",
      measureResult: "",
      measureResultIsPass: "",
    },
    {
      id: 2,
      testItem: "TestItem2",
      USL: 10,
      CL: 5,
      LSL: 0,
      Unit: "mm",
      measureResult: "",
      measureResultIsPass: "",
    },
    {
      id: 3,
      testItem: "TestItem3",
      USL: 10,
      CL: 5,
      LSL: 0,
      Unit: "mm",
      measureResult: "",
      measureResultIsPass: "",
    },
    {
      id: 4,
      testItem: "TestItem4",
      USL: 10,
      CL: 5,
      LSL: 0,
      Unit: "mm",
      measureResult: "",
      measureResultIsPass: "",
    },
    {
      id: 5,
      testItem: "TestItem5",
      USL: 10,
      CL: 5,
      LSL: 0,
      Unit: "mm",
      measureResult: "",
      measureResultIsPass: "",
    },
  ]);
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

  useEffect(() => {
    who === "manage" ? setEditOPID(true) : setEditOPID(false);
  }, [who]);
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
             
            </div>
            <div style={{ height: "25%", display: "flex", flexDirection: "column", justifyContent: "space-between", marginLeft: "-10px", paddingBottom: "10px" }}>
              <button type="button" className="btn btn-info" style={buttonStyle} onClick={() => toggleShowSet(false)}>退出編輯模式</button>
              <RoleSwitchButton who={who} onSwitch={handleCanEditOPIDButtonClick} style={buttonStyle} />
            </div>
          </div>
        </div>
  
        <div className="col" style={{ height: "100%", backgroundColor: "#DDE3EC", padding: "20px" }}>
        
  {activeModel && (
   
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header >Check List Edit</Accordion.Header>
        <Accordion.Body>
          <CheckListEdit selectModel={activeModel.modelId} who={who} modelListsItems={modelListsItems} setModelListsItems={setModelListsItems} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Test List Edit</Accordion.Header>
        <Accordion.Body>
          <TestListEdit measureListItems={measureListItems} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>OP ID Manager</Accordion.Header>
        <Accordion.Body>
          <OpIdManager selectModel={activeModel.modelId} showEditOPID={showEditOPID} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
   
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

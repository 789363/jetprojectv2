import React, { useState, useEffect } from "react";
import "../style/set.scss";
import CheckListEdit from "../components/SetOqcPage/CheckListEdit";
import TestListEdit from "../components/SetOqcPage/TestListEdit";
import RoleSwitchButton from "../components/SetOqcPage/RoleSwitchButton"
import OpIdManager from '../components/SetOqcPage/OpIdManager';
import { Accordion } from 'react-bootstrap';
import * as XLSX from 'xlsx';
const Set = (props) => {
  const { toggleShowSet, enteredOPID } = props;
  const [modelListsItems, setModelListsItems] = useState([]);
  const [showAllModels, setShowAllModels] = useState(false);
  const [who, setWho] = useState("user");
  const [activeModel, setActiveModel] = useState(null);
  const [showEditOPID, setEditOPID] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

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

  const handleModelSelect = (model) => {
    console.log(model)
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


// 新增ModalName的事件
const addModalName = () => {
  const modelName = prompt("Input New Modal Name");
  if (modelName) {
    fetch('http://localhost:3000/api/modules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ module_name: modelName })
    })
    .then(response => response.json())
    .then(data => {
      if (data) { // 确保数据有效
        alert('Modal Create  Success!');
        setModelListsItems(prevItems => [...prevItems, { modelId: data.module_id, modelName: modelName }]); // 假设后端返回的 data 包含 id
        setActiveModel({ modelId: data.module_id, modelName: modelName }); // 设置新添加的模型为当前活跃模型
      } else {
        throw new Error('Invalid response data'); // 处理无效数据
      }
    })
    .catch(error => {
      console.error('添加模型失败:', error);
      alert('Modal Create Fail');
    });
  }
};

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    alert('Please select a file.');
    return;
  }

  setUploadStatus('Uploading...'); // 設置上傳狀態為上傳中
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, {type: 'array'});
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet);
    Promise.all(json.map(item => addOpName(item.OPID)))
      .then(() => {
        setUploadStatus('Upload Successful');
      })
      .catch(error => {
        console.error('Upload Failed:', error);
        setUploadStatus('Upload Failed. Click to retry.'); // 設置上傳狀態為失敗
      });
  };
  reader.readAsArrayBuffer(file);
}


function addOpName(opId) {
  fetch(`http://localhost:3000/api/ops/${opId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ op_id: opId })
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
}

  // 編輯ModalName的事件
const editModalName = (id) => {
    const newModelName = prompt("Input New Modal Name:");
    if (newModelName) {
      fetch(`http://localhost:3000/api/modules/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ module_name: newModelName })
      })
      .then(response => response.json())
      .then(updatedModule => {
        if (updatedModule && updatedModule.module_id) {
          alert('Update Success');
          const updatedItems = modelListsItems.map(item => {
            if (item.modelId === updatedModule.module_id) {
              return { ...item, modelName: updatedModule.module_name };
            }
            return item;
          });
          setModelListsItems(updatedItems);
          setActiveModel(updatedModule); // 更新活跃模型
        } else {
          alert('Update Success');
        }
      })
      .catch(error => {
        console.error('更新模型名称失败:', error);
        alert('Update Fail Please Try Again');
      });
    }
  };

  // 刪除ModalName的事件
const deleteModalName = (id) => {
    if (window.confirm("Are You Sure Whant Delete This Modal?")) {
      fetch(`http://localhost:3000/api/modules/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        alert('Delete Success');
        setModelListsItems(prevItems => prevItems.filter(item => item.modelId !== id));
        if (activeModel && activeModel.modelId === id) {
          setActiveModel(null);
        }
      })
      .catch(error => {
        console.error('删除模型失败:', error);
        alert('Delete Fail Please Try Again');
      });
    }
  };
  

  return (
    <>
      <div className="row">
        <div className="left-side">
          <div className="col" style={{ height: "100%", width: "100%" }}>
            <div className="list-group" style={{ marginLeft: "-15px", marginRight: "-15px", height: "75%", overflowY: "auto" }} id="list-tab" role="tablist">
            {Array.isArray(modelListsItems) && modelListsItems.length > 0 && (
      modelListsItems.map((item) => (
        <>
        <div className={`list-group-item list-group-item-action ${activeModel && activeModel.modelId === item.modelId ? "active" : ""}`} style={{display:"flex",alignItems:"center"}}>
      <a
        key={item.modelId}
        className={`list1-group-item list-group-item-action ${activeModel && activeModel.modelId === item.modelId ? "active" : ""}`}
        id={`list-${item.modelId}-list`}
        data-toggle="list"
        href={`#ModelId-${item.modelId}`}
        role="tab"
        onClick={() => handleModelSelect(item)}
      >
        {item.modelName}
      </a>
      <div  style={{cursor:"pointer",marginRight:"10px"}} onClick={()=> editModalName(item.modelId)}>✏️</div>
      <div style={{cursor:"pointer",fontSize:"24px",marginRight:"10px"}} onClick={()=> deleteModalName(item.modelId)}>-</div>
      </div>
      </>
  ))
)}
            </div>
            <div style={{ height: "25%", display: "flex", flexDirection: "column", justifyContent: "space-between", marginLeft: "-10px", paddingBottom: "10px" }}>
            {who === "manage" && (
  <button type="button" className="btn btn-info" style={buttonStyle} onClick={addModalName}>Add Modal</button>
  
)}
 {who === "manage" && (
  <>
  <button type="button" className="btn btn-info" style={buttonStyle} onClick={() => document.getElementById('file-upload').click()}>
              {uploadStatus || 'Add Op'}
            </button>
            <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileUpload} />
            {uploadStatus === 'Upload Failed. Click to retry.' && (
              <button type="button" className="btn btn-warning" onClick={() => document.getElementById('file-upload').click()}>Retry Upload</button>
            )}
</>
  
)}
              <button type="button" className="btn btn-info" style={buttonStyle} onClick={() => toggleShowSet(false)}>Exit edit mode</button>
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
          <TestListEdit selectModel={activeModel.modelId} />
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

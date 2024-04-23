import React, { useState } from "react";
import "../style/set.scss";
import SetModelPage from "../components/SetModelPage";

const Set = (pros) => {
  const { toggleShowSet, enteredOPID } = pros;

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

  const [modelListsItems, setModelListsItems] = useState(modelList);

  // 如果是Admin，就可以看到所有的Model，如果是User，就只能看到自己的Model
  const [showAllModels, setShowAllModels] = useState(false);

  // 使用者or管理者
  const [who, setWho] = useState("user");

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

  const handleCanEditOPIDButtonClick = (value) => {
    setWho(value);
    if (value === "admin") {
      setShowAllModels(true);
    } else {
      setShowAllModels(false);
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
                  onClick={() => handleModelSelect(item.modelId)}
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
          <SetModelPage
            selectModel={activeModel}
            who={who}
            modelListsItems={modelListsItems}
            setModelListsItems={setModelListsItems}
            createNewModelVersion={createNewModelVersion}
          />
        </div>
      </div>
    </>
  );
};

export default Set;

// ModelSelect.js
import React from 'react';

const ModelSelect = ({ modelListsItems, selectModel, setSelectModel, handleSelectModelChange }) => {
    return (
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
            {modelListsItems.map((model) => (
                <option key={model.modelId} value={model.modelId}>
                    {model.modelName}
                </option>
            ))}
        </select>
    );
};

export default ModelSelect;

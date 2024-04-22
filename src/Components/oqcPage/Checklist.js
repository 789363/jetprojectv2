// Checklist.js
import React from 'react';

const Checklist = ({ modelListsItems, selectModel, handleCheckboxChange, handleStatusChange, handleReasonChange }) => {
    return (
        <>
            {modelListsItems
                .filter((model) => model.modelId === selectModel)
                .flatMap((model) => model.checkLists.map((item) => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => handleCheckboxChange(model.modelId, item.id)}
                            /> {item.text}
                        </label>
                        <select
                            value={item.status}
                            onChange={(e) => handleStatusChange(model.modelId, item.id, e.target.value)}
                        >
                            <option value="NA">NA</option>
                            <option value="PASS">PASS</option>
                            <option value="FAIL">FAIL</option>
                        </select>
                        <select
                            value={item.selectedReason}
                            onChange={(e) => handleReasonChange(model.modelId, item.id, e.target.value)}
                            disabled={item.disabledReason}
                        >
                            {item.reasons.map((reason, index) => (
                                <option key={index} value={reason}>{reason}</option>
                            ))}
                        </select>
                    </div>
                )))
            }
        </>
    );
};

export default Checklist;

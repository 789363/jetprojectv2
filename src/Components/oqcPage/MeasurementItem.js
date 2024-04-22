// MeasurementItem.js
import React from 'react';

const MeasurementItem = ({ measureListItems, handleMeasureResultChange }) => {
    return (
        <div>
            {measureListItems.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{item.text}</span>
                    <input
                        type="text"
                        value={item.measureResult}
                        onChange={(e) => handleMeasureResultChange(item.id, e.target.value)}
                    />
                    <span>{item.measureResultIsPass}</span>
                </div>
            ))}
        </div>
    );
};

export default MeasurementItem;

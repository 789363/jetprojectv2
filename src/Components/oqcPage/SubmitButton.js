// SubmitButton.js
import React from 'react';

const SubmitButton = ({ isModelSelected, handleSendButtonClick }) => {
    return (
        <button
            type="button"
            className="btn btn-info"
            disabled={!isModelSelected}
            onClick={handleSendButtonClick}
        >
            Send
        </button>
    );
};

export default SubmitButton;

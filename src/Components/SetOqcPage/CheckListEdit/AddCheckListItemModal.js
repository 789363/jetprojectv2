import React from 'react';

const AddCheckListItemModal = ({ showModal, setShowModal, editItem, setEditItem, selectModel, onRefresh }) => { // 确保这里包括了 onRefresh
  const handleSubmit = async () => {
    console.log(selectModel)
    if (!selectModel ) {
      alert('Modal ID Not Found');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/checkitems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: editItem.text,
          status: editItem.status,
          reasons: editItem.reasons.map(r => r.description).join(','),
          selectedReason: editItem.selectedReason,
          module_id: selectModel,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setShowModal(false);
     
      alert('Add CheckItems Success！');
      onRefresh();  
    } catch (error) {
      console.error('Error adding check item:', error);
      alert('Add CheckItems Error：' + error.message);
    }
  };

  return (
    showModal && editItem.isNew && (
      <div className="modal show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add CheckItems</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: "10px" }}>CheckItemText：</div>
              <input
                type="text"
                className="form-control"
                value={editItem.text}
                onChange={(e) => setEditItem({ ...editItem, text: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-info"
                style={{
                  backgroundColor: "#3668A4",
                  border: "0px",
                  borderRadius: "5px",
                  width: "10vh",
                  boxShadow: "0px 2px 2px #ccc",
                  fontSize: "20px",
                }}
                type="button"
                onClick={handleSubmit}
              >
              Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddCheckListItemModal;

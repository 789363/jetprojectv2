import React, { useEffect } from 'react';

const EditCheckListItemModal = ({
  showModal, setShowModal, editItem, setEditItem, onRefresh
}) => {
  useEffect(() => {
    if (showModal && !editItem.isNew && editItem.id) {
      fetchReasons(editItem.id);
    }
  }, [showModal, editItem.isNew, editItem.id]);

  const fetchReasons = async (checkitemId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/reasons/${checkitemId}`);
      if (!response.ok) {
        throw new Error('无法获取原因');
      }
      const reasonsData = await response.json();
      setEditItem(currentItem => ({ ...currentItem, reasons: reasonsData || [] }));
    } catch (error) {
      console.error('获取原因失败:', error);
    }
  };

  const handleAddReason = async () => {
    const reasonDescription = prompt("Input Reason:");
    if (!reasonDescription) return;

    try {
      const response = await fetch('http://localhost:3000/api/reasons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: reasonDescription, checkitem_id: editItem.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to add reason');
      }

      const newReason = await response.json();
      setEditItem(currentItem => ({
        ...currentItem,
        reasons: [...currentItem.reasons, newReason]
      }));
      handleSave()
      alert('Reason added successfully');
    } catch (error) {
      console.error('Error adding reason:', error);
      alert('Failed to add reason: ' + error.message);
    }
  };

  const handleDeleteReason = async (reasonId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/reasons/${reasonId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete reason');
      }
  
      // 正确更新状态以移除已删除的原因
      setEditItem(currentItem => ({
        ...currentItem,
        reasons: currentItem.reasons.filter(reason => reason.reason_id !== reasonId)
      }));
      handleSave()
      alert('Reason deleted successfully');
    } catch (error) {
      console.error('Error deleting reason:', error);
      alert('Failed to delete reason: ' + error.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/checkitems/${editItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: editItem.text,
          status: editItem.status,
          reasons: editItem.reasons.map(r => r.description).join(','),
          selectedReason: editItem.selectedReason
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      await onRefresh();
      setShowModal(false);
      alert('Update successful!');
    } catch (error) {
      console.error('保存检查项目失败:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    showModal && !editItem.isNew && (
      <div className="modal show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit CheckList Item</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: "10px" }}>CheckList Item:</div>
              <input
                type="text"
                className="form-control"
                value={editItem.text}
                onChange={(e) => setEditItem({ ...editItem, text: e.target.value })}
              />
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>Reasons:</div>
              {editItem.reasons.length > 0 ? (
                editItem.reasons.map((reason) => (
                  <div key={reason.reason_id}>
                    {reason.description}
                    <button onClick={() => handleDeleteReason(reason.reason_id)}>Delete</button>
                  </div>
                ))
              ) : (
                <p>No reasons added yet.</p>
              )}
              <button className="btn btn-info" onClick={handleAddReason} style={{ marginTop: "10px" }}>
                Add Reason
              </button>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditCheckListItemModal;

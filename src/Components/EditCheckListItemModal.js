import React, { useEffect } from 'react';

const EditCheckListItemModal = ({
  showModal, setShowModal, editItem, setEditItem, onRefresh
}) => {
  
  useEffect(() => {
    if (showModal && !editItem.isNew && editItem.id) {
      fetchReasons(editItem.id);
    }
  }, [showModal, editItem.isNew, editItem.id]);

  // 获取原因
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

  // 添加新的原因
  const handleAddReason = async () => {
    const reasonDescription = prompt("InputReason:");
    if (!reasonDescription) return;
    const newReason = {
      id: Date.now(),  // 使用时间戳作为临时ID
      description: reasonDescription
    };
    setEditItem(currentItem => ({
      ...currentItem,
      reasons: [...currentItem.reasons, newReason]
    }));
  };

  // 保存编辑
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
        throw new Error(`HeetError: ${response.status}`);
      }

      await onRefresh();
      setShowModal(false);
      alert('UpdateSeuses！');
    } catch (error) {
      console.error('保存检查项目失败:', error);
      alert('Error：' + error.message);
    }
  };

  return (
    showModal && !editItem.isNew && (
      <div className="modal show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">EditCheckList</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: "10px" }}>CheckList：</div>
              <input
                type="text"
                className="form-control"
                value={editItem.text}
                onChange={(e) => setEditItem({ ...editItem, text: e.target.value })}
              />
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>Reason：</div>
              {editItem.reasons.length > 0 ? (
                editItem.reasons.map((reason, index) => (
                  <div key={index}>{reason.description}</div>
                ))
              ) : (
                <p>No Reason。</p>
              )}
              <button
                className="btn btn-info"
                onClick={handleAddReason}
                style={{ marginTop: "10px" }}
              >
                Add
              </button>
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
                onClick={handleSave}
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

export default EditCheckListItemModal;

import React from 'react';

const AddCheckListItemModal = ({ showModal, setShowModal, editItem, setEditItem, selectModel, onRefresh }) => { // 确保这里包括了 onRefresh
  const handleSubmit = async () => {
    if (!selectModel || !selectModel.modelId) {
      alert('模型ID未指定，无法添加检查项。');
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
          module_id: selectModel.modelId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setShowModal(false);
      onRefresh();  // 使用传递来的 onRefresh 函数更新父组件的数据
      alert('检查列表项添加成功！');
    } catch (error) {
      console.error('Error adding check item:', error);
      alert('添加检查列表项时出错：' + error.message);
    }
  };

  return (
    showModal && editItem.isNew && (
      <div className="modal show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">添加新的检查列表项</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: "10px" }}>检查列表项文本：</div>
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
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddCheckListItemModal;

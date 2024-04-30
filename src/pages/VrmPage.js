import React, { useState, useEffect } from "react";
import "../style/vrm.scss";

const Vrm = (pros) => {
  const { Program } = pros;

  const [messages, setMessages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 將日期時間格式化為 yyyy-mm-dd hh:mm:ss
  const formatDateTime = (date) => {
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      " " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2)
    );
  };

  // 打開彈跳視窗
  const openModal = () => {
    setModalIsOpen(true);
  };

  // 關閉彈跳視窗
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div class="row" style={{ height: "90vh" }}>
        <div class="col-8">
          <div
            class="col-12"
            style={{
              height: "10%",
              textAlign: "center",
              alignContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            VRM Image Burn-in
          </div>
          <div
            class="col-12"
            style={{
              height: "10%",
              textAlign: "center",
              alignContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Result
          </div>
          <div
            class="col-12"
            style={{
              height: "75%",
              backgroundColor: "#fff",
              paddingTop: "10px",
              textAlign: "center",
              border: "1px solid #ccc",
              borderRadius: "10px",
              boxShadow: "0px 2px 2px #ccc",
              overflowY: "auto",
            }}
          >
            {/* Content */}
            {messages.map((msg, index) => (
              <div key={index} style={{ color: "green" }}>
                {msg}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: "20",
              alignContent: "center",
            }}
          >
            Version：
            {Program}
          </div>
        </div>

        <div class="col-4">
          <div className="testitems-title-div">測試項目</div>
          <div style={{ fontSize: "20px", display: "flex" }}>
            <div style={{ width: "90%" }}>測試項目一...</div>
            <div style={{ color: "green", width: "10%", fontWeight: "bold" }}>
              ✓
            </div>
          </div>
        </div>
      </div>
      {modalIsOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                Test messages
                <button
                  type="button"
                  className="close"
                  onClick={() => setModalIsOpen(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">重新登錄</div>
              <div className="modal-footer">
                <button
                  class="btn btn-info"
                  style={{
                    backgroundColor: "#3668A4",
                    border: "0px",
                    borderRadius: "5px",
                    width: "10vh",
                    boxShadow: "0px 2px 2px #ccc",
                    fontSize: "20px",
                  }}
                  type="button"
                  onClick={closeModal}
                >
                  確認
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Vrm;

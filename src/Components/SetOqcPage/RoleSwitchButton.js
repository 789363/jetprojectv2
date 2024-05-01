import React from 'react';

const RoleSwitchButton = ({ who, style }) => {
  return (
    <button
      type="button"
      className="btn btn-info"
      style={{ ...style, pointerEvents: "none", opacity: 0.7 }} // 添加不可点击的样式
    >
      {who === "manage" ? "Management" : "User"}
    </button>
  );
};

export default RoleSwitchButton;

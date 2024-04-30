import React from 'react';

const RoleSwitchButton = ({ who, onSwitch, style }) => {
  return (
    <button
      type="button"
      className="btn btn-info"
      style={style}
      onClick={() => onSwitch(who === "manage" ? "user" : "manage")}
    >
      {who === "manage" ? "User模式" : "Management"}
    </button>
  );
};

export default RoleSwitchButton;

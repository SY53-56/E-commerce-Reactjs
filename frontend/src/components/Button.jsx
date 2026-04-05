import React, { memo } from "react";
import { NavLink } from "react-router-dom";

 function Button({
  name,
  to,
  className,
  onClick,
  type = "button"
}) {


  // 🔹 If `to` exists → act as Link
  if (to) {
    return (
      <NavLink
        to={to}
        className={`${className} cursor-pointer inline-flex items-center justify-center`}
      >
        { name}
      </NavLink>
    );
  }

  // 🔹 Otherwise → normal button
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} cursor-pointer inline-flex items-center transition-all duration-500 justify-center`}
    >
      { name}
    </button>
  );
}

export default memo(Button)
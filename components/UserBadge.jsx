import React, { useState } from "react";
import "../css/user-badge.css";
import DropdownMenu from "./DropdownMenu";
import UserIcon from "../assets/userbadge_new.png";

function UserBadge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="user-badge"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <img src={UserIcon} alt="User Icon" />

      <span className="material-symbols-outlined icon-dropdown">
        keyboard_arrow_down
      </span>

      {isOpen && <DropdownMenu />}
    </div>
  );
}

export default UserBadge;
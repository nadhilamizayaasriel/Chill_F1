import React, { useState } from "react";
import "../css/navbar.css";
import DropdownMenu from "./DropdownMenu";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="top-nav">
      <div className="wrapper-logo">
        <div className="logo">
          <img src="../assets/chill_logo.svg" alt="Logo" />
          <span>Chill</span>
        </div>
        <ul className="nav-links">
          <li><a href="#">Series</a></li>
          <li><a href="#">Film</a></li>
          <li><a href="#">Daftar Saya</a></li>
        </ul>
      </div>

      <div className="user-badge" onClick={() => setIsOpen(!isOpen)}>
        <img src="../assets/account.png" alt="User Icon" />
        <span className="material-symbols-outlined icon-dropdown">
          keyboard_arrow_down
        </span>

        {isOpen && <DropdownMenu />}
      </div>
    </nav>
  );
}

export default Navbar;

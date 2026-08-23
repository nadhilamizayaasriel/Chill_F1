import React, { useState } from "react";
import "../css/navbar.css";
import ChillLogo from "./ChillLogo";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="top-nav">
      <div className={`wrapper ${isOpen ? "open" : ""}`}>
        <ChillLogo />

        <button
          type="button"
          className="icon-menu"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
        >
          <span className="material-symbols-outlined">
            {isOpen ? "close" : "menu"}
          </span>
        </button>

        <ul>
          <li><a href="#">Series</a></li>
          <li><a href="#">Film</a></li>
          <li><a href="#">Daftar Saya</a></li>
          <li><Link to="/login">Masuk</Link></li>
          <li><Link to="/register">Daftar</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

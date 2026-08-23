import React, { useState } from "react";
import "../css/navbar.css";
import ChillLogo from "./ChillLogo";
import UserBadge from "./UserBadge";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = getCurrentUser();

  return (
    <nav className="top-nav">
      <div className={`wrapper ${isOpen ? "open" : ""}`}>
        <ChillLogo />

        <ul>
          <li>
            <Link to="/">Series</Link>{" "}
          </li>

          <li>
            <Link to="/">Film</Link>
          </li>

          <li>
            <Link to="/profile#daftar-saya">Daftar Saya</Link>{" "}
          </li>

          {!currentUser && (
            <>
              <li>
                <Link to="/login">Masuk</Link>
              </li>

              <li>
                <Link to="/register">Daftar</Link>
              </li>
            </>
          )}
        </ul>

        {currentUser && <UserBadge />}

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
      </div>
    </nav>
  );
}

export default Navbar;

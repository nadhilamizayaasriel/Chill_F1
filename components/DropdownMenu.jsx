import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth";
import "../css/dropdown.css";

function DropdownMenu() {
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/login");
  }

  return (
    <div className="dropdown-menu">
      <Link to="/profile">Profil Saya</Link>
      <a href="#">Ubah Premium</a>
      <Link to="/login" onClick={handleLogout}>
        Keluar
      </Link>
    </div>
  );
}

export default DropdownMenu;
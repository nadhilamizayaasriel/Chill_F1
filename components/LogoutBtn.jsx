import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth";
import "../css/logoutbtn.css";

function LogoutBtn() {
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/login");
  }

  return (
    <button className="logout-button" type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutBtn;
import React from "react";
import "../css/chilllogo.css";
import chillLogo from "../assets/chill_logo.svg";

function ChillLogo() {
  return (
    <div className="chill-logo">
      <img src={chillLogo} alt="Logo" />
      <span>CHILL</span>
    </div>
  );
}

export default ChillLogo;
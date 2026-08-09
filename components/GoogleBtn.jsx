import React from "react";
import "../css/googlebtn.css";
import googleIcon from "../assets/google-icon.svg";


function GoogleButton() {
  return (
    <button className="google-button">
      <img src={googleIcon} alt="Google Logo" />
      <span>Masuk dengan Google</span>
    </button>
  );
}

export default GoogleButton;
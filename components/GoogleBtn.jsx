import React from "react";
import "../css/googlebtn.css";

function GoogleButton() {
  return (
    <button className="google-button">
      <img src="../assets/google-icon.svg" alt="Google Logo" />
      <span>Masuk dengan Google</span>
    </button>
  );
}

export default GoogleButton;
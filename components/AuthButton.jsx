import React from "react";
import "../css/authbutton.css";

function AuthButton({ children }) {
  return (
    <button
      type="submit"
      className="auth-button"
    >
      {children}
    </button>
  );
}

export default AuthButton;
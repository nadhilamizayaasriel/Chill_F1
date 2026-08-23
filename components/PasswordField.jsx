import { useState } from "react";
import "../css/passwordfield.css";

function PasswordField({ label, placeholder, name }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-field">
      <label>{label}</label>

      <div className="password-input-wrapper">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          <span className="material-symbols-outlined icon-password">
            {showPassword ? "visibility" : "visibility_off"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default PasswordField;
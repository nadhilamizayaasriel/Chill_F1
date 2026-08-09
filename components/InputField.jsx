import React from "react";
import "../css/inputfield.css";

function InputField({ label, placeholder }) {
  return (
    <div className="input-field">
      <label>{label}</label>

      <input
        type="text"
        placeholder={placeholder}
        name="username"
        required
      />
    </div>
  );
}

export default InputField;
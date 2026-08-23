import React from "react";
import "../css/savebtn.css";

function Savebtn({ onSave }) {
  return (
    <button
      type="button"
      className="save-button"
      onClick={onSave}
    >
      <span>Simpan</span>
    </button>
  );
}

export default Savebtn;
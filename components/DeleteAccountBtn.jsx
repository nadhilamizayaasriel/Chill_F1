import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteCurrentUser } from "../utils/auth";
import { deleteUser } from "../store/redux/reducer";

import "../css/deletebtn.css";

function DeleteAccountBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus akun?",
    );

    if (!confirmed) {
      return;
    }

    const currentUser = JSON.parse(
      localStorage.getItem(
        "chill_current_user",
      ),
    );

    const result = await deleteCurrentUser();

    if (!result.success) {
      alert(result.message);
      return;
    }

    // Hapus user dari Redux
    dispatch(deleteUser(currentUser.id));

    alert("Akun berhasil dihapus.");

    navigate("/login");
  }

  return (
    <button
      className="delete-button"
      type="button"
      onClick={handleDeleteAccount}
    >
      Hapus Akun
    </button>
  );
}

export default DeleteAccountBtn;
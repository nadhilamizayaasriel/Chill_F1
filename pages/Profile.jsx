import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FieldProfile from "../components/FieldProfile";
import UserIcon from "../assets/userbadge_new.png";
import LogoutButton from "../components/LogoutBtn";
import SaveButton from "../components/Savebtn";
import CategorySection from "../components/CategorySection";
import MovieCard from "../components/MovieCard";
import DetailMovie from "../components/DetailMovie";

import {
  getCurrentUser,
  updateCurrentUser,
} from "../utils/auth";

import "../css/Profile.css";

function Profile() {
  const currentUser = getCurrentUser();

  const [username, setUsername] = useState(
    currentUser?.username || "",
  );

  const [email, setEmail] = useState(
    currentUser?.email || "",
  );

  const [password, setPassword] = useState(
    currentUser?.password || "",
  );

  // Film yang sedang dipilih
  const [selectedMovie, setSelectedMovie] =
    useState(null);

  function handleSave() {
    console.log("DATA SEBELUM SAVE:", {
      username,
      email,
      password,
    });

    const result = updateCurrentUser({
      username,
      email,
      password,
    });

    console.log("HASIL SAVE:", result);

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("Profil berhasil disimpan!");
  }

  return (
    <>
      <Navbar />

      <div className="profile-container">

        <h1 className="profile-title">
          Profil Saya
        </h1>

        <img
          className="user-icon"
          src={UserIcon}
          alt="User Icon"
        />

        <FieldProfile
          id="username"
          label="Nama Pengguna"
          placeholder="Masukkan nama pengguna"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <FieldProfile
          id="email"
          label="Email"
          placeholder="Masukkan email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <FieldProfile
          id="password"
          label="Kata Sandi"
          placeholder="Masukkan kata sandi"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <div className="button-container">

          <SaveButton
            onSave={handleSave}
          />

          <LogoutButton />

        </div>

      </div>


      {/* =========================
          DAFTAR SAYA
      ========================= */}

      <div className="daftar-movie-container">

        <CategorySection
          title="Daftar Saya"
          movies={currentUser?.myList || []}
          CardComponent={MovieCard}
          onMovieClick={setSelectedMovie}
        />

      </div>


      {/* =========================
          DETAIL MOVIE POPUP
      ========================= */}

      {selectedMovie && (
        <DetailMovie
          movie={selectedMovie}
          onClose={() =>
            setSelectedMovie(null)
          }
        />
      )}


      <Footer />
    </>
  );
}

export default Profile;
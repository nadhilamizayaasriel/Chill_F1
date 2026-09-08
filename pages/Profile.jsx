import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FieldProfile from "../components/FieldProfile";
import UserIcon from "../assets/userbadge_new.png";
import DeleteAccountBtn from "../components/DeleteAccountBtn";
import SaveButton from "../components/Savebtn";
import CategorySection from "../components/CategorySection";
import MovieCard from "../components/MovieCard";
import DetailMovie from "../components/DetailMovie";

import { useDispatch, useSelector } from "react-redux";
import useUsers from "../hooks/useUsers";

import { updateUser } from "../store/redux/reducer";

import {
  getCurrentUser,
  updateCurrentUser,
} from "../utils/auth";

import "../css/Profile.css";

function Profile() {
  const currentUser = getCurrentUser();

  const dispatch = useDispatch();

  const users = useSelector(
    (state) => state.users,
  );

  console.log("USERS DARI REDUX:", users);

  // GET USERS
  useUsers();

  // PROFILE STATE
  const [username, setUsername] = useState(
    currentUser?.username || "",
  );

  const [email, setEmail] = useState(
    currentUser?.email || "",
  );

  const [password, setPassword] = useState(
    currentUser?.password || "",
  );

  // SELECTED MOVIE
  const [selectedMovie, setSelectedMovie] =
    useState(null);

  // UPDATE USER
  async function handleSave() {
    const result = await updateCurrentUser({
      username,
      email,
      password,
    });

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch(updateUser(result.user));

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
          <SaveButton onSave={handleSave} />

          <DeleteAccountBtn />
        </div>
      </div>

      <div className="daftar-movie-container">
        <CategorySection
          title="Daftar Saya"
          movies={currentUser?.myList || []}
          CardComponent={MovieCard}
          onMovieClick={setSelectedMovie}
        />
      </div>

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
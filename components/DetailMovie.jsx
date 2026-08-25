import React, { useEffect, useState } from "react";
import ButtonStart from "./ButtonStart";
import "../css/detailmovie.css";
import {
  getCurrentUser,
  updateCurrentUser,
} from "../utils/auth";

function DetailMovie({ movie, onClose }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Untuk mengetahui apakah film ada di Daftar Saya
  const [isInMyList, setIsInMyList] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      const API_KEY = import.meta.env.VITE_TMDB_KEY;

      try {
        setLoading(true);

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=id-ID`,
        );

        const data = await response.json();

        setDetail(data);

        // Cek apakah film sudah ada di Daftar Saya
        const currentUser = getCurrentUser();

        const alreadyAdded =
          currentUser?.myList?.some(
            (item) => item.id === movie.id,
          ) || false;

        setIsInMyList(alreadyAdded);

      } catch (error) {
        console.error(
          "Gagal mengambil detail film:",
          error,
        );
      } finally {
        setLoading(false);
      }
    }

    if (movie?.id) {
      fetchDetail();
    }
  }, [movie]);


  if (loading) {
    return (
      <div className="detail-movie">
        <div className="detail-loading">
          Memuat detail film...
        </div>
      </div>
    );
  }


  if (!detail) {
    return null;
  }

  function handleToggleMyList() {
    const currentUser = getCurrentUser();

    // Belum login
    if (!currentUser) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    const currentList = currentUser.myList || [];

    const alreadyAdded = currentList.some(
      (item) => item.id === detail.id,
    );


    let updatedList;


    // =========================
    // HAPUS
    // =========================

    if (alreadyAdded) {
      updatedList = currentList.filter(
        (item) => item.id !== detail.id,
      );

    }

    // =========================
    // TAMBAH
    // =========================

    else {
      const movieToSave = {
        id: detail.id,
        title: detail.title,
        image: detail.poster_path
          ? `https://image.tmdb.org/t/p/w500${detail.poster_path}`
          : movie.image,
      };

      updatedList = [
        ...currentList,
        movieToSave,
      ];
    }


    // =========================
    // UPDATE LOCAL STORAGE
    // =========================

    const result = updateCurrentUser({
      myList: updatedList,
    });


    if (!result.success) {
      alert(result.message);
      return;
    }


    // Update tampilan tombol
    setIsInMyList(!alreadyAdded);
  }


  return (
    <div className="detail-movie">

      <div className="detail-modal">

        {/* =========================
            HERO
        ========================= */}

        <div className="hero-section">

          <img
            src={
              detail.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${detail.backdrop_path}`
                : movie.image
            }
            alt={detail.title}
          />


          {/* CLOSE */}

          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">
              close
            </span>
          </button>


          {/* CONTENT */}

          <div className="hero-content">

            <h1>{detail.title}</h1>


            <div className="button-container">

              <ButtonStart />


              {/* =========================
                  DAFTAR SAYA
              ========================= */}

              <button
                type="button"
                className="btn-add"
                onClick={handleToggleMyList}
                aria-label={
                  isInMyList
                    ? "Hapus dari Daftar Saya"
                    : "Tambahkan ke Daftar Saya"
                }
              >
                <span className="material-symbols-outlined">
                  {isInMyList ? "check" : "add"}
                </span>
              </button>


              {/* =========================
                  MUTE
              ========================= */}

              <button
                type="button"
                className="btn-mute"
                aria-label="Mute"
              >
                <span className="material-symbols-outlined">
                  volume_up
                </span>
              </button>

            </div>

          </div>

        </div>


        {/* =========================
            INFO
        ========================= */}

        <div className="movie-info">

          <div className="movie-description">

            <div className="movie-meta">

              <span>
                {detail.release_date || "-"}
              </span>

              <span>
                ⭐{" "}
                {detail.vote_average
                  ? detail.vote_average.toFixed(1)
                  : "-"}
              </span>

            </div>


            <p>
              {detail.overview ||
                "Tidak ada deskripsi film."}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DetailMovie;
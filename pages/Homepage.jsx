// import React, { useEffect, useState } from "react";

// import CategorySection from "../components/CategorySection";
// import MovieCard from "../components/MovieCard";
// import PotraitMovieCard from "../components/PotraitMovieCard";
// import Navbar from "../components/Navbar";
// import HeroBanner from "../components/HeroBanner";
// import Footer from "../components/Footer";

// import { useState } from "react";
// import DetailMovie from "../components/DetailMovie";


// function Homepage() {
//   const [continueMovies, setContinueMovies] = useState([]);
//   const [topMovies, setTopMovies] = useState([]);
//   const [trendingMovies, setTrendingMovies] = useState([]);
//   const [upcomingMovies, setUpcomingMovies] = useState([]);

//   useEffect(() => {
//     const API_KEY = import.meta.env.VITE_TMDB_KEY;

//     if (!API_KEY) {
//       setContinueMovies([]);
//       setTopMovies([]);
//       setTrendingMovies([]);
//       setUpcomingMovies([]);
//       return;
//     }

//     async function loadAll() {
//       const urls = {
//         popular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=id-ID`,
//         top: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=id-ID`,
//         trending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=id-ID`,
//         upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=id-ID`,
//       };

//       try {
//         const [popularRes, topRes, trendingRes, upcomingRes] =
//           await Promise.all(
//             [urls.popular, urls.top, urls.trending, urls.upcoming].map((u) =>
//               fetch(u).then((r) => r.json()),
//             ),
//           );

//         const popular = Array.isArray(popularRes.results)
//           ? popularRes.results
//           : [];
//         const top = Array.isArray(topRes.results) ? topRes.results : [];
//         const trending = Array.isArray(trendingRes.results)
//           ? trendingRes.results
//           : [];
//         const upcoming = Array.isArray(upcomingRes.results)
//           ? upcomingRes.results
//           : [];

//         // // continueMovies
//         // setContinueMovies(
//         //   popular
//         //     .filter((m) => m.backdrop_path)
//         //     .slice(0, 10)
//         //     .map((m, i) => ({
//         //       id: m.id,
//         //       title: m.title,
//         //       image: `https://image.tmdb.org/t/p/w1280${m.backdrop_path}`,
//         //       vote_average: m.vote_average,
//         //       progress: [65, 40, 78, 25, 90, 35, 55, 70, 45, 82][i],
//         //     })),
//         // );

//         // topMovies
//         const topSlice = top
//           .filter((m) => m.poster_path)
//           .slice(0, 10)
//           .map((m, i) => ({
//             id: m.id,
//             title: m.title,
//             image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
//             badge: "TOP",
//             rank: i + 1,
//           }));
//         setTopMovies(topSlice);

//         // upcomingMovies
//         const upcomingSlice = upcoming
//           .filter((m) => m.poster_path)
//           .slice(0, 10)
//           .map((m) => ({
//             id: m.id,
//             title: m.title,
//             image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
//             badge: "Episode Baru",
//           }));
//         setUpcomingMovies(upcomingSlice);

//         const topIds = new Set(topSlice.map((m) => m.id));
//         const upcomingIds = new Set(upcomingSlice.map((m) => m.id));
//         // fallback: also index top titles (normalized) to match when ids differ
//         const normalize = (s) =>
//           (s || "")
//             .toString()
//             .toLowerCase()
//             .replace(/[^a-z0-9]+/g, "")
//             .trim();
//         const topTitles = new Set(topSlice.map((m) => normalize(m.title)));

//         setTrendingMovies(
//           trending
//             .filter((m) => m.poster_path)
//             .slice(0, 10)
//             .map((m) => {
//               const base = {
//                 id: m.id,
//                 title: m.title,
//                 image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
//               };
//               // prefer id match
//               if (topIds.has(m.id)) return { ...base, badge: "TOP" };
//               // fallback to title match
//               if (topTitles.has(normalize(m.title)))
//                 return { ...base, badge: "TOP" };
//               if (upcomingIds.has(m.id))
//                 return { ...base, badge: "Episode Baru" };
//               return base;
//             }),
//         );
//       } catch (err) {
//         console.error("Failed to load movies", err);
//       }
//     }

//     loadAll();
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <HeroBanner />

//       {/* MELANJUTKAN MENONTON
//       <CategorySection
//         title="Melanjutkan Menonton"
//         movies={continueMovies}
//         CardComponent={MovieCard}
//       /> */}

//       {/* TOP RATING */}
//       <CategorySection
//         title="Top Rating Film & Series Hari Ini"
//         movies={topMovies}
//         CardComponent={PotraitMovieCard}
//       />

//       {/* TRENDING */}
//       <CategorySection
//         title="Film Trending"
//         movies={trendingMovies}
//         CardComponent={PotraitMovieCard}
//       />

//       {/* RILIS BARU */}
//       <CategorySection
//         title="Rilis Baru"
//         movies={upcomingMovies}
//         CardComponent={PotraitMovieCard}
//       />

//       <Footer/>
//     </>
//   );
// }

// export default Homepage;


import React, { useEffect, useState } from "react";

import CategorySection from "../components/CategorySection";
import MovieCard from "../components/MovieCard";
import PotraitMovieCard from "../components/PotraitMovieCard";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";
import DetailMovie from "../components/DetailMovie";

function Homepage() {
  const [continueMovies, setContinueMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  // Movie yang sedang dipilih
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_TMDB_KEY;

    if (!API_KEY) {
      setContinueMovies([]);
      setTopMovies([]);
      setTrendingMovies([]);
      setUpcomingMovies([]);
      return;
    }

    async function loadAll() {
      const urls = {
        popular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=id-ID`,
        top: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=id-ID`,
        trending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=id-ID`,
        upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=id-ID`,
      };

      try {
        const [
          popularRes,
          topRes,
          trendingRes,
          upcomingRes,
        ] = await Promise.all(
          [
            urls.popular,
            urls.top,
            urls.trending,
            urls.upcoming,
          ].map((u) =>
            fetch(u).then((r) => r.json())
          )
        );

        const popular = Array.isArray(
          popularRes.results
        )
          ? popularRes.results
          : [];

        const top = Array.isArray(topRes.results)
          ? topRes.results
          : [];

        const trending = Array.isArray(
          trendingRes.results
        )
          ? trendingRes.results
          : [];

        const upcoming = Array.isArray(
          upcomingRes.results
        )
          ? upcomingRes.results
          : [];

        /*
         * =========================
         * CONTINUE MOVIES
         * =========================
         */

        // Kalau nanti mau dipakai lagi,
        // tinggal aktifkan bagian ini.

        /*
        setContinueMovies(
          popular
            .filter((m) => m.backdrop_path)
            .slice(0, 10)
            .map((m, i) => ({
              id: m.id,
              title: m.title,
              image: `https://image.tmdb.org/t/p/w1280${m.backdrop_path}`,
              vote_average: m.vote_average,
              progress: [
                65,
                40,
                78,
                25,
                90,
                35,
                55,
                70,
                45,
                82,
              ][i],
            }))
        );
        */

        /*
         * =========================
         * TOP MOVIES
         * =========================
         */

        const topSlice = top
          .filter((m) => m.poster_path)
          .slice(0, 10)
          .map((m, i) => ({
            id: m.id,
            title: m.title,
            image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
            badge: "TOP",
            rank: i + 1,
          }));

        setTopMovies(topSlice);

        /*
         * =========================
         * UPCOMING MOVIES
         * =========================
         */

        const upcomingSlice = upcoming
          .filter((m) => m.poster_path)
          .slice(0, 10)
          .map((m) => ({
            id: m.id,
            title: m.title,
            image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
            badge: "Episode Baru",
          }));

        setUpcomingMovies(upcomingSlice);

        /*
         * =========================
         * TRENDING MOVIES
         * =========================
         */

        const topIds = new Set(
          topSlice.map((m) => m.id)
        );

        const upcomingIds = new Set(
          upcomingSlice.map((m) => m.id)
        );

        const normalize = (s) =>
          (s || "")
            .toString()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "")
            .trim();

        const topTitles = new Set(
          topSlice.map((m) =>
            normalize(m.title)
          )
        );

        const trendingSlice = trending
          .filter((m) => m.poster_path)
          .slice(0, 10)
          .map((m) => {
            const base = {
              id: m.id,
              title: m.title,
              image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
            };

            // Kalau ada di Top
            if (topIds.has(m.id)) {
              return {
                ...base,
                badge: "TOP",
              };
            }

            // Fallback berdasarkan judul
            if (
              topTitles.has(
                normalize(m.title)
              )
            ) {
              return {
                ...base,
                badge: "TOP",
              };
            }

            // Kalau ada di Upcoming
            if (upcomingIds.has(m.id)) {
              return {
                ...base,
                badge: "Episode Baru",
              };
            }

            return base;
          });

        setTrendingMovies(trendingSlice);
      } catch (err) {
        console.error(
          "Failed to load movies",
          err
        );
      }
    }

    loadAll();
  }, []);

  return (
    <>
      <Navbar />

      <HeroBanner />

      {/* =========================
          MELANJUTKAN MENONTON
      ========================= */}

      {/*
      <CategorySection
        title="Melanjutkan Menonton"
        movies={continueMovies}
        CardComponent={MovieCard}
        onMovieClick={(movie) =>
          setSelectedMovie(movie)
        }
      />
      */}

      {/* =========================
          TOP RATING
      ========================= */}

      <CategorySection
        title="Top Rating Film & Series Hari Ini"
        movies={topMovies}
        CardComponent={PotraitMovieCard}
        onMovieClick={(movie) =>
          setSelectedMovie(movie)
        }
      />

      {/* =========================
          TRENDING
      ========================= */}

      <CategorySection
        title="Film Trending"
        movies={trendingMovies}
        CardComponent={PotraitMovieCard}
        onMovieClick={(movie) =>
          setSelectedMovie(movie)
        }
      />

      {/* =========================
          RILIS BARU
      ========================= */}

      <CategorySection
        title="Rilis Baru"
        movies={upcomingMovies}
        CardComponent={PotraitMovieCard}
        onMovieClick={(movie) =>
          setSelectedMovie(movie)
        }
      />

      {/* =========================
          DETAIL MOVIE
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

export default Homepage;
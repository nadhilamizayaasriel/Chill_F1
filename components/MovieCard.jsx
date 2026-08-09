import React from "react";
import "../css/moviecard.css";

function MovieCard({
  title,
  image,
  rating,
  progress,
}) {
  return (
    <div className="card-movie">

      <img
        src={image}
        alt={title}
      />

      <div className="title-wrapper">

        <p className="title-movie">
          <b>{title}</b>
        </p>

        <p className="rate">
          <span className="material-symbols-outlined">
            star
          </span>

          {rating}/5
        </p>

      </div>

      {progress !== undefined && (
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      )}

    </div>
  );
}

export default MovieCard;
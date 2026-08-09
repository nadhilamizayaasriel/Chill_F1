import React, { useRef } from "react";
import "../css/category.css";

function CategorySection({ title, movies, CardComponent }) {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  return (
    <section className="category">
      <h3>{title}</h3>

      <div className="movie-list">
        <button
          className="nav-btn left-btn"
          aria-label="Scroll ke kiri"
          onClick={scrollLeft}
        >
          <span className="material-symbols-outlined">
            arrow_back
          </span>
        </button>

        <div className="carousel-wrap" ref={carouselRef}>
          {movies.map((m) => (
            <CardComponent
              key={m.id}
              title={m.title}
              image={m.image}
              rating={m.vote_average}
              badge={m.badge}
              rank={m.rank}
              progress={m.progress}
            />
          ))}
        </div>

        <button
          className="nav-btn right-btn"
          aria-label="Scroll ke kanan"
          onClick={scrollRight}
        >
          <span className="material-symbols-outlined">
            arrow_forward
          </span>
        </button>
      </div>
    </section>
  );
}

export default CategorySection;
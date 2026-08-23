import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import "../css/category.css";

function CategorySection({
  title,
  movies,
  CardComponent,
  onMovieClick,
}) {
  const carouselRef = useRef(null);

  const [canScroll, setCanScroll] = useState(false);
  const [canScrollLeft, setCanScrollLeft] =
    useState(false);
  const [canScrollRight, setCanScrollRight] =
    useState(false);


  // =========================
  // CEK APAKAH PERLU SCROLL
  // =========================

  const checkScroll = () => {
    const element = carouselRef.current;

    if (!element) return;

    const hasOverflow =
      element.scrollWidth > element.clientWidth + 1;

    setCanScroll(hasOverflow);

    setCanScrollLeft(
      element.scrollLeft > 0
    );

    setCanScrollRight(
      element.scrollLeft + element.clientWidth <
        element.scrollWidth - 1
    );
  };


  // =========================
  // CEK SAAT MOVIE BERUBAH
  // =========================

  useEffect(() => {
    checkScroll();

    const element = carouselRef.current;

    if (!element) return;

    element.addEventListener(
      "scroll",
      checkScroll
    );

    window.addEventListener(
      "resize",
      checkScroll
    );

    return () => {
      element.removeEventListener(
        "scroll",
        checkScroll
      );

      window.removeEventListener(
        "resize",
        checkScroll
      );
    };
  }, [movies]);


  // =========================
  // SCROLL KIRI
  // =========================

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };


  // =========================
  // SCROLL KANAN
  // =========================

  const scrollRight = () => {
    carouselRef.current?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };


  // =========================
  // MOVIE KOSONG
  // =========================

  if (!movies || movies.length === 0) {
    return (
      <section className="category">
        <h3>{title}</h3>
      </section>
    );
  }


  return (
    <section className="category">

      <h3>{title}</h3>


      <div className="movie-list">

        {/* =========================
            ARROW KIRI
        ========================= */}

        {canScroll && canScrollLeft && (
          <button
            className="nav-btn left-btn"
            aria-label="Scroll ke kiri"
            onClick={scrollLeft}
          >
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </button>
        )}


        {/* =========================
            MOVIE
        ========================= */}

        <div
          className="carousel-wrap"
          ref={carouselRef}
        >

          {movies.map((m) => (
            <CardComponent
              key={m.id}
              id={m.id}
              title={m.title}
              image={m.image}
              rating={m.vote_average}
              badge={m.badge}
              rank={m.rank}
              progress={m.progress}
              onClick={
                onMovieClick
                  ? () => onMovieClick(m)
                  : undefined
              }
            />
          ))}

        </div>


        {/* =========================
            ARROW KANAN
        ========================= */}

        {canScroll && canScrollRight && (
          <button
            className="nav-btn right-btn"
            aria-label="Scroll ke kanan"
            onClick={scrollRight}
          >
            <span className="material-symbols-outlined">
              arrow_forward
            </span>
          </button>
        )}

      </div>

    </section>
  );
}

export default CategorySection;
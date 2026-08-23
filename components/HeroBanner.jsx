import React, { useState } from "react";
import openingImage from "../assets/opening-image.png";
import "../css/hero.css";
import ButtonStart from "./ButtonStart";

function HeroBanner() {
  const [isMuted, setIsMuted] = useState(false); // tambahkan state

  return (
    <section className="hero-section">
      <img src={openingImage} alt="Hero Image" />
      <div className="hero-content">
        <div className="text-wrapper">
          <h1>Duty After School</h1>
          <p>
            Sebuah benda tak dikenal mengambil alih dunia. Dalam Keputusaan,
            Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk
            siswa sekolah menengah. Mereka pun segara menjadi pejuang garis
            depan dalam perang.
          </p>
        </div>
        <div className="hero-btn-wrapper">
          <div className="btn-wrapper">
            <ButtonStart />
            <button className="btn-info">
              <span className="material-symbols-outlined">info</span>
              Selengkapnya
            </button>
            <div className="age-badge">18+</div>
          </div>

          {/* tombol mute/unmute */}
          <button
            className="mute-btn"
            aria-label={isMuted ? "Nyalakan suara" : "Matikan suara"}
            onClick={() => setIsMuted(!isMuted)}
          >
            <span className="material-symbols-outlined icon-muted">
              {isMuted ? "volume_off" : "volume_up"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;

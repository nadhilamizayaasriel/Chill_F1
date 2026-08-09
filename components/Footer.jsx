import React from "react";
import logo from "../assets/chill_logo.svg";
import "../css/footer.css";

function Footer() {
  return (
    <footer>
      <div className="logo-copyright">
        <div className="wrap-logo">
          <img src={logo} alt="logo-image" />
          <span>
            <b>CHILL</b>
          </span>
        </div>
        <span>@2023 Chill All Rights Reserved.</span>
      </div>
      <div className="wrapper-menu">
        <div className="genre-section">
          <h3>Genre</h3>
          <div className="genre-list">
            <span>Aksi</span>
            <span>Drama</span>
            <span>Komedi</span>
            <span>Sains & Alam</span>
            <span>Anak-anak</span>
            <span>Fantasi Ilmiah & Fantasi</span>
            <span>Petualangan</span>
            <span>Thriller</span>
            <span>Anime</span>
            <span>Kejahatan</span>
            <span>Perang</span>
            <span>Britania</span>
            <span>KDrama</span>
            <span>Romantis</span>
          </div>
        </div>
        <div className="footer-help">
          <h3>
            <b>Bantuan</b>
          </h3>
          <div className="help-list">
            <span>FAQ</span>
            <span>Kontak Kami</span>
            <span>Privasi</span>
            <span>Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

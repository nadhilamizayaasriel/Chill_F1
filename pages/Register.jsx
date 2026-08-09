import ChillLogo from "../components/ChillLogo";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import AuthButton from "../components/AuthButton";
import GoogleBtn from "../components/GoogleBtn";

import "../css/register.css";

function Register() {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    console.log(username);
    console.log(password);
    console.log(confirmPassword);
  }

  return (
    <main className="Register-page">
      <div className="Register-card">
        <ChillLogo />

        <div className="group-text">
          <h1>Daftar</h1>
          <p>Selamat datang</p>
        </div>
        <form onSubmit={handleSubmit}>
          <InputField label="Username" placeholder="Masukkan username" />

          <PasswordField label="Kata Sandi" placeholder="Masukkan kata sandi" />

          <PasswordField label="Konfirmasi Kata Sandi" placeholder="Konfirmasi kata sandi" />

          <div className="auth-links">
            <span>
              Sudah punya akun? <a className="register-link" href="/login">Masuk</a>
            </span>

            <a className="forgot-password-link" href="/forgot-password">
              Lupa kata sandi?
            </a>
          </div>

          <AuthButton>Daftar</AuthButton>
        </form>

        <p>Atau</p>

        <GoogleBtn />
      </div>
    </main>
  );
}

export default Register;

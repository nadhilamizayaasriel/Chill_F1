import ChillLogo from "../components/ChillLogo";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import AuthButton from "../components/AuthButton";
import GoogleBtn from "../components/GoogleBtn";

import "../css/login.css";

function Login() {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const username = formData.get("username");
    const password = formData.get("password");

    console.log(username);
    console.log(password);
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <ChillLogo />

        <div className="group-text">
          <h1>Masuk</h1>
          <p>Selamat datang kembali!</p>
        </div>
        <form onSubmit={handleSubmit}>
          <InputField label="Username" placeholder="Masukkan username" />

          <PasswordField label="Kata Sandi" placeholder="Masukkan kata sandi" />

          <div className="auth-links">
            <span>
              Belum punya akun? <a className="register-link" href="/register">Daftar</a>
            </span>

            <a className="forgot-password-link" href="/forgot-password">
              Lupa kata sandi?
            </a>
          </div>

          <AuthButton>Masuk</AuthButton>
        </form>

        <p>Atau</p>

        <GoogleBtn />
      </div>
    </main>
  );
}

export default Login;

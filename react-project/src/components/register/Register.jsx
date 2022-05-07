import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import informationPicture from "./../../assets/logo/google-icon.png";
import logo from "./../../assets/logo/logo-stadia.png";
import "./Register.css";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  let avatar = useRef();

  const register = (event) => {
    event.preventDefault();

    let registerUser = async () => {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("avatar", avatar.current.files[0]);

      let res = await axios.post("http://localhost:8000/users/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
    };

    if (password === confirmPassword) {
      registerUser();
    }
  };

  return (
    <div className="Login">
      <div className="fixed-login">
        <Link className="hello-23" to="/">
          <img src={logo} alt="fixed-logo" />
          <div className="hover-img">OU Jobs</div>
        </Link>
      </div>
      <div className="my-login-api">
        <div className="login-form-header">
          <h1>Đăng ký</h1>
          <div>
            <div>
              <img src={informationPicture} alt="informationPicture" />
              <p id="login-google">Đăng nhập bằng Google</p>
            </div>
          </div>
        </div>
        <div className="login-form-footer">
          <div>
            <form id="my-my-form" onSubmit={register}>
              <label htmlFor="login-username">Tên đăng nhập</label>
              <input
                type="text"
                name="login-username"
                id="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="login-email">Email</label>
              <input
                type="text"
                name="login-email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="login-passwork">Mật khẩu</label>
              <input
                type="password"
                name="login-passwork"
                id="login-passswork"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="login-passwork-1">Nhập lại mật khẩu</label>
              <input
                type="password"
                name="login-passwork-1"
                id="login-passswork-1"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="login-avatar-1">Avatar</label>
              <input
                type="file"
                ref={avatar}
                id="login-avatar-1"
                name="login-avatar-1"
              />
              <button type="submit" className="login-form-button">
                Đăng ký
              </button>
            </form>
          </div>
          <div className="next-login">
            <div>Bạn đã có tài khoản?</div>
            <Link to="/login">Đăng nhập</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

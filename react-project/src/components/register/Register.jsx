import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import informationPicture from "./../../assets/logo/google-icon.png";
import logo from "./../../assets/logo/logo-stadia.png";
import "./Register.css";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let avatar = useRef();
  const [temp, setTemp] = useState("");
  const [error, setError] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const register = (event) => {
    event.preventDefault();

    let registerUser = async () => {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("avatar", avatar.current.files[0]);

      let res = await axios
        .post("http://localhost:8000/users/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch(function (error) {
          // console.log(error.response.status);
          if (error.response) {
            setError(error.response.status);
          }
        });
      console.log(error);
      console.log(res.data);
    };

    if (password === confirmPassword) {
      registerUser();
    }
  };

  let errorPath = (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chúc mừng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, tạo tài khoản thành công!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  if (error === 400) {
    errorPath = (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Alo Alo</Modal.Title>
          </Modal.Header>
          <Modal.Body>Username bị trùng xin hãy chọn username khác!</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  const showError = () => {
    handleShow();
  };

  let buttonPath = (
    <>
      <button disabled type="submit" className="login-form-button">
        Đăng ký
      </button>
    </>
  );

  if (
    username !== "" &&
    email !== "" &&
    password !== "" &&
    confirmPassword !== "" &&
    firstName !== "" &&
    lastName !== "" &&
    temp !== ""
  ) {
    if (password !== confirmPassword) {
      buttonPath = (
        <>
          <button disabled type="submit" className="login-form-button">
            Mật khẩu nhập sai
          </button>
        </>
      );
    } else {
      buttonPath = (
        <>
          <button
            type="submit"
            className="login-form-button "
            onClick={() => showError()}
          >
            Đăng ký
          </button>
        </>
      );
    }
  }

  return (
    <div className="Login">
      {errorPath}
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
              <label htmlFor="login-first-name">Tên</label>
              <input
                type="text"
                name="login-first-name"
                id="login-first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <label htmlFor="login-last-name">Họ</label>
              <input
                type="text"
                name="login-last-name"
                id="login-last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                onChange={(e) => setTemp(e.target.value)}
                id="login-avatar-1"
                name="login-avatar-1"
              />
              {buttonPath}
              {/* <button type="submit" className="login-form-button">
                Đăng ký
              </button> */}
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

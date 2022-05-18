import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import cookie from "react-cookies";

import axios from "axios";

import { loginUser } from "../../ActionCreater";

import "./Login.css";

import informationPicture from "./../../assets/logo/google-icon.png";
import logo from "./../../assets/logo/logo-stadia.png";

import FirebaseInit from "../../firebase/FirebaseInit";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { Button, Modal } from "react-bootstrap";

function Login() {
  FirebaseInit();

  const provider = new GoogleAuthProvider();
  const handleGoogleSignedIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider).then((result) => {
      console.log(result.user);
    });
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const history = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      let info = await axios.get(
        "http://tranlehuynh.pythonanywhere.com/oauth2/"
      );
      let token = await axios
        .post("http://tranlehuynh.pythonanywhere.com/o/token/", {
          client_id: info.data.client_id,
          client_secret: info.data.client_secret,
          username: username,
          password: password,
          grant_type: "password",
        })
        .catch(function (error) {
          console.log(error.response.status);
          if (error.response.status === 400) {
            handleShow();
          }
        });

      // localStorage.setItem("token", token.data.access_token);
      cookie.save("token", token.data.access_token);
      let userLogin = await axios.get(
        "http://tranlehuynh.pythonanywhere.com/users/current-user/",
        {
          headers: {
            Authorization: `Bearer ${cookie.load("token")}`,
          },
        }
      );
      // localStorage.setItem("user", userLogin.data);
      cookie.save("user", userLogin.data);
      dispatch(loginUser(userLogin.data));

      history("/");
    } catch (error) {
      console.log(error);
    }
  };

  let errorPath = (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ups!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn đã nhập sai tài khoản hoặc mật khẩu!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Logout");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Login">
      {errorPath}
      <div className="fixed-login">
        <Link className="hello-23" to="/">
          <img src={logo} alt="fixed-logo" />
          <div className="hover-img">OU Job</div>
        </Link>
      </div>

      <div className="my-login-api">
        <div className="login-form-header">
          <h1>Đăng nhập</h1>
          <div>
            <div onClick={handleGoogleSignedIn}>
              <img src={informationPicture} alt="informationPicture" />
              <p id="login-by-google">Đăng nhập bằng Google</p>
            </div>
            <div onClick={handleLogOut}>Logout Google</div>
          </div>
        </div>

        <div className="login-form-footer">
          <h2>hoặc đăng nhập bằng</h2>
          <div>
            <form id="my-my-form" action="" onSubmit={login}>
              <label htmlFor="login-username">Tên đăng nhập</label>
              <input
                type="text"
                name="login-username"
                id="login-username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="login-passwork">Mật khẩu</label>
              <input
                type="password"
                name="login-passwork"
                id="login-passswork"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="login-form-button">
                Đăng nhập
              </button>
            </form>
          </div>
          {/* <button onClick={handleGoogleSignedIn}>Đăng nhập với Google</button> */}

          <div className="next-login">
            <div>Bạn chưa có tài khoản?</div>
            <Link to="/register">Đăng ký</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

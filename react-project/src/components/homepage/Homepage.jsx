import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cookie from "react-cookies";
import { Form, FormControl, Pagination, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Homepage.css";

import { logoutUser } from "../../ActionCreater";

import logoPicture from "./../../assets/logo/logo-stadia.png";
import informationPicture from "./../../assets/logo/google-icon.png";
import homeTeamWorkPicture from "./../../assets/svg-images/home-teamworks.svg";
import Footer from "../footer/Footer";
import Api, { endpoints } from "../../api/Api";

function Homepage() {
  const [jobs, setJobs] = useState([]);
  const [count, setCount] = useState(0);
  const [kw, setKw] = useState("");
  const [test, myTest] = useState([]);
  const nav = useNavigate();
  const loginForm = useRef();

  const [getPageURL] = useSearchParams();
  const pageURL = getPageURL.get("page");

  const APIJobs = "http://localhost:8000/jobs/";

  const myDispatch = useDispatch();

  const logOut = (event) => {
    event.preventDefault();
    cookie.remove("token");
    cookie.remove("user");
    myDispatch(logoutUser());
  };

  let path;
  let loginPath = (
    <>
      <div className="right-navigation">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={clickLoginForm}
          className="user-control"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <div className="" ref={loginForm}>
          <div id="my-div-login">Đăng nhập</div>
          <div className="user-login">
            <div className="user-login-1">
              <img src={informationPicture} alt="informationPicture" />
              <div>Đăng nhập bằng Google</div>
            </div>
          </div>
          <div className="my-login">
            <Link to="/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="login-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <div>Đăng nhập</div>
            </Link>
          </div>
          <div className="create-login">
            <Link to="/register">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="login-add"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <div>Đăng ký tài khoản</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
  const user = useSelector((state) => state.user.user);
  if (user !== null && user !== undefined) {
    loginPath = (
      <>
        <div className="right-navigation mt-2">
          <Link
            to="/"
            className="text-decoration-none"
            style={{ color: "#d9d9d9" }}
          >
            {user.username}
          </Link>
        </div>
      </>
    );
    path = (
      <>
        <li>
          <Link to="/" onClick={logOut}>
            Đăng xuất
          </Link>
        </li>
      </>
    );
  }

  const jobsAPI = (page = "?page=1") => {
    axios.get(`${APIJobs}${page}`).then((response) => {
      const data = response.data.results.sort((a, b) => b.id - a.id);
      setJobs(data);
      myTest(data);
      setCount(response.data.count);
    });
  };

  useEffect(() => {
    if (pageURL != null) {
      jobsAPI(`${"?page="}${pageURL}`);
    }
  }, [pageURL]);

  //Pagination Count
  let countPage = [];
  for (let i = 1; i <= Math.ceil(count / 10); i++) {
    countPage.push(
      // <Pagination.Item key={i}>
      //   <Link to={"/?page=" + (i + 1)}>{i + 1}</Link>
      // </Pagination.Item>
      <div className="page-item" key={i}>
        <Link className="page-link" to={"/?page=" + (i + 1)}>
          {i + 1}
        </Link>
      </div>
    );
  }

  //Click to show login form
  function clickLoginForm() {
    loginForm.current.classList.toggle("form-login");
  }
  const search = (e) => {
    e.preventDefault();

    nav(`/?kw=${kw}`);

    axios.get(`http://127.0.0.1:8000/jobs/?kw=${kw}`).then((response) => {
      setJobs(response.data.results);
      setCount(response.data.count);
    });
  };

  const resetData = () => {
    setJobs(test);
  };

  const searchFulltime = async () => {
    const res = jobs.filter((job) => job.id === 1);
    console.log(res);
    setJobs(res);
  };

  const searchParttime = async () => {
    const res = await jobs.filter((job) => job.id === 2);
    console.log(res);
    setJobs(res);
  };

  const searchAll = () => {
    setJobs(test);
  };
  return (
    <div className="homepage">
      <nav className="navigation">
        <div className="logo">
          <img src={logoPicture} alt="logoPicture"></img>
        </div>
        <div className="my-navigation">
          <ul>
            <li>
              <a href="/#">
                <img
                  id="myLogoPicture"
                  src={logoPicture}
                  alt="logoPicture"
                ></img>
              </a>
            </li>
            <li>
              <a href="/#">Việc làm</a>
            </li>
            <li>
              <a href="/#">Về chúng tôi</a>
            </li>
            <li>
              <Link to="/employer-register">Nhà tuyển dụng</Link>
            </li>
            {path}
          </ul>
        </div>
        {loginPath}
      </nav>
      <div className="banner">
        <div className="banner-text">
          <h2>Giúp kết nối doanh nghiệp và người lao động</h2>
          <p>Tìm kiếm việc làm đúng với nhu cầu</p>
        </div>
        <div className="banner-image">
          <img src={homeTeamWorkPicture} alt="home-teamwork.svg" />
        </div>
      </div>

      <div className="offer-text">
        <h1>Chúng tôi cung cấp</h1>
        <p>
          Chúng tôi cung cấp giải pháp việc, kết nối dễ dàng giữa nhà tuyển dụng
          và người lao động
        </p>
      </div>
      <div className="input">
        <Form className="d-flex" onSubmit={search}>
          <FormControl
            type="search"
            value={kw}
            onChange={(event) => setKw(event.target.value)}
            placeholder="Tìm kiếm việc làm..."
            className="me-2"
            aria-label="Search"
          />
          <Button type="submit" variant="outline-dark">
            Tìm
          </Button>
        </Form>
      </div>

      <div className="jobs-find">
        <div className="jobs-nav">
          <h2>Việc làm đang tuyển</h2>
          <ul>
            <li>
              <div onClick={searchAll}>Tất cả</div>
            </li>
            <li>
              <div
                onClick={() => {
                  jobsAPI(`${"?page="}${pageURL}`);
                  searchParttime();
                }}
              >
                Bán thời gian
              </div>
            </li>
            <li>
              <div onClick={searchFulltime}>Toàn thời gian</div>
            </li>
          </ul>
        </div>

        <div className="jobs-many-many mt-3">
          <div className="jobs-detail">
            {jobs.map((job) => {
              let jobId = job.id;
              let url = `/job-detail/${jobId}`;
              return (
                <Link
                  to={url}
                  className="job-detail text-decoration-none"
                  style={{ color: "black" }}
                  key={job.id}
                >
                  <div className="job-header">{job.job_name}</div>
                  <div className="job-main">{job.company.company_name}</div>
                  <div className="job-footer">
                    <div className="job-footer-section">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="location-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>{job.company.address}</div>
                    </div>
                    <div className="job-footer-section">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="cash"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      <div>9 triệu</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div>
            <Pagination>
              <div className="page-item">
                <Link className="page-link" to={"/?page=1"}>
                  {1}
                </Link>
              </div>
              {countPage}
            </Pagination>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;

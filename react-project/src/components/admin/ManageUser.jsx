import { Button, Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faCircleInfo,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import image from "../../assets/logo/logo-stadia.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import cookie from "react-cookies";
import { logoutUser } from "../../ActionCreater";
import Main from "./Main";
import ErrorPage from "../ErrorPage";

function AdminHome() {
  let path;
  let hiPath;
  const user = useSelector((state) => state.user.user);
  if (user !== null && user !== undefined) {
    hiPath = (
      <>
        <h5 className="mb-2">Hi {user.first_name + " " + user.last_name}</h5>
        <div className="mb-4">What a good day!</div>
      </>
    );
    path = (
      <>
        <Card.Img
          variant="top"
          src={user.avatar_path}
          style={{ borderRadius: "50%" }}
        />
        <Card.Body>
          <Card.Title>{user.first_name + " " + user.last_name}</Card.Title>
          <Card.Text>Administrator</Card.Text>
          {/* <div className="d-flex justify-content-around">
            <Button variant="primary">Xem hồ sơ</Button>
            <Button variant="secondary">Sửa hồ sơ</Button>
          </div> */}
        </Card.Body>
      </>
    );
  }

  const myDispatch = useDispatch();
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    cookie.remove("token");
    cookie.remove("user");
    myDispatch(logoutUser());
  };

  let userPath = <ErrorPage />;

  if (user !== null && user !== undefined) {
    if (user.role === 3) {
      userPath = (
        <>
          <Row className="w-100 mt-3">
            <Col
              className="d-flex justify-content-center border border-top-0 border-bottom-0"
              style={{ borderRadius: "10px" }}
            >
              <div>
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      src={image}
                      alt="a"
                      style={{ width: "90px", height: "90px" }}
                    />
                  </div>
                  <div>
                    <div>OU Job</div>
                    <div>Welcome</div>
                  </div>
                </div>
                <Link
                  to="/admin/manage-user"
                  style={{
                    fontSize: "20px",
                    fontWeight: "normal",
                    cursor: "pointer",
                  }}
                  className="d-flex align-items-center mt-5 text-decoration-none text-muted"
                >
                  <FontAwesomeIcon
                    icon={faTableColumns}
                    style={{ marginRight: "5px" }}
                  />
                  Quản lý nhân viên
                </Link>

                <Link
                  to="/"
                  style={{ fontSize: "20px" }}
                  className="d-flex align-items-center mt-4 text-decoration-none text-muted"
                >
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    style={{ marginRight: "5px" }}
                  />
                  Thống kê
                </Link>
                <Link
                  to="/"
                  onClick={logOut}
                  style={{ fontSize: "20px" }}
                  className="d-flex align-items-center mt-4 text-decoration-none text-muted"
                >
                  <FontAwesomeIcon
                    icon={faGear}
                    style={{ marginRight: "5px" }}
                  />
                  Đăng xuất
                </Link>
              </div>
            </Col>
            <Col
              xs={6}
              className=""
              style={{
                backgroundColor: "rgba(250,250,250,255)",
                borderRadius: "10px",
              }}
            >
              <div>
                <div>
                  <Main />
                </div>
              </div>
            </Col>
            <Col
              className="d-flex justify-content-center"
              style={{ borderRadius: "10px" }}
            >
              <div>
                {hiPath}
                <div style={{ width: "18rem" }} className="text-center">
                  {path}
                </div>

                <div className="d-flex justify-content-between">
                  <Link
                    to="/"
                    style={{
                      width: "8.5rem",
                      height: "9rem",
                      backgroundColor: "rgba(254,243,240,255)",
                    }}
                    className="mt-4 text-decoration-none"
                  >
                    <Card.Body style={{ color: "#ad796d", cursor: "pointer" }}>
                      <Card.Title>Thống kê</Card.Title>
                      <Card.Text className="d-flex">
                        <div>
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            style={{ marginRight: "5px" }}
                          />
                        </div>
                        <div>Xem số liệu thống kê</div>
                      </Card.Text>
                    </Card.Body>
                  </Link>
                  <Link
                    to="/admin/manage-user"
                    style={{
                      width: "8.5rem",
                      height: "9rem",
                      backgroundColor: "rgba(242,232,255,255)",
                    }}
                    className="mt-4 text-decoration-none"
                  >
                    <Card.Body style={{ color: "#9288c3", cursor: "pointer" }}>
                      <Card.Title>Quản lý</Card.Title>
                      <Card.Text className="d-flex">
                        <div>
                          <FontAwesomeIcon
                            icon={faTableColumns}
                            style={{ marginRight: "5px" }}
                          />
                        </div>
                        <div>Quản lý nhân viên</div>
                      </Card.Text>
                    </Card.Body>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </>
      );
    }
  }
  return <>{userPath}</>;
}

export default AdminHome;

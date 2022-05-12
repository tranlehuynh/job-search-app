import { Container, Nav, Navbar } from "react-bootstrap";
import cookie from "react-cookies";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../ActionCreater";

const Header = () => {
  let path;
  const user = useSelector((state) => state.user.user);

  const myDispatch = useDispatch();
  const logOut = () => {
    cookie.remove("token");
    cookie.remove("user");
    myDispatch(logoutUser());
  };

  if (user !== null && user !== undefined) {
    path = (
      <>
        <Link to="/" className="text-decoration-none">
          <div className="nav-link" onClick={logOut}>
            Đăng xuất
          </div>
        </Link>
      </>
    );
  }
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-start">
            <Link to="/employer" className="text-decoration-none">
              <div className="nav-link">Trang chủ</div>
            </Link>
            <Link to="/employer/employerCV" className="text-decoration-none">
              <div className="nav-link">Xem CV</div>
            </Link>
            <Link to="/employer/recruit" className="text-decoration-none">
              <div className="nav-link">Đăng tin tuyển dụng</div>
            </Link>
            <Link to="/employer/information" className="text-decoration-none">
              <div className="nav-link">Hồ sơ của tôi</div>
            </Link>
            {path}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

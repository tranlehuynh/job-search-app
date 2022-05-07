import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-start">
            <Link to="/employer">
              <div className="nav-link">Trang chủ</div>
            </Link>
            <Link to="/employer/employerCV">
              <div className="nav-link">Xem CV</div>
            </Link>
            <Link to="/employer/recruit">
              <div className="nav-link">Đăng tin tuyển dụng</div>
            </Link>
            <Link to="/employer/information">
              <div className="nav-link">Hồ sơ của tôi</div>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

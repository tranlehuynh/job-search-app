import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Admin</Navbar.Brand>
          <Nav className="me-start">
            <Link to="/admin" className="text-decoration-none">
              <div className="nav-link">Trang chủ</div>
            </Link>
            <Link to="/admin/manage-user" className="text-decoration-none">
              <div className="nav-link">Quản lý người dùng</div>
            </Link>
            <Link
              to="/admin/report-statistics"
              className="text-decoration-none"
            >
              <div className="nav-link">Thống kê, báo cáo</div>
            </Link>
            <Link to="/employer/recruit" className="text-decoration-none">
              <div className="nav-link">Welcome Admin</div>
            </Link>
            <Link to="/employer/information" className="text-decoration-none">
              <div className="nav-link">Đăng xuất</div>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

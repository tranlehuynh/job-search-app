import { Col, Container, Row } from "react-bootstrap";
import "./../homepage/Homepage.css";

const Footer = () => {
  return (
    <>
      <Container>
        <hr />
        <Row mt={5}>
          <Col md={3} xs={12}>
            <div className="footer-h3">OU Job</div>
            <div>Về OU Job</div>
            <div>Hỏi đáp</div>
          </Col>
          <Col md={3} xs={12}>
            <div className="footer-h3">Nhà tuyển dụng</div>
            <div>Liên hệ</div>
            <div>Đăng ký</div>
          </Col>
          <Col md={3} xs={12}>
            <div className="footer-h3">Việc làm theo nghề</div>
            <div>Tìm việc làm</div>
            <div>Đăng ký việc làm</div>
            <div>Việc làm hot</div>
          </Col>
          <Col md={3} xs={12}>
            <div className="footer-h3">Mạng xã hội</div>
            <div>Liên hệ</div>
            <div>Hỏi đáp</div>
          </Col>
        </Row>
        <hr />
        <Row>
          <div className="bg-white mt-2 mb-2 fs-13">
            <p className="text-center mb-0">Copyright © Huỳnh & Lộc</p>
            <p className="mb-0 text-center">
              371 Nguyễn Kiệm, quận Gò Vấp, thành phố Hồ Chí Minh
            </p>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Footer;

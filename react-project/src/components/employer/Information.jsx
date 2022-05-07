import { Button, Card } from "react-bootstrap";
import Header from "./Header";
import image from "../../assets/logo/job-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Information = () => {
  return (
    <>
      <Header />
      <div className="w-100 mt-3 d-flex justify-content-center align-items-center">
        <div>
          <div style={{ width: "18rem" }} className="text-center">
            <Card.Img variant="top" src={image} style={{ width: "200px" }} />
            <Card.Body>
              <Card.Title>Trần Lê Huỳnh</Card.Title>
              <Card.Text>tranlehuynh@gmail.com</Card.Text>
              <Button variant="primary">Cập nhật hồ sơ</Button>
            </Card.Body>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-center">
            <div className="border rounded d-flex align-items-center m-1 p-4">
              <div style={{ marginRight: "7px" }}>
                <FontAwesomeIcon
                  icon={faBriefcase}
                  style={{ fontSize: "35px" }}
                />
              </div>
              <div>
                <div>CV nộp từ ứng viên</div>
                <Link to="/1" className="text-dark">
                  Xem chi tiết
                </Link>
              </div>
            </div>
            <div className="border rounded d-flex align-items-center m-1 p-4">
              <div style={{ marginRight: "7px" }}>
                <FontAwesomeIcon
                  icon={faUserTie}
                  style={{ fontSize: "35px" }}
                />
              </div>
              <div>
                <div>Công việc đã đăng</div>
                <Link to="/1" className="text-dark">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;

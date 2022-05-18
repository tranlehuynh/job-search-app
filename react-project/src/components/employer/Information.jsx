import { Button, Card, Form, Modal } from "react-bootstrap";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPage from "../ErrorPage";
import { useEffect, useState } from "react";
import Api, { endpoints } from "../../api/Api";

const Information = () => {
  const [updateShow, setUpdateShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const handleUpdateShow = () => setUpdateShow(true);
  const handleUpdateClose = () => setUpdateShow(false);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const showUser = (firstName, lastName, email) => {
      setFirstName(firstName);
      setLastName(lastName);
      // setUsername(username);
      setEmail(email);
    };
    showUser(user.first_name, user.last_name, user.email);
  }, [user.first_name, user.last_name, user.email]);
  const updateUser = async () => {
    const res = await Api.patch(endpoints["updateUsers"](user.id), {
      first_name: firstName,
      last_name: lastName,
      // username: username,
      email: email,
    });

    user.first_name = firstName;
    user.last_name = lastName;
    user.email = email;

    handleUpdateClose();
    console.log(res.data);
    console.log(2);
  };

  let path = <ErrorPage />;
  if (user !== null && user !== undefined) {
    if (user.role === 2) {
      path = (
        <>
          <Header />
          <div className="w-100 mt-3 d-flex justify-content-center align-items-center">
            <div>
              <div style={{ width: "18rem" }} className="text-center">
                <Card.Img
                  variant="top"
                  src={user.avatar_path}
                  style={{ width: "200px" }}
                />
                <Card.Body>
                  <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                  <Button variant="primary" onClick={handleUpdateShow}>
                    Cập nhật hồ sơ
                  </Button>
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
                    <Link to="/employer/employerCV" className="text-dark">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
                {/* <div className="border rounded d-flex align-items-center m-1 p-4">
                  <div style={{ marginRight: "7px" }}>
                    <FontAwesomeIcon
                      icon={faUserTie}
                      style={{ fontSize: "35px" }}
                    />
                  </div>
                  <div>
                    <div>Công việc đã đăng</div>
                    <Link to="/employer/jobs" className="text-dark">
                      Xem chi tiết
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </>
      );
    }
  }
  return (
    <>
      <Modal show={updateShow} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicFirstName1">
              <Form.Label>Họ </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName1">
              <Form.Label>Tên </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicUsername1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicEmail1">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicAvatar1">
              <Form.Label>Avatar </Form.Label>
              <Form.Control type="file" placeholder="Chọn ảnh" />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
      {path}
    </>
  );
};

export default Information;

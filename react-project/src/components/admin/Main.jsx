import { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import Api, { endpoints } from "../../api/Api";
import MyPagination from "./Pagination";
// import { useSearchParams } from "react-router-dom";

function Main() {
  const [updateShow, setUpdateShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [user, setUser] = useState([]);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  //   const [q] = useSearchParams();

  const handleUpdateShow = () => setUpdateShow(true);
  const handleUpdateClose = () => setUpdateShow(false);
  const handleDeleteShow = () => setDeleteShow(true);
  const handleDeleteClose = () => setDeleteShow(false);

  // useEffect(() => {
  //   const loadUser = async () => {
  //     //   let query = "";
  //     //   let page = q.get("page");
  //     //     if (page != null) {
  //     //         query += `page?`
  //     //     }
  //     let response = await Api.get(endpoints["users"]);
  //     setUser(response.data.results);
  //   };
  //   loadUser();
  // }, []);

  const loadUser = async () => {
    //   let query = "";
    //   let page = q.get("page");
    //     if (page != null) {
    //         query += `page?`
    //     }
    let response = await Api.get(endpoints["users"]);
    setUser(response.data.results);
    console.log(user);
  };

  const loadEmployerRegister = async () => {
    let response = await Api.get(endpoints["users"]);
    let EmployerUser = await response.data.results.filter(
      (user) => user.role === 4
    );
    console.log(EmployerUser);
    setUser(EmployerUser);
  };

  const showUser = (id, firstName, lastName, username, email, role) => {
    setId(id);
    setFirstName(firstName);
    setLastName(lastName);
    setUsername(username);
    setEmail(email);
    setRole(role);
    handleUpdateShow();
  };

  const updateUser = async (id) => {
    let response = await Api.patch(endpoints["updateUsers"](id), {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      role: role,
    });
    handleUpdateClose();
    console.log(response.data);
  };

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
            <Form.Group className="mb-3" controlId="formBasicUsername1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRole1">
              <Form.Label>Chức vụ </Form.Label>
              <Form.Select onChange={(e) => setRole(e.target.value)}>
                <option disabled value="">
                  Chọn chức vụ...
                </option>
                <option value="1">Người dùng</option>
                <option value="2">Nhà tuyển dụng</option>
                <option value="3">Admin</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail1">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mật khẩu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateUser(id);
            }}
          >
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa thông tin người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn xóa không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleDeleteClose}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <Button
          variant="success"
          onClick={loadUser}
          className="float-end mt-5 mb-4"
          style={{ marginRight: "8px" }}
        >
          Bảng nhân viên
        </Button>
        <Button
          variant="success"
          onClick={loadEmployerRegister}
          className="float-end mt-5 mb-4"
          style={{ marginRight: "8px" }}
        >
          Ứng tuyển nhà tuyển dụng
        </Button>
        <Table striped bordered hover size="sm" className="text-center">
          <thead>
            <tr>
              <th>Họ</th>
              <th>Tên</th>
              <th>Username</th>
              <th>Email</th>
              <th>Chức vụ</th>
            </tr>
          </thead>
          <tbody>
            {user.map((u) => {
              let roleName = "Người dùng";
              if (u.role === 2) {
                roleName = "Nhà tuyển dụng";
              }
              if (u.role === 3) {
                roleName = "Admin";
              }
              if (u.role === 4) {
                roleName = "Chờ xác nhận";
              }
              return (
                <tr key={u.id}>
                  <td>{u.first_name}</td>
                  <td>{u.last_name}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{roleName}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() =>
                        showUser(
                          u.id,
                          u.first_name,
                          u.last_name,
                          u.username,
                          u.email,
                          u.role
                        )
                      }
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="danger"
                      style={{ marginLeft: "5px" }}
                      onClick={handleDeleteShow}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <MyPagination />
      </div>
    </>
  );
}

export default Main;

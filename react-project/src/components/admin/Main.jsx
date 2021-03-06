import { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Pagination } from "react-bootstrap";
import Api, { endpoints } from "../../api/Api";
import { Link, useSearchParams } from "react-router-dom";

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
  const [q] = useSearchParams();

  const [count, setCount] = useState(0);

  const handleUpdateShow = () => setUpdateShow(true);
  const handleUpdateClose = () => setUpdateShow(false);
  const handleDeleteShow = () => setDeleteShow(true);
  const handleDeleteClose = () => setDeleteShow(false);

  let pageURL = q.get("page");

  useEffect(() => {
    const loadData = async (page = "?page=1") => {
      const res = await Api.get(endpoints["users"] + `${page}`);
      console.log(res.data.results);
      setUser(res.data.results);
    };

    if (pageURL !== null) {
      loadData(`${"?page="}${pageURL}`);
    }
  }, [pageURL]);

  const loadUser = async () => {
    let response = await Api.get(endpoints["users"]);
    setUser(response.data.results);
    setCount(response.data.count);
  };

  const loadEmployerRegister = async () => {
    let response = await Api.get(endpoints["users"]);
    let EmployerUser = await response.data.results.filter(
      (user) => user.role === 4
    );
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

  const showUser2 = (id) => {
    setId(id);
    handleDeleteShow();
  };

  const updateUser = async (id) => {
    await Api.patch(endpoints["updateUsers"](id), {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      role: role,
    });
    handleUpdateClose();
  };

  const deleteUser = async (id) => {
    await Api.delete(endpoints["deleteUsers"](id));
    handleDeleteClose();
  };

  //Pagination Count
  let countPage = [];
  for (let i = 1; i <= Math.ceil(count / 10); i++) {
    countPage.push(
      <div className="page-item" key={i}>
        <Link className="page-link" to={"/admin/manage-user/?page=" + (i + 1)}>
          {i + 1}
        </Link>
      </div>
    );
  }
  return (
    <>
      <Modal show={updateShow} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>S???a th??ng tin ng?????i d??ng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicFirstName1">
              <Form.Label>H??? </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nh???p h???"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName1">
              <Form.Label>T??n </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nh???p t??n"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nh???p username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRole1">
              <Form.Label>Ch???c v??? </Form.Label>
              <Form.Select onChange={(e) => setRole(e.target.value)}>
                <option value="">Ch???n ch???c v???...</option>
                <option value="1">Ng?????i d??ng</option>
                <option value="2">Nh?? tuy???n d???ng</option>
                <option value="3">Admin</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail1">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nh???p m???t kh???u"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateClose}>
            ????ng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateUser(id);
              loadEmployerRegister();
              loadUser();
            }}
          >
            L??u thay ?????i
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>X??a th??ng tin ng?????i d??ng</Modal.Title>
        </Modal.Header>
        <Modal.Body>B???n c?? ch???c ch???n x??a kh??ng?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            ????ng
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteUser(id);
              loadEmployerRegister();
              loadUser();
            }}
          >
            X??a
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
          B???ng nh??n vi??n
        </Button>
        <Button
          variant="primary"
          onClick={loadEmployerRegister}
          className="float-end mt-5 mb-4"
          style={{ marginRight: "8px" }}
        >
          ????ng k?? nh?? tuy???n d???ng
        </Button>
        <Table striped bordered hover size="sm" className="text-center">
          <thead>
            <tr>
              <th>H???</th>
              <th>T??n</th>
              <th>Username</th>
              <th>Email</th>
              <th>Ch???c v???</th>
            </tr>
          </thead>
          <tbody>
            {user.map((u) => {
              let roleName = "Ng?????i d??ng";
              if (u.role === 2) {
                roleName = "Nh?? tuy???n d???ng";
              }
              if (u.role === 3) {
                roleName = "Admin";
              }
              if (u.role === 4) {
                roleName = "Ch??? x??c nh???n";
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
                      S???a
                    </Button>
                    <Button
                      variant="danger"
                      style={{ marginLeft: "5px" }}
                      onClick={() => {
                        showUser2(u.id);
                      }}
                    >
                      X??a
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination>
          <div className="page-item">
            <Link to="/admin/manage-user/?page=1" className="page-link">
              1
            </Link>
          </div>
          {countPage}
        </Pagination>
      </div>
    </>
  );
}

export default Main;

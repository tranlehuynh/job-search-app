import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import Api, { endpoints } from "../../api/Api";

function EmployerRegister() {
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const user = useSelector((state) => state.user.user);

  const updateUser = async (id) => {
    // e.preventDeafault();
    const res = await Api.patch(endpoints["updateUsers"](id), {
      role: "4",
    });

    user.id = 4;
    console.log(user.id);
    console.log(res.data);
  };

  const createCompany = async (e) => {
    e.preventDefault();
    const res = await Api.post(endpoints["createCompany"], {
      company_name: companyName,
      active: false,
      address: address,
      user: user.id,
    });
    console.log(res.data);
  };

  let path = (
    <>
      <Button
        variant="primary"
        disabled
        type="submit"
        onClick={() => updateUser(user.id)}
      >
        Đăng ký
      </Button>
    </>
  );

  if (companyName !== "" && address !== "") {
    if (user.id !== 4) {
      path = (
        <>
          <Button
            variant="primary"
            type="submit"
            onClick={() => updateUser(user.id)}
          >
            Đăng ký
          </Button>
        </>
      );
    } else {
      path = (
        <>
          <Button
            variant="primary"
            disabled
            type="submit"
            onClick={() => updateUser(user.id)}
          >
            Đăng ký
          </Button>
        </>
      );
    }
  }

  return (
    <>
      <div className="col-md-5 m-auto rounded border p-3 mt-3">
        <Form onSubmit={createCompany}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên công ty tuyển dụng</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên công ty tuyển dụng"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-3">
            <Form.Label>Địa điểm</Form.Label>
            <Form.Select onChange={(e) => setAddress(e.target.value)}>
              <option value="">Chọn địa điểm...</option>
              <option value="TP. HCM">TP. HCM</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
            </Form.Select>
          </Form.Group>
          <div className="text-center">{path}</div>
        </Form>
      </div>
    </>
  );
}

export default EmployerRegister;

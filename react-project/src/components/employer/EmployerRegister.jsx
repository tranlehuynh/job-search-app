import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import Api, { endpoints } from "../../api/Api";

function EmployerRegister() {
  const user = useSelector((state) => state.user.user);
  console.log(user.id);
  const updateUser = async (id) => {
    const response = await Api.patch(endpoints["updateUsers"](id), {
      role: "4",
    });
    console.log(response);
  };
  return (
    <>
      <div className="col-md-5 m-auto rounded border p-3 mt-3">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên công ty tuyển dụng</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên công ty tuyển dụng"
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-3">
            <Form.Label>Địa điểm</Form.Label>
            <Form.Select>
              <option disabled value="">
                Chọn địa điểm...
              </option>
            </Form.Select>
          </Form.Group>
          <div className="text-center">
            <Button
              variant="primary"
              type="submit"
              onClick={() => updateUser(user.id)}
            >
              Đăng ký
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default EmployerRegister;

import { Button, Form } from "react-bootstrap";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";

const Recruit = () => {
  const [state, setState] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const data = await axios.get(
        "http://thanhduong.pythonanywhere.com/categories/"
      );
      setState(data.data);
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleClickButton = () => {
    console.log(selectedValue);
  };

  return (
    <>
      <Header />
      <div className="col-md-5 m-auto rounded border p-3 mt-3">
        <Form.Group className="mb-3 mt-3">
          <Form.Label>Tên công việc</Form.Label>
          <Form.Control placeholder="Nhập tên công việc" />
        </Form.Group>
        <Form.Group className="mb-3 mt-3">
          <Form.Label>Tên công ty</Form.Label>
          <Form.Control placeholder="Nhập tên công ty" />
        </Form.Group>
        <Form.Group className="mb-3 mt-3">
          <Form.Label>Mức lương</Form.Label>
          <Form.Control placeholder="Nhập mức lương" />
        </Form.Group>
        <Form.Group className="mb-3 mt-3">
          <Form.Label>Thể loại</Form.Label>
          <Form.Select>
            <option disabled value="">
              Chọn thể loại...
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ngành</Form.Label>
          <Form.Select onChange={handleChange} value={selectedValue} required>
            <option disabled value="">
              Chọn ngành...
            </option>
            ;
            {state.map((s) => {
              return <option value={s.name}>{s.name}</option>;
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 mt-3">
          <Form.Label>Địa điểm</Form.Label>
          <Form.Select>
            <option value="" disabled>
              Chọn địa điểm
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 mt-3">
          <Form.Label>Ghi chú</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Nhập thông tin về việc làm, công ty, phúc lợi..."
          />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit" onClick={handleClickButton}>
            Đăng tin
          </Button>
        </div>
      </div>
    </>
  );
};

export default Recruit;

import { Button, Form } from "react-bootstrap";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ErrorPage from "../ErrorPage";
import Api, { endpoints } from "../../api/Api";
const Recruit = () => {
  const [state, setState] = useState([]);

  const [company, setCompany] = useState("");
  const [jobName, setJobName] = useState("");
  const [salary, setSalary] = useState("");
  // const [address, setAddress] = useState("");
  const [jobCate, setJobCate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const loadData = async () => {
      const data = await axios.get("http://127.0.0.1:8000/categories/");
      setState(data.data);
    };

    const loadAddress = async () => {
      const data = await Api.get(endpoints["createCompany"]);
      const res = data.data.filter((s) => s.user === user.id);
      setCompany(res);

      console.log(data.data);
    };
    loadData();
    loadAddress();
  }, [user.id]);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  let path = <ErrorPage />;

  const createJob = async (e) => {
    e.preventDefault();
    const res = await Api.post(endpoints["createJob"], {
      job_name: jobName,
      job_category: jobCate,
      company: company.company_name,
      salary: salary,
      category: selectedValue,
      description: description,
    });
    console.log(res.data);
  };

  if (user !== null && user !== undefined) {
    if (user.role === 2) {
      path = (
        <>
          <Header />
          <Form
            className="col-md-5 m-auto rounded border p-3 mt-3"
            onSubmit={createJob}
          >
            <Form.Group
              className="mb-3 mt-3"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
            >
              <Form.Label>Tên công việc</Form.Label>
              <Form.Control placeholder="Nhập tên công việc" />
            </Form.Group>
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Mức lương</Form.Label>
              <Form.Control
                placeholder="Nhập mức lương"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ngành</Form.Label>
              <Form.Select
                onChange={handleChange}
                value={selectedValue}
                required
              >
                <option value="">Chọn ngành...</option>;
                {state.map((s) => {
                  return (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ngành</Form.Label>
              <Form.Select
                onChange={(e) => setJobCate(e.target.value)}
                required
              >
                <option value="">Chọn ngành...</option>;
                <option value="1">Fulltime</option>;
                <option value="2">Partime</option>;
              </Form.Select>
            </Form.Group>
            {/* <Form.Group className="mb-3 mt-3">
              <Form.Label>Địa điểm</Form.Label>
              <Form.Select onChange={(e) => setAddress(e.target.value)}>
                <option value="">Chọn địa điểm</option>
                {company.map((s) => {
                  return (
                    <option key={s.id} value={s.name}>
                      {s.address}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group> */}
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập thông tin về việc làm, công ty, phúc lợi..."
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Đăng tin
              </Button>
            </div>
          </Form>
        </>
      );
    }
  }
  return <>{path}</>;
};

export default Recruit;

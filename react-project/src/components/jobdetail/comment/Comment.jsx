import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Api, { endpoints } from "../../../api/Api";

function Comment() {
  const [comment, setComment] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const response = await Api.get(endpoints["users"]);
      console.log(response.data.results);
      setComment(response.data.results);
    };
    loadData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <Form className="w-75">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Nhập bình luận..."
            />
          </Form.Group>
          <Button variant="primary">Bình luận</Button>
        </Form>
      </div>
      {comment.map((c) => {
        return (
          <div className="d-flex justify-content-center mt-4">
            <Row className="w-75 border">
              <Col md={2} className="d-flex justify-content-center">
                <Card.Img
                  src={c.avatar_path}
                  alt={c.id}
                  style={{ borderRadius: "50%", width: "50%" }}
                />
              </Col>
              <Col md={8} className="d-flex justify-content-center">
                {c.username}
              </Col>
              <Col md={2} className="d-flex justify-content-center">
                {c.first_name}
              </Col>
            </Row>
          </div>
        );
      })}
    </>
  );
}

export default Comment;

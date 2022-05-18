import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import cookie from "react-cookies";
import Rating from "react-rating";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Api, { endpoints } from "../../../api/Api";
import image from "../../../assets/employer/unknown-user.jpg";

function Comment() {
  const user = useSelector((state) => state.user.user);
  const { jobId } = useParams();
  const [comment, setComment] = useState([]);
  const [state, setState] = useState("");
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [content, setContent] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [id, setId] = useState("");
  const [myRating, setMyRating] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const response = await Api.get(endpoints["load-comment"], {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      });
      const data = await response.data.filter((e) => e.job.id == jobId);
      setComment(data);
    };
    loadData();
  }, [jobId, state]);

  let path = (
    <>
      <Form.Group
        className="mb-3"
        controlId="exampleForm.ControlTextarea1"
        style={{ border: "1px solid black" }}
      >
        <Link to="/login">Đăng nhập để bình luận...</Link>
      </Form.Group>
    </>
  );

  if (user !== undefined && user !== null) {
    path = (
      <>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Nhập bình luận..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-3">
          Bình luận
        </Button>
      </>
    );
  }

  const addComment = async (e) => {
    e.preventDefault();
    Api.post(
      endpoints["addComment"](jobId),
      {
        content: value,
      },
      {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      }
    );
    let temp = Math.random() * 99;
    setState(temp);
    setValue("");
  };

  const deleteComment = async (id) => {
    await Api.delete(endpoints["deleteComment"](id), {
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
    }).catch(function (error) {
      console.log(error.response.status);
      if (error.response.status === 403) {
        handleShow();
      }
    });
    let temp = Math.random() * 99;
    setState(temp);
  };

  const updateComment = async () => {
    Api.patch(
      endpoints["updateComment"](id),
      {
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      }
    ).catch(function (error) {
      console.log(error.response.status);
      if (error.response.status === 403) {
        handleShow();
      }
    });
    setState(content);
    handleClose1();
  };

  const handleId = (id) => {
    setId(id);
    handleShow1();
  };

  let rating = (
    <>
      <Rating initialRating={myRating} />
    </>
  );
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hey</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn không được xóa hay chỉnh sửa cmt của người khác!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Ok không?
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Hey</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicFirstName1">
              <Form.Label>Sửa </Form.Label>
              <Form.Control
                type="text"
                placeholder="Sửa bình luận"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => updateComment()}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>

      {/* {rating} */}

      <div className="d-flex justify-content-center mt-5">
        <Form className="w-75" onSubmit={addComment}>
          {path}
        </Form>
      </div>
      {comment.map((c) => {
        return (
          <div className="d-flex justify-content-center mb-4" key={c.content}>
            <Row className="w-75 border">
              <Col md={2} className="d-flex justify-content-center">
                <Card.Img
                  src={image}
                  alt={c.content}
                  style={{ borderRadius: "50%", width: "50%" }}
                />
              </Col>
              <Col md={8} className="align-items-center d-flex">
                <div>
                  <div>{c.user.username}</div>
                  <div>{c.content}</div>
                </div>
              </Col>
              <Col
                md={2}
                className="d-flex justify-content-center align-items-center"
              >
                <div
                  style={{ marginRight: "15px", cursor: "pointer" }}
                  onClick={() => handleId(c.id)}
                >
                  Chỉnh sửa
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteComment(c.id)}
                >
                  Xóa
                </div>
              </Col>
            </Row>
          </div>
        );
      })}
    </>
  );
}

export default Comment;

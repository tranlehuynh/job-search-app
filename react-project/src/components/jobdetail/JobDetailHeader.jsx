import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import jobLogo from "../../assets/logo/job-logo.png";

const JobDetailHeader = (props) => {
  const user = useSelector((state) => state.user.user);
  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteShow = () => setDeleteShow(true);
  const handleDeleteClose = () => setDeleteShow(false);

  let path = (
    <>
      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chưa đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn phải đăng nhập để nộp CV</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  if (user !== undefined && user !== null) {
    path = (
      <>
        <Modal show={deleteShow} onHide={handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title>Nộp CV</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn nộp không?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteClose}>
              Đóng
            </Button>
            <Button variant="primary">Nộp</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  return (
    <>
      {path}

      <div className="w-100 h-100 d-flex justify-content-center">
        <div className="d-flex align-items-center mt-3 bg-white">
          <div className="d-flex justify-content-center">
            <img src={jobLogo} alt="jobLogo" width="55%" />
          </div>
          <div className="">
            <h2>{props.name}</h2>
            <h5>{props.company}</h5>
            <div>An Giang </div>
          </div>
          <div className="m-4">
            <Button variant="primary" type="submit" onClick={handleDeleteShow}>
              Nộp đơn
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailHeader;

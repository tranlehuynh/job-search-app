import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import cookie from "react-cookies";
import Rating from "react-rating";
import { useSelector } from "react-redux";
import Api, { endpoints } from "../../api/Api";
import jobLogo from "../../assets/logo/job-logo.png";

const JobDetailHeader = (props) => {
  const user = useSelector((state) => state.user.user);
  const [cv, setCV] = useState([]);
  const [rating, setRating] = useState(0);
  const [deleteShow, setDeleteShow] = useState(false);
  const [handleShow, setHandleShow] = useState(false);
  const handleDeleteShow = () => setDeleteShow(true);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleShowModal = () => setHandleShow(true);
  const handleCloseModal = () => setHandleShow(false);

  useEffect(() => {
    const getCV = async () => {
      const res = await Api.get(endpoints["CV"]);
      if (user !== undefined && user !== null) {
        const data = res.data.filter((r) => r.user_id === user.id);
        setCV(data);
      }
    };

    const getRating = async () => {
      const res = await Api.get(endpoints["getRating"](props.companyId));
      const data = res.data.filter((r) => r.user_id === user.id);
      setRating(data[0].rate);
    };

    getCV();
    getRating();
  }, [user, props.companyId]);

  const uploadCV = async () => {
    if (cv.length !== 0) {
      // const res = await Api.patch(endpoints["patch-cv"](cv[0].id), {
      //   company: props.companyId,
      // });

      const res = await Api.post(endpoints["upCV"], {
        CV: cv[0].id,
        company: props.companyId,
      });

      console.log(res.data);
      handleDeleteClose();
    } else {
      handleShowModal();
    }
  };

  const ratingCompany = async (rate) => {
    const res = await Api.post(
      endpoints["postRating"](props.companyId),
      {
        rating: rate,
      },
      {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      }
    );

    console.log(res.data);
  };

  let path = (
    <>
      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ch??a ????ng nh???p</Modal.Title>
        </Modal.Header>
        <Modal.Body>B???n ph???i ????ng nh???p ????? n???p CV</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            ????ng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  let newPath = (
    <>
      <Button variant="primary" type="submit" onClick={handleDeleteShow}>
        N???p ????n
      </Button>
    </>
  );
  if (user !== undefined && user !== null) {
    path = (
      <>
        <Modal show={deleteShow} onHide={handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title>N???p CV</Modal.Title>
          </Modal.Header>
          <Modal.Body>B???n c?? ch???c ch???n n???p kh??ng?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteClose}>
              ????ng
            </Button>
            <Button variant="primary" onClick={uploadCV}>
              N???p
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <>
      {path}

      <Modal show={handleShow} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>B???n h??y ????ng CV ????? n???p ????n!</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            ???? hi???u
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="w-100 h-100 d-flex justify-content-center">
        <div className="d-flex align-items-center mt-3 bg-white">
          <div className="d-flex justify-content-center">
            <img src={jobLogo} alt="jobLogo" width="55%" />
          </div>
          <div className="">
            <h2>{props.name}</h2>
            <h5>{props.company}</h5>
            <div>{props.address} </div>
            <Rating initialRating={rating} onClick={ratingCompany} />
          </div>
          <div className="m-4">{newPath}</div>
        </div>
      </div>
    </>
  );
};

export default JobDetailHeader;

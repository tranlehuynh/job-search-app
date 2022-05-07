import { Button } from "react-bootstrap";
import jobLogo from "../../assets/logo/job-logo.png";

const JobDetailHeader = () => {
  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-center">
        <div className="d-flex align-items-center mt-3 bg-white">
          <div className="d-flex justify-content-center">
            <img src={jobLogo} alt="jobLogo" width="55%" />
          </div>
          <div className="">
            <h3>Banking Sales - Tư vấn và sales banking</h3>
            <div>Tên công ty</div>
            <div>Địa điểm làm việc</div>
          </div>
          <div className="m-4">
            <Button variant="primary" type="submit">
              Nộp đơn
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailHeader;

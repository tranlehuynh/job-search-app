import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import Api, { endpoints } from "../../api/Api";
import Header from "./Header";

const EmployerJob = () => {
  useEffect(() => {
    const loadData = async () => {
      const resCompany = await Api.get(endpoints["createCompany"]);
      console.log(resCompany.data);
      const resJob = await Api.get(endpoints["createJob"]);
      console.log(resJob.data);
    };
    loadData();
  }, []);
  return (
    <>
      <Header />
      <div className="row m-auto">
        <div className="col-3 d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>CV </Card.Title>
              {/* <a href={e.cv} target="_blank" rel="noreferrer">
                <img src={image} alt="1" style={{ width: "50%" }} />
              </a> */}
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EmployerJob;

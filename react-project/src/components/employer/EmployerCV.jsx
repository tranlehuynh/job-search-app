import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Api, { endpoints } from "../../api/Api";
import ErrorPage from "../ErrorPage";
import Header from "./Header";
import image from "../../assets/employer/unknown-user.jpg";

const EmployerCV = () => {
  const user = useSelector((state) => state.user.user);
  const [cv, setCV] = useState([]);

  useEffect(() => {
    const loadCompany = async () => {
      const res = await Api.get(endpoints["createCompany"]);
      const data = await res.data.filter((e) => e.user === user.id);
      console.log(data);

      const res2 = await Api.get(endpoints["upCV"]);
      const data2 = await res2.data.filter((e) => e.company === data[0].id);
      // console.log(res2.data);
      console.log(data2);

      // const res1 = await Api.get(endpoints["CV"]);
      // const data1 = await res1.data.filter((e) => e.company === data[0].id);

      const res1 = await Api.get(endpoints["CV"]);
      const data1 = await res1.data.filter((o1) =>
        data2.some((o2) => o1.id === o2.CV)
      );

      console.log(data1);

      setCV(data1);
    };
    loadCompany();
  }, [user.id]);

  let path = <ErrorPage />;
  if (user !== null && user !== undefined) {
    if (user.role === 2) {
      path = (
        <>
          <Header />
          <div className="row m-auto">
            {cv.map((e) => {
              return (
                <div className="col-3 d-flex justify-content-center" key={e.id}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>CV {e.user_id}</Card.Title>
                      <a href={e.cv} target="_blank" rel="noreferrer">
                        <img src={image} alt="1" style={{ width: "50%" }} />
                      </a>
                      {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </>
      );
    }
  }
  return <>{path}</>;
};

export default EmployerCV;

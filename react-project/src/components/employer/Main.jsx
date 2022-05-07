import image from "../../assets/employer/employer-image.jpg";
const Main = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center p-5">
        <div style={{ width: "60%" }}>
          <p className="h1">Xin chào nhà tuyển dụng</p>
          <p>
            Đây là trang quản lý của nhà tuyển dụng. Có nhiều tính năng hấp dẫn
            đang chờ bạn khám phá, hi vọng bạn sẽ tìm được nhiều ứng viên phù
            hợp với việc làm của công ty bạn nhé!
          </p>
        </div>
        <div style={{ width: "50%" }} bg="white">
          <img src={image} alt="employer" style={{ width: "90%" }} />
        </div>
      </div>
    </>
  );
};

export default Main;

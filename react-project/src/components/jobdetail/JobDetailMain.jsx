import Comment from "./comment/Comment";

const JobDetailMain = (props) => {
  console.log("Hi");
  return (
    <>
      <div className="w-100 d-flex justify-content-center mt-3 mb-4">
        <div className="w-75">
          <div className="d-flex justify-content-center">
            <div
              style={{ width: "60%", backgroundColor: "#f7fdff" }}
              className="border rounded p-3 "
            >
              <h3>Thông tin chi tiết</h3>
              <div>
                <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                  Thể loại:
                </span>{" "}
                {props.category}
              </div>
              <div>
                <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                  Mức lương:
                </span>{" "}
                {props.salary}
              </div>
              <div>
                <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                  Địa điểm:
                </span>{" "}
                An Giang
              </div>
              <div>
                <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                  Ghi chú về công việc:
                </span>{" "}
                {props.descriptions}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Comment />
    </>
  );
};

export default JobDetailMain;

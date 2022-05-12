import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
function MyPagination() {
  return (
    <>
      <Pagination>
        <div className="page-item">
          <Link to="?page=1" className="page-link">
            1
          </Link>
        </div>
      </Pagination>
    </>
  );
}

export default MyPagination;

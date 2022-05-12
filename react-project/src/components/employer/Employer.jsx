import Header from "./Header";
import Main from "./Main";
import ErrorPage from "../ErrorPage";
import { useSelector } from "react-redux";

const Employer = () => {
  let path = <ErrorPage />;

  const user = useSelector((state) => state.user.user);
  if (user !== null && user !== undefined) {
    if (user.role === 2) {
      path = (
        <>
          <Header />
          <Main />
        </>
      );
    }
  }
  return <>{path}</>;
};

export default Employer;

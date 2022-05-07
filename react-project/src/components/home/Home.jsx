import Homepage from "../homepage/Homepage";
import Employer from "../employer/Employer";
import Admin from "../admin/Admin";
import { useSelector } from "react-redux";

function Home() {
  let path = <Homepage />;

  const user = useSelector((state) => state.user.user);
  if (user !== null && user !== undefined) {
    if (user.role === 5) {
      path = <Employer />;
    }
    if (user.role === 3) {
      path = <Admin />;
    }
  }
  return <>{path}</>;
}

export default Home;

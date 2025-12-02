import { Navigate, Outlet } from "react-router-dom";
import { isValid } from "../utils/tokenUtils.jsx";

const PrivateRoute = () => {
  const user = sessionStorage.getItem("user");
  return user && isValid(user) ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

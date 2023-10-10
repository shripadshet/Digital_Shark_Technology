import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = (isAuth) => {
  isAuth = localStorage.getItem("mytoken");

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

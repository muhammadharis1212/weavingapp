import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  //const user = useSelector((state) => state.user);
  let location = useLocation();

  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoutes;

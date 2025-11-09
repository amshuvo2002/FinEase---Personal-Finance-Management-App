import React, { useContext } from "react";
import { Authcontext } from "../Provider/Authprovider";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(Authcontext);
  const location = useLocation();

  if (loading) {
    return (
      <p className="text-center mt-10 text-xl font-semibold">
        Loading...
      </p>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;

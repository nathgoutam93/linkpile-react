import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function IsLoggedIn({ pathToRedirect }) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return <div className="loader" />;
  return currentUser ? <Navigate to={pathToRedirect} replace /> : <Outlet />;
}

IsLoggedIn.propTypes = {
  pathToRedirect: PropTypes.string,
};

import { Outlet, Navigate } from "react-router";
import * as ROUTES from "../constants/routes";
import { useAuth } from "../context/authContext";

export default function RequiredAuth() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return <h1>Loading...</h1>;

  return currentUser ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
}

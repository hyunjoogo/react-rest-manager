import React, {ReactElement, ReactNode} from 'react';
import {Navigate, NavigateProps} from 'react-router-dom';
import {useAuthContext} from "../components/context/AuthContext";
import {User} from "firebase/auth";

type ProtectedRouteProps = {
  children: ReactElement;
  requireAdmin?: boolean
}

const ProtectedRoute = ({children, requireAdmin}: ProtectedRouteProps) => {
  const context = useAuthContext();
  const user = context?.user;

  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace/>;
  }

  return children;
};

export default ProtectedRoute;

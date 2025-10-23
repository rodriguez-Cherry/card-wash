import { useEffect } from "react";
import { Navigate } from "react-router";

export function PrivateRoute({ isAuthenticated, Component }) {

  useEffect(() => {
    if (!isAuthenticated) {
   
      return <Navigate to='/' />
    }
  }, [isAuthenticated]);

  return <Component />;
}

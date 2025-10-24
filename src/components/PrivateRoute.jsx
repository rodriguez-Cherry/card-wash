import { useEffect } from "react";
import { useNavigate } from "react-router";

export function PrivateRoute({ isAuthenticated, Component }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
  }, [isAuthenticated]);

  return <Component />;
}

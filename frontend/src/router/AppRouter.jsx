import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { Home } from "../home/Home";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";
import { Login } from "../auth/pages";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3> Loading ... </h3>;
  }

  return (
    <Routes>
      {
       ( status === "not-authenticated" ) 
          ? (
              <>
                <Route path="/auth/*" element={<AuthRoutes/>} />
                <Route path="/*" element={<Navigate to="/auth/login" />} />
              </>
            ) 
            : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/*" element={ <Navigate to="/" />} />
                </>
              )
      }
    </Routes>
  );
};

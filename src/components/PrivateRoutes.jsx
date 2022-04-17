import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../global-context/auth-context";
import { useGlobalVarContext } from "../global-context/global-variables";

function PrivateRoutes({ children }) {
  const { isUserAuthenticated } = useAuthContext();
  const { token } = useGlobalVarContext();
  const location = useLocation();

  console.log(isUserAuthenticated);
  console.log(token);

  return token ? (
    children
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
}

export default PrivateRoutes;

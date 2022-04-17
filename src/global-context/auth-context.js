import React, { useState, createContext, useEffect, useContext } from "react";

import { useGlobalVarContext } from "./global-variables";
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const { token } = useGlobalVarContext();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const getEncToken = (token) => {
    token ? setIsUserAuthenticated(true) : setIsUserAuthenticated(false);
  };

  useEffect(() => getEncToken(token), [token]);
  return (
    <AuthContext.Provider
      value={{ isUserAuthenticated, setIsUserAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const useAuthContext = () => useContext(AuthContext);
export { AuthContextProvider, useAuthContext };

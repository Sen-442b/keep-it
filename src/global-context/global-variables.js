import React, { createContext, useContext } from "react";

const GlobalVarContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const token =
    localStorage.getItem("notesToken") || sessionStorage.getItem("notesToken");

  return (
    <GlobalVarContext.Provider value={{ token }}>
      {children}
    </GlobalVarContext.Provider>
  );
};

export const useGlobalVarContext = () => useContext(GlobalVarContext);

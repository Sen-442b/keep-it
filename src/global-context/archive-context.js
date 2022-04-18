import React, { createContext, useContext, useEffect, useReducer } from "react";
import { getArchivesService } from "../services/archive-services";
import { useGlobalVarContext } from "./global-variables";

const ArchiveContext = createContext();

const archiveReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ARCHIVE":
      return { ...state, archives: action.payload };

    default:
  }
};

const initObj = {
  archives: [],
};

const ArchiveContextProvider = ({ children }) => {
  const { token } = useGlobalVarContext();
  const [state, dispatch] = useReducer(archiveReducer, initObj);

  return (
    <ArchiveContext.Provider value={{ state, dispatch }}>
      {children}
    </ArchiveContext.Provider>
  );
};

const useArchiveContext = () => useContext(ArchiveContext);
export { ArchiveContextProvider, useArchiveContext };

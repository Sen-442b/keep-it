import React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";
import { useGlobalVarContext } from "./global-variables";

const TrashContext = createContext();

const trashReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRASH":
      return { ...state, trash: action.payload };

    default:
      break;
  }
};

const trashInitObj = { trash: [] };

const TrashContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trashReducer, trashInitObj);

  return (
    <TrashContext.Provider value={{ state, dispatch }}>
      {children}
    </TrashContext.Provider>
  );
};

const useTrashContext = () => useContext(TrashContext);

export { TrashContextProvider, useTrashContext };

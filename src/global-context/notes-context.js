import axios from "axios";
import React, { useReducer, createContext, useContext, useEffect } from "react";

const NotesContext = createContext();

const initObj = {
  notes: [],
  sortByTime: "new-to-old",
  filterByPriority: [],
  label: [],
};
const notesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTES":
      return { ...state, notes: action.payload };
    case "SORT":
      return { ...state, sortByTime: action.payload };

    case "PRIORITY":
      return state.filterByPriority.includes(action.payload)
        ? {
            ...state,
            filterByPriority: state.filterByPriority.filter(
              (item) => item !== action.payload
            ),
          }
        : {
            ...state,
            filterByPriority: [...state.filterByPriority, action.payload],
          };
    case "LABEL":
      return { ...state, label: [...state] };

    default:
      break;
  }
};

const getNotesService = async (encodedToken) => {
  try {
    const resp = axios.get("/api/notes", {
      headers: { authorization: encodedToken },
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
};

const NotesContextProvider = ({ children }) => {
  const getNotes = async (encToken) => {
    const response = await getNotesService(encToken);
    console.log(response);
    dispatch({ type: "ADD_NOTES", payload: response.data.notes });
  };

  useEffect(() => getNotes(localStorage.getItem("notesToken")), []);
  const [state, dispatch] = useReducer(notesReducer, initObj);
  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotesContext = () => useContext(NotesContext);
export { NotesContextProvider, useNotesContext };

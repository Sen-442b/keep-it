import React, { createContext, useContext, useReducer } from "react";

const LabelContext = createContext();

const labelReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "ADD_LABEL":
      return { ...state, label: [...state.label, action.payload] };
    case "ACTIVE_LABELS":
      return {
        ...state,
        activeLabels: state.activeLabels.includes(action.payload)
          ? [...state.activeLabels]
          : [...state.activeLabels, action.payload],
      };

    default:
      break;
  }
};
const LabelContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(labelReducer, {
    label: [],
    activeLabels: [],
  });
  return (
    <LabelContext.Provider value={{ state, dispatch }}>
      {children}
    </LabelContext.Provider>
  );
};

const useLabelContext = () => useContext(LabelContext);

export { LabelContextProvider, useLabelContext };

import MockmanEs from "mockman-js";
import React from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuthContext } from "../global-context/auth-context";
import { useGlobalVarContext } from "../global-context/global-variables";
import LogIn from "./LogIn/LogIn";
import PrivateRoutes from "./PrivateRoutes";
import Archive from "./screens/Archive/Archive";
import Notes from "./screens/Notes/Notes";
import Trash from "./screens/Trash/Trash";

const MyRoutes = () => {
  const { isUserAuthenticated } = useAuthContext();
  console.log("here");
  console.log(isUserAuthenticated);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Notes />
          </PrivateRoutes>
        }
      />
      <Route
        path="/archive"
        element={
          <PrivateRoutes>
            <Archive />
          </PrivateRoutes>
        }
      />
      <Route
        path="/trash"
        element={
          <PrivateRoutes>
            <Trash />
          </PrivateRoutes>
        }
      />
      <Route path="/log-in" element={<LogIn />} />
      <Route path="/mock" element={<MockmanEs />} />
    </Routes>
  );
};

export default MyRoutes;

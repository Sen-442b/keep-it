import MockmanEs from "mockman-js";
import React from "react";
import {
  Link,
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
import LabelTags from "./screens/LabelTags/LabelTags";
import Notes from "./screens/Notes/Notes";
import Trash from "./screens/Trash/Trash";

const MyRoutes = () => {
  const { isUserAuthenticated } = useAuthContext();

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route
        path="/notes"
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

      <Route path="/labels/:labelId" element={<LabelTags />} />
    </Routes>
  );
};

export default MyRoutes;

function Home() {
  return (
    <main className="flex-column flex-center modal-container">
      <div className="modal-content text-align-center">
        <h1 className="fs-lrg">Keep-it</h1>
        <div>
          <button className="btn btn-cta">
            <Link to="/log-in">Login</Link>
          </button>
        </div>
      </div>
    </main>
  );
}

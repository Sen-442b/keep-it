"use strict";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./global-context/auth-context";
import { AlertTextContextProvider } from "./global-context/alert-text-context";
import { GlobalContextProvider } from "./global-context/global-variables";
import { NotesContextProvider } from "./global-context/notes-context";
import { ArchiveContextProvider } from "./global-context/archive-context";
import { TrashContextProvider } from "./global-context/trash-context";
import { LabelContextProvider } from "./global-context/label-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <LabelContextProvider>
          <AlertTextContextProvider>
            <NotesContextProvider>
              <AuthContextProvider>
                <TrashContextProvider>
                  <ArchiveContextProvider>
                    <App />
                  </ArchiveContextProvider>
                </TrashContextProvider>
              </AuthContextProvider>
            </NotesContextProvider>
          </AlertTextContextProvider>
        </LabelContextProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

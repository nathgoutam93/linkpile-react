import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { FirestoreProvider } from "./context/firestoreContext";
import { HeaderProvider } from "./context/headerContext";
import { AdminProvider } from "./context/adminContext";
import { DarkModeProvider } from "./context/darkModeContext";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeProvider>
      <AuthProvider>
        <FirestoreProvider>
          <HeaderProvider>
            <AdminProvider>
              <Router>
                <Routes>
                  <Route path="/*" element={<App />} />
                </Routes>
              </Router>
            </AdminProvider>
          </HeaderProvider>
        </FirestoreProvider>
      </AuthProvider>
    </DarkModeProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

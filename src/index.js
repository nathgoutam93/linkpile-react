import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { FirestoreProvider } from './context/firestoreContext';
import { HeaderProvider } from './context/headerContext';
import { AdminProvider } from './context/adminContext';

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

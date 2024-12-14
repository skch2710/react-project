import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SideNav from './side-nav/SideNav';
import LoginPage from './login-page/LoginPage';
import ExportFile from './ExportFile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ExportFile />
    // <BrowserRouter>
    //   <Routes>
    //     {/* Root route with nested paths */}
    //     <Route
    //       path="/*"
    //       element={
    //         isAuthenticated ? (
    //           <SideNav />
    //         ) : (
    //           <Navigate to="/login" replace />
    //         )
    //       }
    //     />

    //     {/* Login route */}
    //     <Route
    //       path="/login"
    //       element={
    //         isAuthenticated ? (
    //           <Navigate to="/" replace />
    //         ) : (
    //           <LoginPage setIsAuthenticated={setIsAuthenticated} />
    //         )
    //       }
    //     />

    //     {/* Catch-all route */}
    //     <Route
    //       path="*"
    //       element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
    //     />
    //   </Routes>
    // </BrowserRouter>
  );
};

export default App;
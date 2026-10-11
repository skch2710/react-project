import React from "react";
import hrmsOneLogo from "./assets/images/hrmsone-logo.png";

const App = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <div>
      <img src={hrmsOneLogo} alt="HRMSOne Logo" width="300" height="300" />
      <h1>HRMSOne App</h1>
      <p>API URL: {apiUrl}</p>
    </div>
  );
};

export default App;

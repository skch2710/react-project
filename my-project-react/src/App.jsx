import React from "react";
import DropEx from "./components/DropEx";
import FormicExample from "./pages/form-types/formic-example/FormicExample";
import Hospital from "./pages/hospital/Hospital";
import TableExample from "./components/TableEx/TableExample";
import { Typography } from "@mui/material";

const App = () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  console.log("API URL from env:", VITE_API_URL);
  return (
    <div>
      {/* <h1>Movie Selector</h1> */}
      {/* <DropEx /> */}
      {/* <FormicExample /> */}
      {/* <Hospital /> */}
      <Typography variant="h6" align="center" style={{ marginTop: 20 }}>
        API URL from env: {VITE_API_URL}
      </Typography>
    </div>
  );
};

export default App;

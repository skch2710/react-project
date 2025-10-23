import React from "react";
import DropEx from "./components/DropEx";
import FormicExample from "./pages/form-types/formic-example/FormicExample";
import Hospital from "./pages/hospital/Hospital";
import TableExample from "./components/TableEx/TableExample";
import { Typography } from "@mui/material";
import DataGridUsage from "./components/datagrid/DataGridUsage";

const App = () => {
  // const VITE_API_URL = import.meta.env.VITE_API_URL;
  // console.log("API URL from env:", VITE_API_URL);
  return (
    <div>
      {/* <h1>Movie Selector</h1> */}
      {/* <DropEx /> */}
      {/* <FormicExample /> */}
      {/* <Hospital /> */}
      <DataGridUsage />
    </div>
  );
};

export default App;

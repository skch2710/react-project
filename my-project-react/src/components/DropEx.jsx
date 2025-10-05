import React, { useState } from "react";
import MultiDropdown from "./dropdown/MultiDropdown";
import { Typography } from "@mui/material";
import { movies } from "../SampleData";

const DropEx = () => {
  const [selectedMovies, setSelectedMovies] = useState([]);

  const handleChange = (event, value) => {
    setSelectedMovies(value);
    console.log("Selected movies:", value);
  };
  return (
    <div style={{ padding: "20px" }}>
      <MultiDropdown
        options={movies}
        label="Select a Movie"
        getOptionLabel={(option) => option.movieName}
        onChange={handleChange}
        value={selectedMovies}
        isOptionEqualToValue={(option, value) =>
          option.movieName === value.movieName
        }
      />

      <Typography variant="body1" sx={{ mt: 2 }}>
        Selected Movies:{" "}
        {selectedMovies.length > 0
          ? selectedMovies.map((movie) => movie.movieName).join(", ")
          : "None"}
        <br />
        Selected Movie IDs:{" "}
        {selectedMovies.length > 0
          ? selectedMovies.map((movie) => movie.id).join(", ")
          : "None"}
      </Typography>
    </div>
  );
};

export default DropEx;

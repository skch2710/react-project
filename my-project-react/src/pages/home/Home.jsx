import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { login } = useSelector((state) => state.user);

  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleHostelClick = () => {
    // Navigate to Hostel page
    navigate("/hostel", { replace: true });
  };

  const handleLogoutClick = () => {
    // Clear user session and navigate to Login page
    sessionStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Typography variant="subtitle1">Home Page</Typography>
      <Typography
        variant="subtitle1"
        color="blue"
      >{`Welcome, ${user?.user?.firstName} ${user?.user?.lastName}!`}</Typography>
      <Button
        label="Go to Hostel"
        color="secondary"
        onClick={handleHostelClick}
      />

      <Button label="Logout" color="primary" onClick={handleLogoutClick} />
    </Grid>
  );
};

export default Home;

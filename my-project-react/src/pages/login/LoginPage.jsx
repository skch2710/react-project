import { Login } from "@mui/icons-material";
import { Grid, Box, Divider, Paper } from "@mui/material";
import React from "react";
import LoginForm from "./LoginForm";
import logo from "../../assets/logo.png";

const LoginPage = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      sx={{ minHeight: "100vh", backgroundColor: "#f3f6f6ff" }}
    >
      {/* Main content */}
      <Grid>
        <Grid container spacing={3}>
          <Grid
            size={6}
            sx={
              {
                /*border: 1, borderColor: "red" */
              }
            }
          >
            <Box>
              <img
                src={logo}
                alt="Logo"
                style={{ width: 600, height: "auto", marginTop: 80 }}
              />
            </Box>
          </Grid>

          <Grid
            size={5}
            sx={{ /*border: 1, borderColor: "red",*/ marginTop: 8 }}
          >
            <Paper elevation={3} sx={{ padding: 4 }}>
              <LoginForm />
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      {/* Footer */}
      <Grid>
        <Box textAlign="center" p={2}>
          <Divider />
          <Box mt={2} fontSize={14} color="gray">
            © 2025 Sathish Kumar CH. All rights reserved.
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;

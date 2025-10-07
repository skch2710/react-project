import { Grid, Paper, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Button from "../../components/button/Button";
import Popup from "../../components/popup/Popup";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import HospitalForm from "./HospitalForm";

const Hospital = () => {

  const [open, setOpen] = useState(false);
  const formRef = useRef();

  const handlePopup = () => {
    setOpen(!open);
  }

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    // Add your API call or form processing logic here
    setOpen(false);
  };

   const handlePopupSubmit = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
    handleSubmit();
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid>
        <Typography variant="h6">Hospital Management</Typography>
      </Grid>
      <Grid>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Grid>
            <Typography variant="body1">Filters</Typography>
          </Grid>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Button 
            startIcon={<AddCircleOutlineRoundedIcon />}
            label="Add Hospital" 
            color="success" 
            onClick={handlePopup} 
            />
            <Popup open={open} handleClose={handlePopup} title="Add Hospital" onSubmit={handlePopupSubmit}>
              <HospitalForm onSubmit={handleSubmit} />
            </Popup>

            <Button label="Search" color="primary" />
            <Button label="Clear" color="primary" variant="outlined" />
          </Grid>
        </Paper>
      </Grid>

      <Grid>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Grid>
            <Typography variant="body1">Hospital List</Typography>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Hospital;

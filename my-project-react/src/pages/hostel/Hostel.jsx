import { Grid, Paper, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Button from "../../components/button/Button";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Popup from "../../components/popup/Popup";
import HostelForm from "./HostelForm";
import { useDispatch, useSelector } from "react-redux";
import { addHosteller, resetHostellerState } from "../../store/slices/hostelSlice";

const Hostel = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formikRef = useRef();

  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.hostel);

  const handlePopup = () => {
    setOpen(!open);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
     console.log("handleSubmit called with values:", values);
    setIsSubmitting(true);
    try {
      // Dispatch Redux thunk for API call
      const result = await dispatch(addHosteller(values)).unwrap();

      console.log("API success:", result);
      setOpen(false);
      resetForm();
      dispatch(resetHostellerState());
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const handlePopupSubmit = () => {
    console.log("Submitting from popup");
    if (formikRef.current) {
      console.log("Submitting from popup - formikRef current exists");
      formikRef.current.handleSubmit();
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setOpen(false);
      if (formikRef.current) {
        formikRef.current.resetForm();
      }
    }
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid>
        <Typography variant="h6">Hostel Management</Typography>
      </Grid>
      <Grid>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid>
              <Typography variant="body1">Filters</Typography>
            </Grid>
            <Grid>
              <Grid container spacing={2} justifyContent="flex-end">
                <Button
                  startIcon={<AddCircleOutlineRoundedIcon />}
                  label="Add Hostel"
                  color="success"
                  onClick={handlePopup}
                />
                <Button label="Search" color="primary" />
                <Button label="Clear" color="primary" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Grid container>
            <Typography variant="body1">Hosteller List</Typography>
          </Grid>
        </Paper>
      </Grid>

      {/* Popup */}
      <Popup
        open={open}
        handleClose={handleClose}
        title="Add Hosteller"
        onSubmit={handlePopupSubmit}
        isSubmitting={loading || isSubmitting}
      >
        <HostelForm onSubmit={handleSubmit} formikRef={formikRef} />
      </Popup>
    </Grid>
  );
};

export default Hostel;

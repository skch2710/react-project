import { Grid, Paper, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Button from "../../components/button/Button";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Popup from "../../components/popup/Popup";
import HostelForm from "./HostelForm";
import { useDispatch, useSelector } from "react-redux";
import {
  saveOrUpdateHosteller,
  resetHostellerState,
} from "../../store/slices/hostelSlice";
import { toast } from "react-toastify";
import { initialValues, ADD_POPUP_TITLE, EDIT_POPUP_TITLE } from "./helper";

const Hostel = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [popupTitle, setPopupTitle] = useState(ADD_POPUP_TITLE);
  const formikRef = useRef();

  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.hostel);

  const handlePopup = (action) => {
    console.log("handlePopup called", action);
    if (action === "edit") {
      setPopupTitle(EDIT_POPUP_TITLE);
      setFormValues({ ...initialValues, fullName: "John Doe" });
    }
    setOpen(!open);
  };

  const handleSubmit = async (values) => {
    console.log("handleSubmit called with values:", values);
    toast.info("Submitting hosteller data...");
    try {
      // Dispatch Redux thunk for API call
      const result = await dispatch(saveOrUpdateHosteller(values)).unwrap();
      toast.success("Hosteller data saved successfully!");
      console.log("API success:", result);
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setOpen(false);
      dispatch(resetHostellerState());
    }
  };

  const handlePopupSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
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
                  onClick={() => handlePopup("add")}
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
        handleClose={handlePopup}
        title={popupTitle}
        onSubmit={handlePopupSubmit}
        isSubmitting={loading}
      >
        <HostelForm
          onSubmit={handleSubmit}
          formikRef={formikRef}
          formData={formValues}
        />
      </Popup>
    </Grid>
  );
};

export default Hostel;

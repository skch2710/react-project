import { CircularProgress, Grid, Paper, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Button from "../../components/button/Button";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Popup from "../../components/popup/Popup";
import HostelForm from "./HostelForm";
import { useDispatch, useSelector } from "react-redux";
import {
  saveOrUpdateHosteller,
  resetHostellerState,
  setGridLoading,
} from "../../store/slices/hostelSlice";
import { toast } from "react-toastify";
import {
  initialValues,
  ADD_POPUP_TITLE,
  EDIT_POPUP_TITLE,
  GRID_TITLE,
  columns,
  rows,
} from "./helper";
import Loader from "../../components/loader/Loader";
import CommonDataGrid from "../../components/datagrid/CommonDataGrid";

const Hostel = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [popupTitle, setPopupTitle] = useState(ADD_POPUP_TITLE);
  const formikRef = useRef();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const dispatch = useDispatch();
  const { loading, gridLoading, data, error } = useSelector(
    (state) => state.hostel
  );

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

  const handleExcelExport = () => {
    console.log("Custom Export to Excel");
    // Implement your custom export logic here
  };
  const handlePdfExport = () => {
    console.log("Custom Export to PDF");
    // Implement your custom export logic here
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid>
        <Typography variant="h6">Hostel Management</Typography>
      </Grid>
      <Grid>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            position: "relative",
            minHeight: 150,
            overflow: "hidden",
          }}
        >
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
                <Button
                  label="Search"
                  color="primary"
                  onClick={() => {
                    dispatch(setGridLoading(true));
                  }}
                />
                <Button
                  label="Clear"
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    dispatch(setGridLoading(false));
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* <Grid container> */}
      <CommonDataGrid
        title={GRID_TITLE}
        columns={columns}
        rows={rows}
        getRowId={(row) => row.hostellerId}
        totalRows={rows.length}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        // checkboxSelection
        // onSelectionChange={setSelectionModel}
        height={350}
        exportProp={{
          handleExcelExport,
          handlePdfExport,
          exportDisabled: false,
        }}
      />
      {/* </Grid> */}

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
        {loading && <Loader loading={loading} />}
      </Popup>

      {gridLoading && <Loader loading={gridLoading} />}
    </Grid>
  );
};

export default Hostel;

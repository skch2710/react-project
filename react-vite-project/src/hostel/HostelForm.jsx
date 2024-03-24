import React, { useState } from "react";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AxiosApi from "../utils/AxiosApi";
import moment from "moment";


const HostelForm = ({ open, handlePopup, formData, setFormData, handleSearch }) => {

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // Prepare data to send
            const formattedData = {
                ...formData,
                joiningDate: moment(formData.joiningDate).format("L"), // Corrected format
            };
            // Simulate API call or perform actual API call
            console.log("Form Data:", formattedData);
            const response = await AxiosApi("http://localhost:8061/hostel/save-update-hosteller", "post", formattedData);
            handleSearch();
        } catch (error) {
            console.error('Error saving data:', error);
        }
        finally {
            handleResetData();
            handlePopup();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleResetData = () => {
        // Reset form fields after submission
        setFormData({
            hostellerId: 0,
            fullName: "",
            emailId: "",
            phoneNumber: "",
            fee: "",
            joiningDate: "",
            address: "",
            proof: "",
            reason: "",
            vacatedDate: "",
            createdById: 1,
            modifiedById: 1
        });
    };

    return (
        <div style={{ textAlign: "center" }}>
            <Dialog open={open} onClose={handlePopup} fullWidth maxWidth="sm">
                <DialogTitle>
                    Hosteller Registration
                    <IconButton onClick={() => { handlePopup(); handleResetData(); }} style={{ float: "right" }}>
                        <CloseIcon color="primary" />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <form >
                        <Stack direction="row" spacing={2} margin={2}>
                            <TextField
                                required
                                error={!formData.fullName}
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                variant="outlined"
                                label="Full Name"
                            />
                            <TextField
                                required
                                error={!formData.emailId}
                                name="emailId"
                                value={formData.emailId}
                                onChange={handleChange}
                                variant="outlined"
                                label="Email"
                            />
                            <TextField
                                required
                                error={!formData.phoneNumber}
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                variant="outlined"
                                label="Phone Number"
                            />
                        </Stack>
                        <Stack direction="row" spacing={2} margin={2}>
                            <TextField
                                required
                                error={!formData.fee}
                                name="fee"
                                value={formData.fee}
                                onChange={handleChange}
                                variant="outlined"
                                label="Fee"
                            />
                            <TextField
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                variant="outlined"
                                label="Reason"
                            />
                            <TextField
                                required
                                type="date"
                                error={!formData.joiningDate}
                                name="joiningDate"
                                value={formData.joiningDate}
                                onChange={handleChange}
                                variant="outlined"
                                label="Joining Date"
                            />
                        </Stack>
                        <Stack direction="row" spacing={2} margin={2}>
                            <TextField
                                sx={{ width: 350 }}
                                multiline
                                rows={2}
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                variant="outlined"
                                label="Address"
                            />

                            <RadioGroup
                                name="proof"
                                value={formData.proof}
                                onChange={handleChange}
                                row
                            >
                                <FormControlLabel
                                    value="ADHAR"
                                    control={<Radio color="success" />}
                                    label="ADHAR"
                                />
                                <FormControlLabel
                                    value="ID PROOF"
                                    control={<Radio />}
                                    label="ID PROOF"
                                />
                            </RadioGroup>
                            {/* <Button
                                variant="contained"
                                type="submit"
                            >
                                Submit
                            </Button> */}
                        </Stack>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="success" variant="contained">Save</Button>
                    <Button onClick={() => { handlePopup(); handleResetData(); }} color="error" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default HostelForm;

import React, { useEffect, useState } from 'react';
import AxiosApi from '../utils/AxiosApi';
import { Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import HostelForm from './HostelForm';
import moment from 'moment';

function Hostel() {
    const [hostelList, setHostelList] = useState([]);
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        "hostellerId": 0,
        "fullName": "",
        "emailId": "",
        "phoneNumber": "",
        "fee": "",
        "joiningDate": "",
        "address": "",
        "proof": "",
        "reason": "",
        "vacatedDate": "",
        "createdById": 1,
        "modifiedById": 1
    });

    const [searhForm, setSearhForm] = useState({
        "fullName": "",
        "emailId": "",
    });

    const handleSeach = (e) => {
        const { name, value } = e.target;
        setSearhForm({
            ...searhForm,
            [name]: value
        });
    };

    const handlePopup = () => {
        setOpen(!open);
    };

    const columns = [
        { id: 'actions', name: 'Actions' },
        { id: 'fullName', name: 'Full Name' },
        { id: 'emailId', name: 'Email Id' },
        { id: 'phoneNumber', name: 'Phone Number' },
        { id: 'fee', name: 'Fee' },
        { id: 'joiningDate', name: 'Joining Date' },
        { id: 'address', name: 'Address' },
        { id: 'proof', name: 'Proof' },
        { id: 'reason', name: 'Reason' },
        { id: 'vacatedDate', name: 'Vacated Date' },
    ];

    // Define handleSearch function
    const handleSearch = async () => {
        console.log("Inside handleSearch.......");
        try {
            const response = await AxiosApi("http://localhost:8061/hostel/get-hostellers", "post", searhForm);

            if (response && response.data.statusCode === 200) {
                setHostelList(response.data.data);
            } else {
                setHostelList([]);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch hosteller data on component mount
    // useEffect(() => {
    //     handleSearch();
    // }, []);

    // Handle edit action for a hosteller
    const handleEdit = (row) => {
        setFormData({
            ...row,
            joiningDate: moment(row.joiningDate).format("YYYY-MM-DD"),
        });
        handlePopup();
        console.log("Inside Edit.......", row);
    };

    return (
        <div style={{ margin: '1%' }}>
            <Paper sx={{ padding: 1 }}>
                <div>
                    <form >
                        <Stack direction="row" spacing={2} margin={2}>
                            <TextField
                                sx={{ width: 250 }}
                                name="fullName"
                                value={searhForm.fullName}
                                onChange={handleSeach}
                                variant="outlined"
                                label="Full Name"
                            />
                            <TextField
                                sx={{ width: 250 }}
                                name="emailId"
                                value={searhForm.emailId}
                                onChange={handleSeach}
                                variant="outlined"
                                label="Email Id"
                            />
                        </Stack>
                    </form >
                    <div align='right'>
                        <Button sx={{ width: 150,marginRight:4 }}
                        variant="contained" onClick={handleSearch}>Search</Button>
                    </div>
                </div>
                <div style={{ margin: '1%' }}>
                    <Button onClick={handlePopup} color="primary" variant="contained">
                        Add Hosteller (+)
                    </Button>
                </div>
                <div style={{ margin: '1%' }}>
                    <TableContainer >
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'gray' }}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} style={{ color: 'white', fontSize: '12px' }}>{column.name}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {hostelList.length === 0 ? (
                                    <TableRow style={{ height: 150 }}>
                                        <TableCell colSpan={columns.length} align="center">No Result Found</TableCell>
                                    </TableRow>
                                ) : (
                                    hostelList.map((row, i) => (
                                        <TableRow key={i}>
                                            <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                                                <Tooltip title="Edit" arrow>
                                                    <IconButton size='small'
                                                        onClick={e => { handleEdit(row) }}
                                                    >
                                                        <BiSolidEdit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete" arrow>
                                                    <IconButton size='small'
                                                    // onClick={e => { handleEdit(row) }}
                                                    >
                                                        <MdOutlineDeleteForever />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell style={{ fontSize: '12px' }} >{row.fullName}</TableCell>
                                            <TableCell style={{ fontSize: '12px' }}>{row.emailId}</TableCell>
                                            <TableCell style={{ fontSize: '12px' }}>{row.phoneNumber}</TableCell>
                                            <TableCell style={{ fontSize: '12px' }}>{row.fee}</TableCell>
                                            <TableCell style={{ fontSize: '12px' }}>{row.joiningDate}</TableCell>
                                            <TableCell style={{ fontSize: '12px' }}>{row.address}</TableCell>
                                            <TableCell style={{ fontSize: '12px' }}>{row.proof}</TableCell>
                                            <TableCell style={{ fontSize: '12px' }}>{row.reason}</TableCell>
                                            <TableCell style={{ fontSize: '12px' }}>{row.vacatedDate}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Paper>
            <HostelForm open={open} handlePopup={handlePopup} formData={formData} setFormData={setFormData}
                handleSearch={handleSearch} />
        </div>
    );
}

export default Hostel;

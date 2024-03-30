import React, { useEffect, useState } from 'react';
import { Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { fetchHostellers,clearHostellersState, resetFormData,updateFormData, } from '../store/hostelSlice';
import HostelForm from './HostelForm';
import moment from 'moment';

function Hostel() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearHostellersState());
            dispatch(resetFormData());
        };
    }, [dispatch]);

    const hostellers = useSelector((state) => state.hostellers.hostellers);
    const formData = useSelector((state) => state.hostellers.currentFormData);

    const [searhForm, setSearhForm] = useState({
        "fullName": "",
        "emailId": "",
    });

    const handleForm = (e) => {
        const { name, value } = e.target;
        setSearhForm({
            ...searhForm,
            [name]: value
        });
    };

    const handlePopup = () => {
        setOpen(!open);
        if(open){
            dispatch(resetFormData());
        }
        console.log(formData);
    };

    const handleEdit = (row) => {
        const updatedFormData = {
          ...row,
          joiningDate: moment(row.joiningDate).format("YYYY-MM-DD"),
        };
        dispatch(updateFormData(updatedFormData));
        handlePopup();
        console.log("Inside Edit.......", row);
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
    const handleSearch = () => {
        dispatch(fetchHostellers(searhForm));
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
                                onChange={handleForm}
                                variant="outlined"
                                label="Full Name"
                            />
                            <TextField
                                sx={{ width: 250 }}
                                name="emailId"
                                value={searhForm.emailId}
                                onChange={handleForm}
                                variant="outlined"
                                label="Email Id"
                            />
                        </Stack>
                    </form >
                    <div align='right'>
                        <Button sx={{ width: 150, marginRight: 4 }}
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
                                {hostellers && hostellers.statusCode !== 200 ? (
                                    <TableRow style={{ height: 150 }}>
                                        <TableCell colSpan={columns.length} align="center">No Result Found</TableCell>
                                    </TableRow>
                                ) : (
                                    hostellers && hostellers.data && hostellers.data.map((row, i) => (
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
                                                    <IconButton size='small'>
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
            <HostelForm open={open} handlePopup={handlePopup} formData={formData}
                handleSearch={handleSearch} />
        </div>
    );
}

export default Hostel;

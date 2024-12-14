import React, { useEffect, useState } from 'react';
import { Button, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { fetchHostellers, clearHostellersState, resetFormData, updateFormData, updateSearchForm } from '../store/hostelSlice';
import HostelForm from './HostelForm';
import moment from 'moment';
import './Hostel.css'
import { RingLoader } from 'react-spinners';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { decrypt } from '../utils/Aes';

function Hostel() {
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState("asc");
    const hostellers = useSelector((state) => state.hostellers.hostellers);
    const formData = useSelector((state) => state.hostellers.currentFormData);
    const searchForm = useSelector((state) => state.hostellers.searchForm);
    const totalElements = useSelector((state) => state.hostellers.totalElements);
    const loading = useSelector((state) => state.hostellers.loading);
    const [localSearchForm, setLocalSearchForm] = useState({
        "fullName": "",
        "emailId": "",
    });

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearHostellersState());
            dispatch(resetFormData());
        };
    }, [dispatch]);

    // useEffect(() => {
    //     // This effect will run whenever pageNumber or pageSize changes
    //     search(searchForm);
    // }, [searchForm.pageNumber, searchForm.pageSize]);

    // const handleSearchForm = (e) => {
    //     const { name, value } = e.target;
    //     dispatch(updateSearchForm({ [name]: value }));
    // };
    const handleSearchForm = (e) => {
        const { name, value } = e.target;
        setLocalSearchForm({
            ...localSearchForm,
            [name]: value
        });
    };

    const handlePageNumber = async (event, newpage) => {
        const pageNumber = newpage;
        const searchFormUpdated = {
            ...searchForm,
            pageNumber: pageNumber,
        }
        dispatch(updateSearchForm(searchFormUpdated));
        search(searchFormUpdated);
    };

    const handlePageSize = async (event) => {
        const pageSize = +event.target.value;
        const searchFormUpdated = {
            ...searchForm,
            pageNumber: 0,
            pageSize: pageSize,
        }
        await dispatch(updateSearchForm(searchFormUpdated));
        search(searchFormUpdated);
    };

    const handlePopup = () => {
        setOpen(!open);
        if (open) {
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
    const handleSearch = async () => {
        const searchFormUpdated = {
            ...searchForm,
            fullName: localSearchForm.fullName,
            emailId: localSearchForm.emailId,
            pageNumber: 0,
        }
        await dispatch(updateSearchForm(searchFormUpdated));
        search(searchFormUpdated);
    };

    const search = (searchForm) => {
        const formFinal = {
            ...searchForm,
            pageNumber: searchForm.pageNumber + 1,
        };
        dispatch(fetchHostellers(formFinal));
    };

    const handleOrder = (sortBy) => {
        if (order === "asc") {
            setOrder("desc");
        } else {
            setOrder("asc");
        }
        const searchFormUpdated = {
            ...searchForm,
            sortOrder: order,
            sortBy: sortBy,
        }
        dispatch(updateSearchForm(searchFormUpdated));
        search(searchFormUpdated);
    };

    return (
        <div>
            <Paper sx={{ padding: 1 }}>
                <div>
                    <form >
                        <Stack direction="row" spacing={2} margin={2}>
                            <TextField
                                sx={{ width: 250 }}
                                name="fullName"
                                value={localSearchForm.fullName}
                                onChange={handleSearchForm}
                                variant="outlined"
                                label="Full Name"
                            />
                            <TextField
                                sx={{ width: 250 }}
                                name="emailId"
                                value={localSearchForm.emailId}
                                onChange={handleSearchForm}
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
                <div style={{ margin: '1%', maxHeight: '46vh', overflowY: 'auto' }}>
                    <div>
                        <Typography>Total Elements ({totalElements})</Typography>
                    </div>
                    <TableContainer >
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'gray', height: '10px' }}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} style={{ color: 'white', fontSize: '10px' }}>{column.name}
                                            {
                                                column.id === "actions" ? "" :
                                                    <IconButton size='small' onClick={e => { handleOrder(column.id) }}>
                                                        {order === "asc" ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                                                    </IconButton>
                                            }

                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    loading ? (
                                        <TableRow style={{ height: 150 }}>
                                            <TableCell colSpan={columns.length} align="center">
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    <RingLoader loading={loading} color="#3676d6" />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : hostellers && hostellers.statusCode !== 200 ? (
                                        <TableRow style={{ height: 150 }}>
                                            <TableCell colSpan={columns.length} align="center">No Result Found</TableCell>
                                        </TableRow>
                                    ) : (
                                        hostellers &&
                                        hostellers.data &&
                                        hostellers.data.content.map((row, i) => {
                                            console.log(row);
                                            console.log(row.phoneNumber);
                                            return (
                                                <TableRow key={i}>
                                                    <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Tooltip title="Edit" arrow>
                                                            <IconButton size="small" onClick={() => handleEdit(row)}>
                                                                <BiSolidEdit />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete" arrow>
                                                            <IconButton size="small">
                                                                <MdOutlineDeleteForever />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell style={{ fontSize: '10' }}>{row.fullName}</TableCell>
                                                    <TableCell style={{ fontSize: '10' }}>{row.emailId}</TableCell>
                                                    <TableCell style={{ fontSize: '10' }}>{row.phoneNumber}</TableCell>
                                                    <TableCell style={{ fontSize: '10' }}>{row.fee}</TableCell>
                                                    <TableCell style={{ fontSize: '10' }}>{row.joiningDate}</TableCell>
                                                    <TableCell style={{ fontSize: '10' }}>{row.address}</TableCell>
                                                    <TableCell style={{ fontSize: '10' }}>{row.proof}</TableCell>
                                                    <TableCell style={{ fontSize: '10' }}>{row.reason}</TableCell>
                                                    <TableCell style={{ fontSize: '10' }}>{row.vacatedDate}</TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div>
                    <TablePagination
                        rowsPerPageOptions={[2, 5, 10, 20]}
                        rowsPerPage={searchForm.pageSize}
                        page={searchForm.pageNumber}
                        count={totalElements}
                        component={'div'}
                        onPageChange={handlePageNumber}
                        onRowsPerPageChange={handlePageSize}
                    >
                    </TablePagination>
                </div>
            </Paper>
            <HostelForm open={open} handlePopup={handlePopup} formData={formData}
                search={search} />
        </div>
    );
}

export default Hostel;

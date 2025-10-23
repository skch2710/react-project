import React, { useEffect, useState } from "react";
import CommonDataGrid from "./CommonDataGrid";
import { Box } from "@mui/material";

const DataGridUsage = () => {
 const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });
  const [selectionModel, setSelectionModel] = React.useState([]);

  // Define columns
  const columns = [
    {
      field: 'coveredEntity',
      headerName: 'Covered Entity',
      width: 150,
      sortable: true,
    },
    {
      field: 'invoiceNumber',
      headerName: 'Invoice Number',
      width: 150,
      sortable: true,
    },
    {
      field: 'billingPeriod',
      headerName: 'Billing Period',
      width: 200,
      sortable: true,
    },
    {
      field: 'pharmacyEAC',
      headerName: 'Pharmacy EAC',
      width: 150,
      type: 'number',
      align: 'right',
      headerAlign: 'right',
      valueFormatter: (params) => `$ ${params.value?.toLocaleString() || 0}`,
    },
    {
      field: 'dispensingFees',
      headerName: 'Dispensing Fees',
      width: 150,
      type: 'number',
      align: 'right',
      headerAlign: 'right',
      valueFormatter: (params) => `$ ${params.value || 0}`,
    },
    // {
    //   field: 'trueUpFees',
    //   headerName: 'True Up Fees',
    //   width: 130,
    //   type: 'number',
    //   align: 'right',
    //   headerAlign: 'right',
    //   valueFormatter: (params) => `$ ${params.value || 0}`,
    // },
    // {
    //   field: 'netRemittance',
    //   headerName: 'Net Remittance',
    //   width: 150,
    //   type: 'number',
    //   align: 'right',
    //   headerAlign: 'right',
    //   valueFormatter: (params) => `$ ${params.value || 0}`,
    // },
    // {
    //   field: 'switchFee',
    //   headerName: 'Switch Fee',
    //   width: 120,
    //   type: 'number',
    //   align: 'right',
    //   headerAlign: 'right',
    //   renderCell: (params) => (
    //     <span style={{ color: params.value < 0 ? 'red' : 'inherit' }}>
    //       {params.value < 0 ? `(${Math.abs(params.value)})` : params.value || 0}
    //     </span>
    //   ),
    // },
  ];

  // Sample data
  const rows = [
    {
      id: 1,
      coveredEntity: 'ABC CE',
      invoiceNumber: 'ABC123',
      billingPeriod: '01/01/2022 - 01/01/2022',
      pharmacyEAC: 1230000.00,
      dispensingFees: 60,
      trueUpFees: 60,
      netRemittance: 60,
      switchFee: 0,
      hasCheckmark: false
    },
    {
      id: 2,
      coveredEntity: 'ABC CE S',
      invoiceNumber: 'ABC124',
      billingPeriod: '01/01/2022 - 01/01/2022',
      pharmacyEAC: 1230000.00,
      dispensingFees: 60,
      trueUpFees: 60,
      netRemittance: 60,
      switchFee: -10,
      hasCheckmark: true
    },
    {
      id: 3,
      coveredEntity: 'ABC CE',
      invoiceNumber: 'ABC123',
      billingPeriod: '01/01/2022 - 01/01/2022',
      pharmacyEAC: 1230000.00,
      dispensingFees: 60,
      trueUpFees: 60,
      netRemittance: 60,
      switchFee: -5,
      hasCheckmark: false
    },
    {
      id: 4,
      coveredEntity: 'ABC CE',
      invoiceNumber: 'ABC123',
      billingPeriod: '01/01/2022 - 01/01/2022',
      pharmacyEAC: 1230000.00,
      dispensingFees: 60,
      trueUpFees: 60,
      netRemittance: 60,
      switchFee: 0,
      hasCheckmark: false
    },
  ];

  const handleView = (row) => {
    console.log('View:', row);
  };

  const handleEdit = (row) => {
    console.log('Edit:', row);
  };

  const handleSettings = (row) => {
    console.log('Settings:', row);
  };

  return (
    <Box sx={{ p: 3 }}>
      <CommonDataGrid
        title="Invoice List"
        columns={columns}
        rows={rows}
        totalRows={4}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onView={handleView}
        onEdit={handleEdit}
        onSettings={handleSettings}
        enableActions={true}
        checkboxSelection={false}
        onSelectionChange={setSelectionModel}
        enableExport={true}
        // height={350}
      />
    </Box>
  );
};

export default DataGridUsage;
import React from "react";
import {
  DataGrid,
  Toolbar,
  ToolbarButton,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Settings as SettingsIcon,
  CheckCircle as CheckCircleIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

const CommonDataGrid = ({
  title,
  columns = [],
  rows = [],
  loading = false,
  totalRows,
  paginationModel = { page: 0, pageSize: 25 },
  onPaginationModelChange,
  onView,
  onEdit,
  onSettings,
  enableActions = true,
  customActions,
  checkboxSelection = false,
  onSelectionChange,
  enableExport = true,
  customToolbar,
  height = 350,
  pageSizeOptions = [5, 25, 50, 100],
  sortingMode = "client",
  sortModel,
  onSortModelChange,
  filterModel,
  onFilterModelChange,
  getRowClassName,
  sx = {},
  ...otherProps
}) => {
  // Custom Toolbar Component
  const CustomToolbar = () => {
    return (
      <Toolbar sx={{ p: 2, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" component="div">
            {title} {totalRows ? `(${totalRows})` : `(${rows.length})`}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton size="small">
            <MenuIcon />
          </IconButton>
          {enableExport && <ToolbarButton />}
          {customToolbar}
        </Box>
      </Toolbar>
    );
  };

  // Generate action column if enabled
  const actionColumn = enableActions
    ? {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 120,
        getActions: (params) => {
          if (customActions) {
            return customActions(params.row);
          }

          const actions = [];

          if (onView) {
            actions.push(
              <GridActionsCellItem
                icon={<VisibilityIcon fontSize="small" />}
                label="View"
                onClick={() => onView(params.row)}
              />
            );
          }

          if (onEdit) {
            actions.push(
              <GridActionsCellItem
                icon={<EditIcon fontSize="small" />}
                label="Edit"
                onClick={() => onEdit(params.row)}
              />
            );
          }

          if (onSettings) {
            actions.push(
              <GridActionsCellItem
                icon={
                  params.row.hasCheckmark ? (
                    <CheckCircleIcon color="success" fontSize="small" />
                  ) : (
                    <SettingsIcon fontSize="small" />
                  )
                }
                label="Settings"
                onClick={() => onSettings(params.row)}
              />
            );
          }

          return actions;
        },
      }
    : null;

  // Combine columns with action column
  const allColumns = actionColumn ? [actionColumn, ...columns] : columns;

  return (
    <Paper>
      <DataGrid
        rows={rows}
        columns={allColumns}
        loading={loading}
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        checkboxSelection={checkboxSelection}
        onRowSelectionModelChange={onSelectionChange}
        sortingMode={sortingMode}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        filterModel={filterModel}
        onFilterModelChange={onFilterModelChange}
        rowCount={totalRows || rows.length}
        paginationMode={totalRows ? "server" : "client"}
        getRowClassName={getRowClassName}
        slots={{
          toolbar: CustomToolbar,
        }}
        sx={{
        //   height: height,
          "& .MuiDataGrid-columnHeaders": {
            height: "30px !important",
            minHeight: "30px !important",
            backgroundColor: "#c0f46dff !important",
            fontSize: "12px !important",
          },
          "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader": {
            backgroundColor: "#c0f46dff !important",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold !important",
          },
          "& .MuiDataGrid-row": {
            maxHeight: "30px !important",
            minHeight: "30px !important",
          },
          "& .MuiDataGrid-cell": {
            maxHeight: "30px !important",
            minHeight: "30px !important",
            lineHeight: "30px !important",
            paddingTop: "0px !important",
            paddingBottom: "0px !important",
            fontSize: "12px !important",
          },
          ...sx,
        }}
        {...otherProps}
      />
    </Paper>
  );
};

export default CommonDataGrid;

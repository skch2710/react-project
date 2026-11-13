import { memo } from "react";
import { Badge } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import {
  ColumnsPanelTrigger,
  DataGrid as MuiDataGrid,
  FilterPanelTrigger,
  ToolbarButton,
} from "@mui/x-data-grid";

import { dataGridStyles } from "./dataGridStyles";

const DataGridMainControls = ({
  toolbarActions,
  additionalControls,
  disableColumnSelector,
  disableColumnFilter,
}) => (
  <>
    {!disableColumnSelector && (
      <ColumnsPanelTrigger
        render={(triggerProps) => (
          <ToolbarButton {...triggerProps} aria-label="Columns" title="Columns">
            <ViewColumnIcon fontSize="small" />
          </ToolbarButton>
        )}
      />
    )}
    {!disableColumnFilter && (
      <FilterPanelTrigger
        render={(triggerProps, state) => (
          <ToolbarButton
            {...triggerProps}
            aria-label="Filters"
            title="Filters"
            color={state.filterCount > 0 ? "primary" : "default"}
          >
            <Badge
              badgeContent={state.filterCount}
              color="primary"
              variant="dot"
            >
              <FilterListIcon fontSize="small" />
            </Badge>
          </ToolbarButton>
        )}
      />
    )}
    {additionalControls}
    {toolbarActions}
  </>
);

const DataGrid = memo(
  ({
    rows = [],
    columns = [],
    loading = false,
    checkboxSelection = false,
    disableRowSelectionOnClick = true,
    disableColumnMenu = true,
    pageSizeOptions = [5, 10, 25, 50, 100],
    initialPageSize = 10,
    rowHeight = 40,
    columnHeaderHeight = 40,
    showPagination = true,
    title = "",
    toolbarActions,
    height = 500,
    getRowId,
    onRowSelectionModelChange,
    rowSelectionModel,
    slotProps = {},
    sx = [],
    ...rest
  }) => {
    return (
      <MuiDataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        disableColumnMenu={disableColumnMenu}
        pageSizeOptions={pageSizeOptions}
        rowHeight={rowHeight}
        columnHeaderHeight={columnHeaderHeight}
        hideFooter={!showPagination}
        label={title}
        showToolbar
        slotProps={{
          ...slotProps,
          toolbar: {
            ...slotProps.toolbar,
            mainControls: (
              <DataGridMainControls
                toolbarActions={toolbarActions}
                additionalControls={slotProps.toolbar?.mainControls}
                disableColumnSelector={rest.disableColumnSelector}
                disableColumnFilter={rest.disableColumnFilter}
              />
            ),
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: initialPageSize,
            },
          },
        }}
        getRowId={getRowId}
        onRowSelectionModelChange={onRowSelectionModelChange}
        rowSelectionModel={rowSelectionModel}
        sx={[dataGridStyles, ...(Array.isArray(sx) ? sx : [sx])]}
        style={{ height }}
        {...rest}
      />
    );
  },
);

DataGrid.displayName = "DataGrid";

export default DataGrid;

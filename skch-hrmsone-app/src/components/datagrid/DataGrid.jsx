import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { ActionButton as GridActionButton, GridActionIcon } from "./GridActions";

import {
  buildTitleGroups,
  createRowFilter,
  FILTER_ROW_HEIGHT,
  FilterField,
  isFilterable,
  isSortable,
  SortContext,
  SortTitle,
} from "./DataGridFilters";
import DataGridPagination from "./DataGridPagination";
import { dataGridStyles } from "./dataGridStyles";
import OverflowTooltipCell from "./OverflowTooltipCell";

// Module-level defaults keep prop identities stable across renders.
const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};
const DEFAULT_PAGE_SIZE_OPTIONS = [25, 50, 75, 100];
const INITIAL_SORT = { field: null, direction: null };
const EMPTY_SELECTION = { type: "include", ids: new Set() };
const DEFAULT_TOOLBAR_PROPS = {
  showQuickFilter: false,
  csvOptions: { disableToolbarButton: true },
  printOptions: { disableToolbarButton: true },
};
const DEFAULT_LOCALE_TEXT = { noRowsLabel: "No Records Found." };

// Approximates 12px header text plus cell padding and the sort caret.
const getHeaderWidth = (column) =>
  Math.max(
    100,
    Math.ceil(String(column.headerName ?? column.field).length * 7) + 30,
  );

const DataGrid = memo(
  ({
    rows = EMPTY_ARRAY,
    columns = EMPTY_ARRAY,
    loading = false,
    checkboxSelection = false,
    disableMultipleRowSelection = false,
    isRowSelectable = () => true,
    disableRowSelectionOnClick = true,
    disableColumnMenu = true,
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    initialPageSize = 25,
    rowHeight = 35,
    columnHeaderHeight = 30,
    showPagination = true,
    title = "",
    toolbarActions,
    showFilterIcon = true,
    minHeight = 200,
    maxHeight = 200,
    getRowId,
    paginationMode = "client",
    sortingMode = "client",
    initialSort = INITIAL_SORT,
    rowCount,
    onPaginationModelChange,
    onSortChange,
    onFilterChange,
    onRowSelectionModelChange,
    onSelectionChange,
    rowSelectionModel,
    localeText = DEFAULT_LOCALE_TEXT,
    slotProps = EMPTY_OBJECT,
    slots = EMPTY_OBJECT,
    sx = EMPTY_ARRAY,
    ...rest
  }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [filterValues, setFilterValues] = useState(EMPTY_OBJECT);
    const filterValuesRef = useRef(EMPTY_OBJECT);
    const [sort, setSort] = useState(initialSort);
    const isEmpty = rows.length === 0;
    const [internalSelection, setInternalSelection] = useState(EMPTY_SELECTION);
    const selectionModel = rowSelectionModel ?? internalSelection;

    // Reports selection as Map<GridRowId, row>.
    const handleSelectionChange = useCallback(
      (model, details) => {
        setInternalSelection(model);
        onRowSelectionModelChange?.(model, details);
        if (!onSelectionChange) return;
        const { type, ids } = model;
        const selected = new Map();
        rows.forEach((row) => {
          const id = getRowId ? getRowId(row) : row.id;
          if (!isRowSelectable({ id, row })) return;
          if (type === "exclude" ? !ids.has(id) : ids.has(id)) {
            selected.set(id, row);
          }
        });
        onSelectionChange(selected);
      },
      [
        rows,
        getRowId,
        isRowSelectable,
        onRowSelectionModelChange,
        onSelectionChange,
      ],
    );

    // Closing the filter row only hides it; typed values and the applied filter are kept.
    const handleFilterToggle = useCallback(
      () => setShowFilters((prev) => !prev),
      [],
    );

    const handleFilterChange = useCallback(
      (field, value) => {
        const next = { ...filterValuesRef.current, [field]: value };
        filterValuesRef.current = next;
        setFilterValues(next);
        onFilterChange?.(next);
      },
      [onFilterChange],
    );

    // Direction toggles asc/desc on every click, shared by all columns.
    const handleSort = useCallback(
      (field) => {
        const next = {
          field,
          direction: sort.direction === "asc" ? "desc" : "asc",
        };
        setSort(next);
        onSortChange?.(next);
      },
      [sort.direction, onSortChange],
    );

    const sortContext = useMemo(
      () => ({
        field: sort.field,
        direction: sort.direction,
        onSort: handleSort,
      }),
      [sort, handleSort],
    );

    const sortModel = useMemo(
      () =>
        sort.field
          ? [{ field: sort.field, sort: sort.direction }]
          : EMPTY_ARRAY,
      [sort],
    );

    const columnGroupingModel = useMemo(
      () =>
        showFilters ? buildTitleGroups(columns, checkboxSelection) : undefined,
      [columns, showFilters, checkboxSelection],
    );

    const columnsWithOverflowTooltips = useMemo(
      () =>
        columns.map((column) => {
          const renderCell = column.renderCell;
          let renderHeader = column.renderHeader;
          if (showFilters) {
            renderHeader = () =>
              isFilterable(column) ? (
                <FilterField
                  column={column}
                  initialValue={filterValuesRef.current[column.field]}
                  onChange={handleFilterChange}
                />
              ) : null;
          } else if (!renderHeader) {
            const label = column.headerName ?? column.field;
            const sortable = isSortable(column);
            renderHeader = () => (
              <SortTitle
                label={label}
                field={column.field}
                sortable={sortable}
              />
            );
          }
          return {
            // Default width fits the header text; set `width` on a column to override.
            ...(column.flex === undefined && !column.width
              ? { width: getHeaderWidth(column) }
              : {}),
            ...column,
            sortable: false,
            renderHeader,
            renderCell: (params) => (
              <OverflowTooltipCell
                value={params.formattedValue ?? params.value}
              >
                {renderCell ? renderCell(params) : undefined}
              </OverflowTooltipCell>
            ),
          };
        }),
      [columns, showFilters, handleFilterChange],
    );

    const columnByField = useMemo(
      () => new Map(columns.map((column) => [column.field, column])),
      [columns],
    );

    const filteredRows = useMemo(() => {
      const rowFilter = onFilterChange
        ? null
        : createRowFilter(filterValues, columnByField);
      return rowFilter ? rows.filter(rowFilter) : rows;
    }, [rows, columnByField, filterValues, onFilterChange]);

    const mainControls = useMemo(
      () => (
        <>
          {showFilterIcon && (
            <GridActionIcon
              type="filter"
              toolbar
              disabled={isEmpty && !showFilters}
              tooltip={`${showFilters ? "Close" : "Open"} Filters`}
              onClick={handleFilterToggle}
            />
          )}
          {Array.isArray(toolbarActions)
            ? toolbarActions.map(({ type, ...action }) => (
                <GridActionButton key={type} type={type} {...action} />
              ))
            : toolbarActions}
        </>
      ),
      [
        showFilterIcon,
        isEmpty,
        showFilters,
        handleFilterToggle,
        toolbarActions,
      ],
    );

    const mergedSlots = useMemo(
      () => ({
        pagination: DataGridPagination,
        ...slots,
      }),
      [slots],
    );

    const mergedSlotProps = useMemo(
      () => ({
        ...slotProps,
        toolbar: {
          ...DEFAULT_TOOLBAR_PROPS,
          ...slotProps.toolbar,
          mainControls,
        },
      }),
      [slotProps, mainControls],
    );

    const initialState = useMemo(
      () => ({
        pagination: { paginationModel: { page: 0, pageSize: initialPageSize } },
      }),
      [initialPageSize],
    );

    const mergedSx = useMemo(
      () => [dataGridStyles, ...(Array.isArray(sx) ? sx : [sx])],
      [sx],
    );

    const style = useMemo(
      () => ({ minHeight, maxHeight }),
      [minHeight, maxHeight],
    );

    return (
      <SortContext.Provider value={sortContext}>
        <MuiDataGrid
          rows={filteredRows}
          columns={columnsWithOverflowTooltips}
          loading={loading}
          checkboxSelection={checkboxSelection}
          disableMultipleRowSelection={
            disableMultipleRowSelection || (checkboxSelection && isEmpty)
          }
          isRowSelectable={isRowSelectable}
          disableRowSelectionOnClick={disableRowSelectionOnClick}
          disableColumnMenu={disableColumnMenu}
          pageSizeOptions={pageSizeOptions}
          rowHeight={rowHeight}
          
          columnHeaderHeight={
            showFilters ? FILTER_ROW_HEIGHT : columnHeaderHeight
          }
          columnGroupHeaderHeight={columnHeaderHeight}
          columnGroupingModel={columnGroupingModel}
          sortModel={sortModel}
          sortingMode={sortingMode}
          paginationMode={paginationMode}
          rowCount={rowCount}
          onPaginationModelChange={onPaginationModelChange}
          hideFooter={!showPagination}
          label={title}
          showToolbar
          slots={mergedSlots}
          slotProps={mergedSlotProps}
          localeText={localeText}
          initialState={initialState}
          getRowId={getRowId}
          onRowSelectionModelChange={handleSelectionChange}
          rowSelectionModel={selectionModel}
          sx={mergedSx}
          className={showFilters ? "filters-open" : undefined}
          style={style}
          {...rest}
        />
      </SortContext.Provider>
    );
  },
);

DataGrid.displayName = "DataGrid";

export default DataGrid;

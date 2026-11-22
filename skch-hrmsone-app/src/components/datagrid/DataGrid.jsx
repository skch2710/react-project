import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  ActionButton as GridActionButton,
  GridActionIcon,
} from "./GridActions";

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
import { getHeaderWidth, getSelectedRowsMap } from "./dataGridHelper";
import OverflowTooltipCell from "./OverflowTooltipCell";

// Module-level defaults keep prop identities stable across renders.
const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};
const DEFAULT_IS_ROW_SELECTABLE = () => true;
const DEFAULT_PAGE_SIZE_OPTIONS = [5, 25, 50, 75, 100];
const INITIAL_PAGE_SIZE = 25;
const INITIAL_SORT = { field: null, direction: null };
const EMPTY_SELECTION = { type: "include", ids: new Set() };
const DEFAULT_TOOLBAR_PROPS = {
  showQuickFilter: false,
  csvOptions: { disableToolbarButton: true },
  printOptions: { disableToolbarButton: true },
};
const DEFAULT_LOCALE_TEXT = { noRowsLabel: "No Records Found." };
const ROW_HEIGHT = 35;
const COLUMN_HEADER_HEIGHT = 30;

const DataGrid = memo(
  ({
    title = "",
    rows = EMPTY_ARRAY,
    columns = EMPTY_ARRAY,
    getRowId,
    loading = false,
    checkboxSelection = false,
    disableMultipleRowSelection = false,
    isRowSelectable = DEFAULT_IS_ROW_SELECTABLE,
    onSelectionChange,
    toolbarActions,
    showFilterIcon = true,
    showPagination = true,
    paginationMode = "client",
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    initialPageSize = INITIAL_PAGE_SIZE,
    paginationModel,
    rowCount,
    onPaginationModelChange,
    sortingMode = "client",
    initialSort = INITIAL_SORT,
    onSortChange,
    onFilterChange,
    minHeight = 250,
    maxHeight = 500,
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

    // Reports selection as Map<GridRowId, row>.
    const handleSelectionChange = useCallback(
      (model) => {
        setInternalSelection(model);
        if (!onSelectionChange) return;
        onSelectionChange(
          getSelectedRowsMap(model, rows, getRowId, isRowSelectable),
        );
      },
      [rows, getRowId, isRowSelectable, onSelectionChange],
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
      [sort.field, sort.direction, onSortChange],
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
              onClick={() => setShowFilters((prev) => !prev)}
            />
          )}
          {Array.isArray(toolbarActions)
            ? toolbarActions.map(({ type, ...action }) => (
                <GridActionButton key={type} type={type} {...action} />
              ))
            : toolbarActions}
        </>
      ),
      [showFilterIcon, isEmpty, showFilters, toolbarActions],
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
          label={title}
          rows={filteredRows}
          columns={columnsWithOverflowTooltips}
          getRowId={getRowId}
          loading={loading}
          checkboxSelection={checkboxSelection}
          disableMultipleRowSelection={
            disableMultipleRowSelection || (checkboxSelection && isEmpty)
          }
          isRowSelectable={isRowSelectable}
          disableRowSelectionOnClick
          disableColumnMenu
          pageSizeOptions={pageSizeOptions}
          rowHeight={ROW_HEIGHT}
          columnHeaderHeight={
            showFilters ? FILTER_ROW_HEIGHT : COLUMN_HEADER_HEIGHT
          }
          columnGroupHeaderHeight={COLUMN_HEADER_HEIGHT}
          columnGroupingModel={columnGroupingModel}
          sortModel={sortModel}
          sortingMode={sortingMode}
          paginationMode={paginationMode}
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={onPaginationModelChange}
          hideFooter={!showPagination}
          showToolbar
          slots={mergedSlots}
          slotProps={mergedSlotProps}
          localeText={DEFAULT_LOCALE_TEXT}
          initialState={initialState}
          onRowSelectionModelChange={handleSelectionChange}
          rowSelectionModel={internalSelection}
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

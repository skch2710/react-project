import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridHeaderCheckbox,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { createContext, memo, useContext, useMemo } from "react";

import DatePicker from "../datepicker/DatePicker";
import DropDown from "../dropdown/DropDown";
import TextField from "../form/TextField";
import { DATE_FORMAT } from "../../utils/constants";

dayjs.extend(customParseFormat);

export const FILTER_ROW_HEIGHT = 50;

const toOption = (opt) =>
  typeof opt === "object" ? opt : { label: opt, value: opt };

// Builds one predicate for all active filters, or null when none are active.
export const createRowFilter = (filterValues, columnByField) => {
  const checks = Object.entries(filterValues)
    .filter(([, value]) => value)
    .map(([field, value]) => {
      const type = columnByField.get(field)?.filterType;
      const cell = (row) => String(row[field] ?? "");
      if (type === "select") return (row) => cell(row) === value;
      if (type === "date") return (row) => cell(row) === value;
      const needle = value.toLowerCase();
      return (row) => cell(row).toLowerCase().includes(needle);
    });
  return checks.length ? (row) => checks.every((check) => check(row)) : null;
};

export const isFilterable = (column) =>
  column.filterable !== false && column.field !== "actions";

export const isSortable = (column) =>
  column.sortable !== false && column.field !== "actions";

export const FilterField = memo(({ column, onChange, initialValue }) => {
  const label = column.headerName ?? column.field;
  const type = column.filterType ?? "text";
  const options = useMemo(
    () => (column.filterOptions ?? []).map(toOption),
    [column.filterOptions],
  );
  const ariaLabel = `Filter ${label}`;
  const dateValue = initialValue
    ? dayjs(initialValue, DATE_FORMAT, true)
    : null;

  return (
    <div
      style={{ width: "100%" }}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      {type === "select" && (
        <DropDown
          options={options}
          labelKey="label"
          valueKey="value"
          value={options.find((option) => option.value === initialValue) ?? null}
          placeholder={`Select ${label}`}
          onChange={(option) => onChange(column.field, option?.value ?? "")}
          inputProps={{ "aria-label": ariaLabel }}
        />
      )}
      {type === "date" && (
        <DatePicker
          value={dateValue?.isValid() ? dateValue : null}
          onChange={(date) =>
            onChange(
              column.field,
              date?.isValid() ? date.format(DATE_FORMAT) : "",
            )
          }
          slotProps={{
            textField: {
              slotProps: { htmlInput: { "aria-label": ariaLabel } },
            },
          }}
        />
      )}
      {type !== "select" && type !== "date" && (
        <TextField
          placeholder={label}
          defaultValue={initialValue ?? ""}
          onChange={(e) => onChange(column.field, e.target.value)}
          slotProps={{ htmlInput: { "aria-label": ariaLabel } }}
        />
      )}
    </div>
  );
});
FilterField.displayName = "FilterField";

// Sort state is shared via context so column definitions stay stable on sort.
export const SortContext = createContext({
  field: null,
  direction: null,
  onSort: () => {},
});

// Sort caret is always visible; the native sort icon is hidden in dataGridStyles.
export const SortTitle = ({ label, field, sortable }) => {
  const { field: sortField, direction, onSort } = useContext(SortContext);
  const SortIcon =
    direction === "desc" ? KeyboardArrowDownIcon : KeyboardArrowUpIcon;

  return (
    <div
      role={sortable ? "button" : undefined}
      onClick={sortable ? () => onSort(field) : undefined}
      className={`grid-sort-title${sortable ? " is-sortable" : ""}`}
    >
      <span className="MuiDataGrid-columnHeaderTitle">{label}</span>
      {sortable && (
        <SortIcon
          className={`grid-sort-icon${sortField === field ? " is-active" : ""}`}
        />
      )}
    </div>
  );
};

// Title row rendered above the filter row.
export const buildTitleGroups = (columns, checkboxSelection = false) => {
  const groups = columns.map((column) => {
    const label = column.headerName ?? column.field;
    const sortable = isSortable(column);
    return {
      groupId: `__title_${column.field}`,
      headerName: label,
      children: [{ field: column.field }],
      renderHeaderGroup: () => (
        <SortTitle label={label} field={column.field} sortable={sortable} />
      ),
    };
  });
  if (checkboxSelection) {
    // The select-all checkbox is hidden in the filter row via CSS and shown here.
    groups.unshift({
      groupId: "__title___check__",
      children: [{ field: GRID_CHECKBOX_SELECTION_COL_DEF.field }],
      renderHeaderGroup: () => (
        <GridHeaderCheckbox
          field={GRID_CHECKBOX_SELECTION_COL_DEF.field}
          colDef={GRID_CHECKBOX_SELECTION_COL_DEF}
        />
      ),
    });
  }
  return groups;
};

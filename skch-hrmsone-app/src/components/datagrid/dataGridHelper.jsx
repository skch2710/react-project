import { formatValueFromString } from "../../utils/globalHelper";

export const getHeaderWidth = (column) =>
  Math.max(
    100,
    Math.ceil(String(column.headerName ?? column.field).length * 7) + 30,
  );

export const getSelectedRowsMap = (model, rows, getRowId, isRowSelectable) => {
  const { type, ids } = model;
  const selectedRows = new Map();

  rows.forEach((row) => {
    const id = getRowId ? getRowId(row) : row.id;
    if (!isRowSelectable({ id, row })) return;
    if (type === "exclude" ? !ids.has(id) : ids.has(id)) {
      selectedRows.set(id, row);
    }
  });

  return selectedRows;
};

// Currency cell: "₹" pinned left, amount right-aligned.
export const currencyColumn = (field, headerName, width) => ({
  field,
  headerName,
  width,
  headerAlign: "left",
  renderCell: ({ value }) =>
    value ? (
      <span className="grid-currency-cell">
        <span>₹</span>
        <span>{formatValueFromString(value, false)}</span>
      </span>
    ) : null,
});

export default currencyColumn;

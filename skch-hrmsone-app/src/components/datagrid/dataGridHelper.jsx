import { formatValueFromString } from "../../utils/globalHelper";

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

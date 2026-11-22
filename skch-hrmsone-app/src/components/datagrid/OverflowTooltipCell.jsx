import { memo, useState } from "react";
import Tooltip from "@mui/material/Tooltip";

// Tooltip is mounted only while hovering an overflowing cell, so idle cells stay.
const OverflowTooltipCell = memo(({ value, children }) => {
  const [showTip, setShowTip] = useState(false);
  const text = Array.isArray(value) ? value.join(", ") : String(value ?? "");

  const cell = (
    <span
      onMouseEnter={(event) => {
        const element = event.currentTarget;
        if (text && element.scrollWidth > element.clientWidth) setShowTip(true);
      }}
      onMouseLeave={() => setShowTip(false)}
      className="grid-overflow-cell"
    >
      {children === undefined ? text : children}
    </span>
  );

  return showTip ? (
    <Tooltip title={text} open disableInteractive>
      {cell}
    </Tooltip>
  ) : (
    cell
  );
});
OverflowTooltipCell.displayName = "OverflowTooltipCell";

export default OverflowTooltipCell;

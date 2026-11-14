import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

const OverflowTooltipCell = ({ value, children }) => {
  const [open, setOpen] = useState(false);
  const text = Array.isArray(value) ? value.join(", ") : String(value ?? "");

  return (
    <Tooltip title={text} open={open && Boolean(text)} disableInteractive>
      <span
        onMouseEnter={(event) => {
          const element = event.currentTarget;
          setOpen(Boolean(text) && element.scrollWidth > element.clientWidth);
        }}
        onMouseLeave={() => setOpen(false)}
        style={{
          display: "block",
          width: "100%",
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {children === undefined ? text : children}
      </span>
    </Tooltip>
  );
};

export default OverflowTooltipCell;

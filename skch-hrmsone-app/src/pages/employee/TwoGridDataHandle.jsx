import { Grid, Stack } from "@mui/material";
import { useState } from "react";

import Button from "../../components/button/Button";
import DataGrid from "../../components/datagrid/DataGrid";

const TwoGridDataHandle = ({ rows = [], columns = [], onChange }) => {
  const [leftGridRows, setLeftGridRows] = useState(rows);
  const [rightGridRows, setRightGridRows] = useState([]);

  const [leftSelectedRows, setLeftSelectedRows] = useState(() => new Map());
  const [rightSelectedRows, setRightSelectedRows] = useState(() => new Map());

  // Move selected rows from left to right
  const handleAdd = () => {
    const movingRows = Array.from(leftSelectedRows.values());
    if (!movingRows.length) return;
    const movingIds = new Set(leftSelectedRows.keys());
    const updatedLeftRows = leftGridRows.filter(
      (row) => !movingIds.has(row.id),
    );
    const updatedRightRows = [...rightGridRows, ...movingRows];
    setLeftGridRows(updatedLeftRows);
    setRightGridRows(updatedRightRows);
    setLeftSelectedRows(new Map());

    onChange?.(updatedRightRows);
  };

  // Move selected rows from right to left
  const handleRemove = () => {
    const movingRows = Array.from(rightSelectedRows.values());
    if (!movingRows.length) return;
    const movingIds = new Set(rightSelectedRows.keys());
    const updatedRightRows = rightGridRows.filter(
      (row) => !movingIds.has(row.id),
    );
    const updatedLeftRows = [...leftGridRows, ...movingRows];
    setRightGridRows(updatedRightRows);
    setLeftGridRows(updatedLeftRows);
    setRightSelectedRows(new Map());

    onChange?.(updatedRightRows);
  };

  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      {/* Left Grid */}
      <Grid size={{ xs: 12, md: 5 }} sx={{ minWidth: 0 }}>
        <DataGrid
          title={`Left Grid (${leftGridRows.length})`}
          getRowId={(row) => row.id}
          rows={leftGridRows}
          columns={columns}
          checkboxSelection
          // disableRowSelectionExcludeModel
          onSelectionChange={setLeftSelectedRows}
        />
      </Grid>

      {/* Middle Buttons */}
      <Grid
        size={{ xs: 12, md: 2 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          direction={{ xs: "row", md: "column" }}
          spacing={2}
          sx={{ width: "100%" }}
        >
          <Button onClick={handleAdd} disabled={!leftSelectedRows.size}>
            Add &gt;&gt;
          </Button>

          <Button onClick={handleRemove} disabled={!rightSelectedRows.size}>
            &lt;&lt; Remove
          </Button>
        </Stack>
      </Grid>

      {/* Right Grid */}
      <Grid size={{ xs: 12, md: 5 }} sx={{ minWidth: 0 }}>
        <DataGrid
          title={`Right Grid (${rightGridRows.length})`}
          rows={rightGridRows}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection
          onSelectionChange={setRightSelectedRows}
          // isRowSelectable={isEmployeeRowSelectable}
        />
      </Grid>
    </Grid>
  );
};

export default TwoGridDataHandle;

import { useState } from "react";
import { Grid, Stack } from "@mui/material";

import Button from "../../components/button/Button";
import DataGrid from "../../components/datagrid/DataGrid";

const TwoGridDataHandle = ({ rows = [], columns = [], onChange }) => {
  const [availableRows, setAvailableRows] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);

  const [leftSelectedRows, setLeftSelectedRows] = useState(() => new Map());
  const [rightSelectedRows, setRightSelectedRows] = useState(() => new Map());

  // Move selected rows from left to right
  const handleAdd = () => {
    const movingRows = Array.from(leftSelectedRows.values());

    if (!movingRows.length) return;

    const movingIds = new Set(leftSelectedRows.keys());
    const updatedAvailable = availableRows.filter(
      (row) => !movingIds.has(row.id),
    );

    const updatedSelected = [...selectedRows, ...movingRows];

    setAvailableRows(updatedAvailable);
    setSelectedRows(updatedSelected);
    setLeftSelectedRows(new Map());

    onChange?.(updatedSelected);
  };

  // Move selected rows from right to left
  const handleRemove = () => {
    const movingRows = Array.from(rightSelectedRows.values());

    if (!movingRows.length) return;

    const movingIds = new Set(rightSelectedRows.keys());
    const updatedSelected = selectedRows.filter(
      (row) => !movingIds.has(row.id),
    );

    const updatedAvailable = [...availableRows, ...movingRows];

    setSelectedRows(updatedSelected);
    setAvailableRows(updatedAvailable);
    setRightSelectedRows(new Map());

    onChange?.(updatedSelected);
  };

  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      {/* Available Grid */}
      <Grid size={{ xs: 12, md: 5 }} sx={{ minWidth: 0 }}>
        <DataGrid
          rows={availableRows}
          columns={columns}
          checkboxSelection
          disableRowSelectionExcludeModel
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

      {/* Selected Grid */}
      <Grid size={{ xs: 12, md: 5 }} sx={{ minWidth: 0 }}>
        <DataGrid
          rows={selectedRows}
          columns={columns}
          checkboxSelection
          disableRowSelectionExcludeModel
          onSelectionChange={setRightSelectedRows}
        />
      </Grid>
    </Grid>
  );
};

export default TwoGridDataHandle;

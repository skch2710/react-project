import { useState } from "react";
import { Grid, Stack } from "@mui/material";

import Button from "../../components/button/Button";
import DataGrid from "../../components/datagrid/DataGrid";

const createEmptySelectionModel = () => ({
  type: "include",
  ids: new Set(),
});

const TwoGridDataHandle = ({ rows = [], columns = [], onChange }) => {
  const [availableRows, setAvailableRows] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);

  const [leftSelection, setLeftSelection] = useState(createEmptySelectionModel);
  const [rightSelection, setRightSelection] = useState(
    createEmptySelectionModel,
  );

  // Move selected rows from left to right
  const handleAdd = () => {
    const movingRows = availableRows.filter((row) =>
      leftSelection.ids.has(row.id),
    );

    if (!movingRows.length) return;

    const updatedAvailable = availableRows.filter(
      (row) => !leftSelection.ids.has(row.id),
    );

    const updatedSelected = [...selectedRows, ...movingRows];

    setAvailableRows(updatedAvailable);
    setSelectedRows(updatedSelected);
    setLeftSelection(createEmptySelectionModel());

    onChange?.(updatedSelected);
  };

  // Move selected rows from right to left
  const handleRemove = () => {
    const movingRows = selectedRows.filter((row) =>
      rightSelection.ids.has(row.id),
    );

    if (!movingRows.length) return;

    const updatedSelected = selectedRows.filter(
      (row) => !rightSelection.ids.has(row.id),
    );

    const updatedAvailable = [...availableRows, ...movingRows];

    setSelectedRows(updatedSelected);
    setAvailableRows(updatedAvailable);
    setRightSelection(createEmptySelectionModel());

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
          rowSelectionModel={leftSelection}
          onRowSelectionModelChange={setLeftSelection}
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
          <Button onClick={handleAdd} disabled={!leftSelection.ids.size}>
            Add &gt;&gt;
          </Button>

          <Button onClick={handleRemove} disabled={!rightSelection.ids.size}>
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
          rowSelectionModel={rightSelection}
          onRowSelectionModelChange={setRightSelection}
        />
      </Grid>
    </Grid>
  );
};

export default TwoGridDataHandle;

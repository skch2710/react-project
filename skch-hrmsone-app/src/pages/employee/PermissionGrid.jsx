import React, { memo, useMemo } from "react";
import { useFormikContext } from "formik";

import DataGrid from "../../components/datagrid/DataGrid";
import FormikCheckBox from "../../components/checkbox/FormikCheckBox";

const PermissionGrid = memo(({ name = "permissions", height = 400 }) => {
  const { values } = useFormikContext();

  const permissions = values[name] ?? [];

  // DataGrid requires a unique row id.
  const rows = useMemo(
    () =>
      permissions.map((permission, index) => ({
        ...permission,
        id: permission.id ?? index,
        index,
      })),
    [permissions],
  );

  const columns = useMemo(
    () => [
      {
        field: "moduleName",
        headerName: "Module",
        flex: 1,
        minWidth: 180,
        sortable: false,
      },
      ...["read", "write", "terminate"].map((field) => ({
        field,
        headerName: field.charAt(0).toUpperCase() + field.slice(1),
        width: 120,
        align: "center",
        headerAlign: "center",
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <FormikCheckBox name={`${name}.${params.row.index}.${field}`} />
        ),
      })),
    ],
    [name],
  );

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      height={height}
      disableRowSelectionOnClick
      disableColumnFilter
      disableColumnSorting
      hideFooter
      showToolbar={false}
    />
  );
});

PermissionGrid.displayName = "PermissionGrid";

export default PermissionGrid;

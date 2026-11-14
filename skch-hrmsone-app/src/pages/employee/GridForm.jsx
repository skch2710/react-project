import React, { memo, useMemo } from "react";
import { useFormikContext } from "formik";
import FormikCheckBox from "../../components/checkbox/FormikCheckBox";
import FormikDropDown from "../../components/dropdown/FormikDropDown";
import FormikTextField from "../../components/form/FormikTextField";
import DataGrid from "../../components/datagrid/DataGrid";

const GridForm = memo(({ name, columns = [], height = 400, ...gridProps }) => {
  const { values } = useFormikContext();

  const data = values[name] ?? [];

  const rows = useMemo(
    () =>
      data.map((row, index) => ({
        ...row,
        id: row.id ?? index,
        index,
      })),
    [data],
  );

  const gridColumns = useMemo(
    () =>
      columns.map((column) => {
        const {
          field,
          type = "text",
          options = [],
          labelKey = "label",
          valueKey = "value",
          renderCell,
          ...columnProps
        } = column;

        return {
          field,
          ...columnProps,

          renderCell: (params) => {
            const fieldName = `${name}.${params.row.index}.${field}`;

            if (renderCell) {
              return renderCell(params, fieldName);
            }

            switch (type) {
              case "checkbox":
                return <FormikCheckBox name={fieldName} />;

              case "dropdown":
                return (
                  <FormikDropDown
                    name={fieldName}
                    options={options}
                    labelKey={labelKey}
                    valueKey={valueKey}
                  />
                );

              case "text":
              default:
                return (
                  <FormikTextField name={fieldName} fullWidth size="small" />
                );
            }
          },
        };
      }),
    [columns, name],
  );

  return (
    <DataGrid
      rows={rows}
      columns={gridColumns}
      height={height}
      disableRowSelectionOnClick
      {...gridProps}
    />
  );
});

GridForm.displayName = "GridForm";

export default GridForm;

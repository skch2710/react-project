export const dataGridStyles = (theme) => {
  const { monochrome, blue } = theme.colors;
  const border = `1px solid ${monochrome.tableBordersColor}`;

  return {
    backgroundColor: monochrome.offWhite,
    border: "none",
    borderRadius: "10px",
    boxShadow: "0 0 18px rgb(78 125 150 / 8%)",
    padding: "10px 20px",

    // "& .MuiDataGrid-toolbarLabel": {
    //   font: "inherit",
    //   fontFamily: theme.typography.h5.fontFamily,
    //   fontSize: theme.typography.h5.fontSize,
    //   fontWeight: theme.typography.h5.fontWeight,
    //   lineHeight: theme.typography.h5.lineHeight,
    //   color: theme.typography.h5.color,
    // },

    "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader": {
      backgroundColor: monochrome.tableHeaderBackground,
      color: monochrome.tableHeaderText,
    },

    "& .MuiDataGrid-filler--horizontal, & .MuiDataGrid-scrollbarFiller": {
      backgroundColor: `${monochrome.tableHeaderBackground} !important`,
    },

    "& .MuiDataGrid-columnHeader": {
      border: border,
      borderLeft: 0,
      "&:last-of-type": { borderRight: 0 },
    },

    // "& .MuiDataGrid-main": {
    //     borderLeft: border,
    //     borderRight: border,
    // },

    "& .MuiDataGrid-columnHeaderTitle": {
      color: monochrome.tableHeaderText,
      fontWeight: 500,
      fontSize: 12,
      whiteSpace: "nowrap",
    },

    "& .MuiDataGrid-toolbar": {
      flex: "0 0 auto",
      padding: "0 0 10px 0",
      minHeight: 40,
      borderBottom: "none",
      gap: "8px",
    },

    "& .MuiDataGrid-iconButtonContainer": {
      display: "none",
    },

    "& .MuiDataGrid-columnHeader:hover .MuiDataGrid-columnHeaderTitle": {
      color: blue.dark,
    },

    "& .MuiDataGrid-cell": {
      fontSize: 12,
      color: monochrome.tableCellColor,
      borderRight: border,
      "&:last-of-type": { borderRight: 0 },
    },

    "& .MuiDataGrid-row:last-of-type .MuiDataGrid-cell": {
      borderBottom: border,
    },
    "& .MuiDataGrid-overlayWrapperInner": {
      borderBottom: border,
    },

    // "& .MuiDataGrid-virtualScrollerContent": {
    //   marginBottom: "12px",
    // },
    "& .MuiDataGrid-virtualScroller": {
      borderLeft: border,
      borderRight: border,
    },

    // "& .MuiDataGrid-cell.custom-cell-yellowcolor": {
    //   color: theme.colors.yellow.default,
    // },

    "& .MuiDataGrid-cell:has(+ .MuiDataGrid-cellEmpty), & .MuiDataGrid-cellEmpty, & .MuiDataGrid-columnHeader--last":
      {
        borderRight: "0 !important",
      },

    // "& .MuiDataGrid-row:hover, & .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected:hover":
    //   {
    //     backgroundColor: "transparent",
    //   },

    "& .MuiDataGrid-footerContainer": {
      backgroundColor: monochrome.offWhite,
      borderTop: "none",
    },

    "& .MuiTablePagination-toolbar": {
      minHeight: 0,
    },

    "& .MuiDataGrid-columnSeparator": {
      visibility: "hidden",
    },

    "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within":
      {
        outline: "none",
      },

    "&.filters-open .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--filledGroup):not(.MuiDataGrid-columnHeader--emptyGroup)":
      {
        backgroundColor: "#fff",
        borderTop: 0,
      },

    "&.filters-open .MuiDataGrid-columnHeaderTitleContainer, &.filters-open .MuiDataGrid-columnHeaderTitleContainerContent":
      {
        width: "100%",
        minWidth: 0,
        overflow: "visible",
        borderBottom: 0,
      },

    "&.filters-open .MuiDataGrid-columnHeader.MuiDataGrid-columnHeaderCheckbox:not(.MuiDataGrid-columnHeader--filledGroup) .MuiCheckbox-root":
      {
        visibility: "hidden",
      },

    "& .grid-overflow-cell": {
      display: "block",
      width: "100%",
      minWidth: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },

    "& .grid-currency-cell": {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },

    "& .grid-sort-title": {
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "100%",
      cursor: "default",
      "&.is-sortable": { cursor: "pointer" },
    },

    "& .grid-sort-icon": {
      fontSize: 20,
      color: monochrome.tableHeaderText,
      stroke: monochrome.tableHeaderBackground,
      strokeWidth: 1,
    },

    "& .grid-pagination": {
      display: "flex",
      gap: "3px",
      justifyContent: "flex-end",
      padding: "10px 5px",
    },

    "& .grid-pagination-item": {
      height: 26,
      minWidth: 26,
      fontSize: 12,
      border: `1px solid ${monochrome.border}`,
    },

    "& .grid-pagination-select": {
      height: 26,
      padding: "2px",
      fontSize: 14,
      border: `1px solid ${monochrome.border}`,
      borderRadius: "4px",
      backgroundColor: monochrome.offWhite,
      "&:disabled": {
        opacity: theme.palette.action.disabledOpacity,
        color: theme.palette.action.disabled,
        cursor: "default",
      },
    },
  };
};

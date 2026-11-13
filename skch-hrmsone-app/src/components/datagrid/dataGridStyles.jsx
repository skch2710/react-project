export const dataGridStyles = {
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#E0F2FE",
    color: "#1F2937",
    fontWeight: 550,
  },

  "& .MuiDataGrid-filler--horizontal": {
    backgroundColor: "#E0F2FE !important",
  },

  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#E0F2FE",
    borderRight: "1px solid #E5E7EB",
  },

  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 550,
    fontSize: 14,
  },

  "& .MuiDataGrid-cell": {
    fontSize: 12,
    color: "#0b254f",
    borderRight: "1px solid #E5E7EB",
    borderBottom: "1px solid #E5E7EB",
  },

  "&:has(.MuiDataGrid-scrollbar--vertical) .MuiDataGrid-cell:last-of-type, &:has(.MuiDataGrid-scrollbar--vertical) .MuiDataGrid-columnHeader--last":
    {
      borderRight: "none",
    },

  "& .MuiDataGrid-row:hover": {
    backgroundColor: "#F0F9FF",
  },

  "& .MuiDataGrid-row.Mui-selected": {
    backgroundColor: "#E0F2FE",
  },

  "& .MuiDataGrid-row.Mui-selected:hover": {
    backgroundColor: "#D1EAFE",
  },

  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "#F9FAFB",
  },

  "& .MuiDataGrid-columnSeparator": {
    visibility: "hidden",
  },

  "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
    outline: "none",
  },
};

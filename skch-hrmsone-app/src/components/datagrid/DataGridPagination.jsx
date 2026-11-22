import { Box, Pagination, PaginationItem } from "@mui/material";
import {
  gridPageCountSelector,
  gridPaginationModelSelector,
  gridPaginationRowCountSelector,
  useGridApiContext,
  useGridRootProps,
  useGridSelector,
} from "@mui/x-data-grid";

const DataGridPagination = () => {
  const apiRef = useGridApiContext();
  const { pageSizeOptions } = useGridRootProps();
  const { page, pageSize } = useGridSelector(
    apiRef,
    gridPaginationModelSelector,
  );
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const rowCount = useGridSelector(apiRef, gridPaginationRowCountSelector);
  const options = pageSizeOptions.map((o) =>
    typeof o === "object" ? o.value : o,
  );

  return (
    <Box className="grid-pagination">
      <Pagination
        disabled={rowCount <= 0}
        count={pageCount || 1}
        page={page + 1}
        variant="outlined"
        shape="rounded"
        onChange={(_, value) => apiRef.current.setPage(value - 1)}
        renderItem={(item) => (
          <PaginationItem {...item} className="grid-pagination-item" />
        )}
      />
      <Box
        component="select"
        className="grid-pagination-select"
        value={pageSize}
        disabled={rowCount <= 0}
        onChange={(e) => apiRef.current.setPageSize(Number(e.target.value))}
      >
        {options.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </Box>
    </Box>
  );
};

export default DataGridPagination;

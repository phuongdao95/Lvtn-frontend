import { Box } from "@mui/system";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";

export default function DataGrid({
    rows,
    columns,
    isLoading,
    pageSize = 8,
    height = 650,
    rowsPerPageOptions = [8],
    isError,
    isSuccess,
    ...rest
}) {
    return <Box sx={{ height: height }}>
        <MuiDataGrid
            rows={rows}
            columns={columns}
            loading={isLoading}
            pageSize={pageSize}
            rowsPerPageOptions={rowsPerPageOptions}
            {...rest}
        />
    </Box>
}
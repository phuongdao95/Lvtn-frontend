import { LinearProgress } from "@mui/material";
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
            components={{
                LoadingOverlay: LinearProgress
            }}
            rows={rows}
            columns={columns}
            loading={isLoading}
            pageSize={pageSize}
            rowsPerPageOptions={rowsPerPageOptions}
            disableColumnFilter
            disableSelectionOnClick
            disableColumnMenu
            {...rest}
        />
    </Box>
}
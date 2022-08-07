import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { Avatar, Chip } from "@mui/material";
import { Box } from "@mui/system";

const columns = [
  {
    field: "name",
    headerName: "Resource Name",
    width: 150,
  },
  {
    field: "permissionList",
    headerName: "Permissions",
    flex: 1,

    renderCell: (params) => {
      return (
        <Box sx={{ display: "flex", gap: 2 }}>
          {params.formattedValue.map((item) => (
            <Chip
              label={item}
              sx={{
                "& .MuiChip-label": {
                  textTransform: "capitalize",
                },
              }}
            />
          ))}
        </Box>
      );
    },
  },
];

const rows = new Array(32).fill(0).map((value, index, array) => ({
  id: index,
  name: `Resource ${index}`,
  permissionList: ["create", "update", "retreive", "delete"],
}));

export default function PermissionList() {
  return (
    <div
      style={{ height: 600, width: "100%", background: "white", padding: 2 }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        bulkActionButtons={false}
      />
    </div>
  );
}

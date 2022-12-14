import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "id",
    headerName: "Id",
  },
  {
    field: "name",
    headerName: "Tên",
    width: 150,
  },
  {
    field: "departmentName",
    headerName: "Phòng ban",
    width: 270,
  },
  {
    field: "description",
    headerName: "Mô tả",
    width: 300,
  },
];

const rows = new Array(32).fill(0).map((value, index, array) => ({
  id: index,
  name: "Admin",
  departmentName: "Marketing",
  description: "...",
}));

export default function RoleList() {
  return (
    <div
      style={{ height: 600, width: "100%", background: "white", padding: 2 }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  );
}

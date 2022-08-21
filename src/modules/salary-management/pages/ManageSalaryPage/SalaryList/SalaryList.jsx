import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const columns = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "employeeCode",
    headerName: "Employee Code",
    width: 150,
  },

  {
    field: "fullName",
    headerName: "Full name",
    width: 150,
  },

  {
    field: "role",
    headerName: "Role",
    width: 150,
  },

  {
    field: "baseSalary",
    headerName: "Base salary",
    width: 150,
  },

  {
    field: "bankName",
    headerName: "Bank Name",
    width: 150,
  },

  {
    field: "bankAccountNumber",
    headerName: "Bank Number",
    width: 150,
  },

  {
    field: "workingSchedule",
    headerName: "Working Schedule",
    width: 150,
  },
];

const rows = new Array(30).fill(0).map((value, index, array) => ({
  id: index,
  employeeCode: "012345678",
  fullName: "Nguyen Van A",
  role: "Admin",
  baseSalary: "10909000",
  bankName: "ACB",
  bankAccountNumber: "019237418",
  workingSchedule: "40hrs / week",
}));

export default function SalaryList() {
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { Avatar } from "@mui/material";

const columns = [
  {
    field: "id",
    headerName: "Id",
    width: 70,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 50,
    renderCell: (params) => {
      return (
        <>
          <Avatar sx={{ width: 32, height: 32 }} src={params.value.avatar} />
        </>
      );
    },
  },

  {
    field: "username",
    headerName: "Username",
    width: 130,
  },

  {
    field: "role",
    headerName: "Role",
    width: 100,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 230,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 230,
  },
  {
    field: "age",
    headerName: "Age",
    width: 90,
  },
  {
    field: "phoneNumber",
    headerName: "Phone number",
    width: 150,
    sortable: true,
  },

  {
    field: "gender",
    headerName: "Gender",
    width: 120,
    sortable: false,
  },
];

const rows = new Array(32).fill(0).map((value, index, array) => ({
  id: index,
  role: "Admin",
  lastName: "Snow",
  firstName: "Jon",
  avatar: "",
  age: 35,
  username: "jonjon12",
  email: "jonjon123@gmail.com",
  phoneNumber: "098238147",
  gender: "Male",
}));

export default function CustomDataGrid() {
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

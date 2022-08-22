import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "code", headerName: "Code", width: 150 },
  { field: "type", headerName: "Type", width: 150 },
  { field: "associatedFormula", headerName: "Formula", width: 200 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "applyType", headerName: "Apply Type", width: 100 },
];

const rows = new Array(30).fill(0).map((value, index, array) => ({
  id: index,
  code: "012345678",
  type: "Allowance",
  associatedFormula: "allowance_type_1",
  description: "",
  applyType: "Role",
}));

export default function AllowanceTemplateList() {
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

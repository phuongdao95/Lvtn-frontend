import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "code", headerName: "Code", width: 150 },
  { field: "type", headerName: "Type", width: 150 },
  { field: "fromDate", headerName: "From date", width: 150 },
  { field: "toDate", headerName: "To date", width: 150 },
  { field: "associatedFormula", headerName: "Formula", width: 200 },
  { field: "applyType", headerName: "Apply Type", width: 100 },
];

const rows = new Array(30).fill(0).map((value, index, array) => ({
  id: index,
  code: "012345678",
  type: "Bonus",
  fromDate: "07/01/2022",
  toDate: "07/12/2022",
  associatedFormula: "bonus_type_1",
  applyType: "Role" /**Role, List, Department */,
}));

export default function BonusList() {
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

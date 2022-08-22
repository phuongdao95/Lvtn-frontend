import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "code", headerName: "Code", width: 150 },
  { field: "type", headerName: "Type", width: 150 },
  { field: "associatedFormula", headerName: "Formula", width: 200 },
  { field: "applyType", headerName: "Apply Type", width: 100 },
];

const rows = new Array(30).fill(0).map((value, index, array) => ({
  id: index,
  code: "012345678",
  type: "Bonus",
  associatedFormula: "bonus_type_1",
  applyType: "Role" /**Role, List, Department */,
}));

export default function BonusTemplateList() {
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

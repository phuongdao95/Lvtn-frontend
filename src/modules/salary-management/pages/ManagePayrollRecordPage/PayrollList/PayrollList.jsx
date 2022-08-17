import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "employeeCode",
    headerName: "Employee code",
    width: 150,
  },

  {
    field: "employeeName",
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
    field: "deductionTotal",
    headerName: "Total deduction",
    width: 150,
  },

  {
    field: "allowanceTotal",
    headerName: "Total allowance",
    width: 150,
  },

  {
    field: "bonusTotal",
    headerName: "Total bonus",
    width: 150,
  },

  {
    field: "baseSalary",
    headerName: "Base salary",
    width: 150,
  },

  {
    field: "netSalary",
    headerName: "Net salary",
    width: 150,
  },
];

const rows = new Array(32).fill(0).map((index, value, array) => ({
  id: index,
  role: "Engineer",
  employeeCode: "01294857",
  employeeName: "Le Nguyen A",
  totalWorkingHours: 40,
  deductionTotal: 120_000,
  allowanceTotal: 120_000,
  bonusTotal: 120_000,
  baseSalary: 12_000_000,
  netSalary: 12_120_000,
}));

export default function PayrollList() {
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

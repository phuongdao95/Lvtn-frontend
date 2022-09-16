import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Chip } from "@mui/material";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },

  {
    field: "displayName",
    headerName: "Display Name",
    width: 150,
  },

  {
    field: "inputVariables",
    headerName: "Input variables",
    width: 150,
    renderCell: (params) => {
      return (
        <Box>
          <Chip label="variable_1" />;
          <Chip label="variable_2" />;
        </Box>
      );
    },
  },

  {
    field: "type",
    headerName: "Type",
    width: 150,
  },

  {
    field: "define",
    headerName: "Define",
    flex: 1,
    width: 150,
  },

  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
];

const rows = new Array(30).fill(0).map((value, index, array) => ({
  id: index,
  name: `formula_${index}`,
  displayName: `Formula ${index}`,
  inputVariables: [],
  type: "Formula" /**Can be Variable as well  */,
  dataType: "Number" /**Can be Text, Number, Boolean */,
  define: "variable_1 + variable_2 * variable_1 - variable_2",
  description: "A formula",
}));

export default function FormulaList() {
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

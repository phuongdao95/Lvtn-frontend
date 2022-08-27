import React from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import EditTemplatePopup from "../EditTemplatePopup/EditTemplatePopup";


const rows = new Array(30).fill(0).map((value, index, array) => ({
  id: index,
  code: "012345678",
  type: "Allowance",
  associatedFormula: "allowance_type_1",
  description: "",
  applyType: "Role",
  action: ""
}));

export default function AllowanceTemplateList() {
  const [isCreatePopupOpen, setIsCreatePopupOpen] = React.useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = React.useState(false);

  const columns = React.useMemo(() => [
    { field: "code", headerName: "Code", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "associatedFormula", headerName: "Formula", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "applyType", headerName: "Apply Type", width: 100 },
    {
      field: "action", headerName: "Action", width: 100, renderCell: () => {
        return <Button onClick={() => setIsEditPopupOpen(true)}>
          Edit
        </Button>
      }
    }
  ]);

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      {isEditPopupOpen && <EditTemplatePopup
        primaryAction={() => { }}
        secondaryAction={() => setIsEditPopupOpen(false)} />}
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

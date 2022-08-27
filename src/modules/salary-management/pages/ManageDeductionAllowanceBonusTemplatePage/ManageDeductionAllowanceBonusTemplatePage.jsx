import { Box } from "@mui/system";
import { Typography, Select, MenuItem } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import MenuButton from "../../components/MenuButton/MenuButton";
import AllowanceTemplateList from "./components/AllowanceTemplateList/AllowanceTemplateList";
import BonusTemplateList from "./components/BonusTemplateList/BonusTemplateList";
import CreateTemplatePopup from "./components/CreateTemplatePopup/CreateTemplatePopup";

export default function ManageDeductionAllowanceBonusTemplatePage() {
  const [dataGridIndex, setDataGridIndex] = useState("allowance list");
  const [isCreateTemplatePopupOpen, setIsCreateTemplatePopupOpen] = useState(false);

  const handleChangeDataGrid = (event) => {
    setDataGridIndex(event.target.value);
  };

  const getDataGrid = (index) => {
    switch (index) {
      case "allowance template list":
        return <AllowanceTemplateList />;
      case "bonus template list":
        return <BonusTemplateList />;
      case "deduction template list":
        return <BonusTemplateList />;
    }
  };

  return (
    <Box sx={{ background: "white", padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 4,
        }}
      >
        <Typography
          fontSize={30}
          textTransform={"capitalize"}
          fontWeight={500}
          color={grey[800]}
        >
          Thông tin deduction / allowance / bonus template
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <MenuButton
            text={"Related Pages"}
            variant="outlined"
            menu={[
              { clickHandler: () => { }, text: "Salary" },
              { clickHandler: () => { }, text: "Bonus" },
            ]}
          />
          <MenuButton
            text={"Thao tác"}
            menu={[
              { clickHandler: () => setIsCreateTemplatePopupOpen(true), text: "Create new" },
              { clickHandler: () => { }, text: "Import from excel" },
              { clickHandler: () => { }, text: "Export to pdf" },
            ]}
          />
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            mb: 1,
          }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dataGridIndex}
            sx={{ width: 132 }}
            size="small"
            onChange={handleChangeDataGrid}
          >
            <MenuItem value={"deduction template list"}>Deduction</MenuItem>
            <MenuItem value={"allowance template list"}>Allowance</MenuItem>
            <MenuItem value={"bonus template list"}>Bonus</MenuItem>
          </Select>
        </Box>

        {getDataGrid(dataGridIndex)}

        {isCreateTemplatePopupOpen && <CreateTemplatePopup
          primaryAction={() => { }}
          secondaryAction={() => setIsCreateTemplatePopupOpen(false)}
        />}
      </Box>
    </Box>
  );
}

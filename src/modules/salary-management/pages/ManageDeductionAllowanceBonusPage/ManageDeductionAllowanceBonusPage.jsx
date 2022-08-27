import { Box } from "@mui/system";
import { Typography, Select, MenuItem } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import MenuButton from "../../components/MenuButton/MenuButton";
import AllowanceList from "./AllowanceList/AllowanceList";
import BonusList from "./BonusList/BonusList";
import DeductionList from "./DeductionList/DeductionList";

export default function ManageDeductionAllowanceBonusPage() {
  const [dataGridIndex, setDataGridIndex] = useState("allowance list");
  const [isCreateDABPopupOpen, setIsCreateDABPopupOpen] = useState();

  const handleChangeDataGrid = (event) => {
    setDataGridIndex(event.target.value);
  };

  const getDataGrid = (index) => {
    switch (index) {
      case "allowance list":
        return <AllowanceList />;
      case "bonus list":
        return <BonusList />;
      case "deduction list":
        return <DeductionList />;
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
          Thông tin deduction / allowance / bonus
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
              { clickHandler: () => { }, text: "Create new" },
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
            <MenuItem value={"deduction list"}>Deduction</MenuItem>
            <MenuItem value={"allowance list"}>Allowance</MenuItem>
            <MenuItem value={"bonus list"}>Bonus</MenuItem>
          </Select>
        </Box>

        {getDataGrid(dataGridIndex)}
      </Box>
    </Box>
  );
}

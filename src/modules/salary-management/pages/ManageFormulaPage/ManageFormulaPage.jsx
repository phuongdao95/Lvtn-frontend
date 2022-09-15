import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import MenuButton from "../../components/MenuButton/MenuButton";
import CreateFormulaPopup from "./CreateFormulaPopup/CreateFormulaPopup";
import FormulaList from "./FormulaList/FormulaList";
import SystemVariableList from "./SystemVariableList/SystemVariableList";

export default function ManageFormulaPage() {
  const [isCreateFormulaPopupOpen, setIsCreateFormulaPopupOpen] = React.useState(false);

  return (
    <Box sx={{ background: 'white', padding: 2 }}>
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
          Thiết lập công thức
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <MenuButton
            text={"Related Pages"}
            variant="outlined"
            menu={[
              { clickHandler: () => { }, text: "Create formula" },
              { clickHandler: () => { }, text: "Bonuss" },
            ]}
          />
          <MenuButton
            text={"Thao tác"}
            menu={[
              { clickHandler: () => { setIsCreateFormulaPopupOpen(true) }, text: "Create new formula" },
            ]}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <FormulaList />

        <SystemVariableList />

        {isCreateFormulaPopupOpen && <CreateFormulaPopup primaryAction={() => { }} secondaryAction={() => setIsCreateFormulaPopupOpen(false)} />}
      </Box>
    </Box>
  );
}

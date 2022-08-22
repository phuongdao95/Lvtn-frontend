import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import MenuButton from "../../components/MenuButton/MenuButton";
import SalaryList from "./SalaryList/SalaryList";

export default function ManageSalaryPage() {
  return (
    <Box sx={{ padding: 2, background: "white" }}>
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
          Thông tin lương nhân viên
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <MenuButton
            text={"Related Pages"}
            variant="outlined"
            menu={[
              { clickHandler: () => {}, text: "Deduction & allowance" },
              { clickHandler: () => {}, text: "Bonuss" },
            ]}
          />
          <MenuButton
            text={"Thao tác"}
            menu={[
              { clickHandler: () => {}, text: "Import from excel" },
              { clickHandler: () => {}, text: "Export to pdf" },
            ]}
          />
        </Box>
      </Box>
      <Box>
        <SalaryList />
      </Box>
    </Box>
  );
}

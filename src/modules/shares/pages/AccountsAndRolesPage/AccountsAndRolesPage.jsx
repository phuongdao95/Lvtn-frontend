import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { DepartmentDetailPopup } from "./components/DepartmentDetailPopup/DepartmentDetailPopup";
import TabList from "./components/TabList/TabList";
import MenuButton from "./components/MenuButton/MenuButton";

export function AccountsAndRolesPage() {
  return (
    <Box>
      {/* <CreateDepartmentPopup /> */}
      {/* <CreateTeamPopup /> */}
      {<DepartmentDetailPopup />}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography
          fontSize={30}
          textTransform={"capitalize"}
          fontWeight={500}
          color={grey[800]}
        >
          Cơ cấu tổ chức
        </Typography>

        <MenuButton
          text={"Thao tác"}
          menu={[
            { clickHandler: () => {}, text: "Create department" },
            { clickHandler: () => {}, text: "Create team" },
          ]}
        />
      </Box>
      <TabList />
    </Box>
  );
}

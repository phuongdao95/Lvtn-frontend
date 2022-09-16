import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import TabList from "./components/TabList/TabList";
import MenuButton from "./components/MenuButton/MenuButton";

export default function AccountsAndRolesPage() {
  return (
    <Box>
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
          Accounts and roles
        </Typography>

        <MenuButton
          text={"Thao tác"}
          menu={[
            { text: "Tạo mới account", handler: () => {} },
            { text: "Tạo mới role", handler: () => {} },
          ]}
        />
      </Box>
      <TabList />
    </Box>
  );
}

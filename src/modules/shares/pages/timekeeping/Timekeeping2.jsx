import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import TabList from "./components/TabList";

export default function Timekeeping2() {
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
            TimeKeeping
          </Typography>
        </Box>
        <TabList />
    </Box>
    );
}
  
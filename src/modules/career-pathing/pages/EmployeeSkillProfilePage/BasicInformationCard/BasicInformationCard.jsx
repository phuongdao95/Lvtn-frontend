import { Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";

export default function BasicInformationCard() {
  return (
    <Box
      sx={{
        padding: 3,
        border: grey[400],
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        General Information
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography fontWeight={"bold"}>Gender </Typography>&nbsp;
        <Typography>Male</Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography>Age</Typography> &nbsp;
        <Typography>27</Typography>
      </Box>

      <Box>
        <Typography>Email</Typography>
        <Typography>lnva@gmail.com</Typography>
      </Box>

      <Box>
        <Typography>Phone number</Typography>
        <Typography>lnva@gmail.com</Typography>
      </Box>

      <Box>
        <Typography>Joining Date</Typography>
        <Typography>17/12/2022</Typography>
      </Box>

      <Box>
        <Typography>Years of experience</Typography>
        <Typography>3</Typography>
      </Box>

      <Box>
        <Typography>Self introduction</Typography>
        <Typography>An enthusiastic developer</Typography>
      </Box>
    </Box>
  );
}

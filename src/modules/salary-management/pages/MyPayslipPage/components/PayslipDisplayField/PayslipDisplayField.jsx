import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function PayslipDisplayField({ label, value, fontSize=16, ...rest }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ 
        minWidth: 150, 
        fontWeight: "medium", 
        fontSize: fontSize }}
        >
        {label}
      </Typography>
      <Typography sx={{ minWidth: 250 }}>{value}</Typography>
    </Box>
  );
}

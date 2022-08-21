import { Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { Box } from "@mui/system";

export default function SystemVariable({
  displayName,
  name,
  description,
  type,
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", paddingLeft: 2 }}>
      <Typography fontSize={18} fontWeight={"bold"} color={grey[700]}>
        {displayName}
      </Typography>

      <Box>
        <Typography fontSize={14} fontWeight={500}>
          Name: {name}
        </Typography>
        <Typography fontSize={14} fontWeight={500}>
          Type: {type}
        </Typography>
        <Typography fontSize={14} fontWeight={500}>
          Description: {description}
        </Typography>
      </Box>
    </Box>
  );
}

import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import PayslipDisplayField from "../PayslipDisplayField/PayslipDisplayField";

export default function DABCard({ header, items }) {
  return (
    <Box>
      <Typography fontSize={20} color={grey[700]}>{header}</Typography>

      {items.map((item) => (
        <PayslipDisplayField
          label={item.name}
          value={item.value}
        />
      ))}
    </Box>
  );
}

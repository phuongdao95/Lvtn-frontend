import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`department-tabpanel-${index}`}
      aria-labelledby={`department-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box color={"white"}>{children}</Box>
        </Box>
      )}
    </div>
  );
}

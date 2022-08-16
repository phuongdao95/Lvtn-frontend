import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`department-tabpanel-${index}`}
      aria-labelledby={`department-tab-${index}`}
      style={{ background: grey[200] }}
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

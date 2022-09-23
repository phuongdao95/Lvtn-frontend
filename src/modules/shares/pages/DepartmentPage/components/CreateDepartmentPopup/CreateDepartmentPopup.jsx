import {
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { Popup } from "../Popup/Popup";

export default function CreateDepartmentPopup() {
  return (
    <Popup
      title={"Create Department"}
      primaryAction={{ text: "Submit", handler: () => {} }}
      secondaryAction={{ text: "Cancel", handler: () => {} }}
    >
      <Box sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
        <Box sx={{ padding: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Department Name
          </Typography>
          <TextField size="small" fullWidth />
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: 1, padding: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Parent Department
            </Typography>
            <TextField size="small" fullWidth />
          </Box>

          <Box sx={{ flex: 1, padding: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Manager
            </Typography>
            <TextField size="small" fullWidth />
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: 1, padding: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Planned Position
            </Typography>
            <TextField size="small" fullWidth />
          </Box>

          <Box sx={{ flex: 1, padding: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Assistant
            </Typography>
            <TextField size="small" fullWidth />
          </Box>
        </Box>
        <Box sx={{ padding: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Description
          </Typography>
          <TextField fullWidth multiline rows={2} maxRows={4} />
        </Box>
      </Box>
    </Popup>
  );
}

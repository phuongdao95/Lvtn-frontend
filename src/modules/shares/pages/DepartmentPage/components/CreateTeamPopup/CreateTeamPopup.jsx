import { Fragment } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { Popup } from "../Popup/Popup";

export default function CreateTeamPopup() {
  return (
    <Popup
      title={"Create Team"}
      primaryAction={{ text: "Submit", handler: () => {} }}
      secondaryAction={{ text: "Cancel", handler: () => {} }}
    >
      <Box sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
        <Box sx={{ padding: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Team Name
          </Typography>
          <TextField size="small" fullWidth />
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: 1, padding: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Team Leader
            </Typography>
            <TextField size="small" fullWidth />
          </Box>

          <Box sx={{ flex: 1, padding: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Area
            </Typography>
            <TextField size="small" fullWidth />
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: 1, padding: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Team Members
            </Typography>
            <TextField size="small" fullWidth multiline maxRows={2} />
          </Box>
        </Box>
        <Box sx={{ padding: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Mô tả
          </Typography>
          <TextField fullWidth multiline={true} minRows={2} maxRows={4} />
        </Box>
      </Box>
    </Popup>
  );
}

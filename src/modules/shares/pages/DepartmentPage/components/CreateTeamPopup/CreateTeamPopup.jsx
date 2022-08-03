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

export default function CreateTeamPopup() {
  return (
    <Fragment>
      <Dialog
        open={true}
        onClose={() => {}}
        maxWidth="sm"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Create Team"}</DialogTitle>
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
                Team Leaderr
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
              Description
            </Typography>
            <TextField fullWidth multiline={true} minRows={2} maxRows={4} />
          </Box>
        </Box>

        <DialogActions>
          <Button onClick={() => {}}>Cancel</Button>
          <Button onClick={() => {}} autoFocus variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

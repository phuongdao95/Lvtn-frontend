import { Popup } from "../../../components/Popup/Popup";
import { Box, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function EditDABPopup({
  primaryAction = () => { },
  secondaryAction = () => { } }) {
  return <Popup
    title={"Create new deduction / allowance / bonus template"}
    primaryAction={{ text: "Submit", handler: primaryAction }}
    secondaryAction={{ text: "Cancel", handler: secondaryAction }}
  >
    <Box sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
      <Box sx={{ padding: 1, display: "flex", flexDirection: "row", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Id
          </Typography>
          <TextField size="small" fullWidth />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Code
          </Typography>
          <TextField size="small" fullWidth />
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1, padding: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Type
          </Typography>
          <TextField size="small" fullWidth />
        </Box>

        <Box sx={{ flex: 1, padding: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Associated Formula
          </Typography>
          <TextField size="small" fullWidth />
        </Box>

      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1, padding: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Apply Type
          </Typography>
          <TextField size="small" fullWidth />
        </Box>

        <Box sx={{ flex: 1, padding: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Description
          </Typography>
          <TextField size="small" fullWidth />
        </Box>
      </Box>
    </Box>
  </Popup>
}
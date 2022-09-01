import { Popup } from "../../../components/Popup/Popup";
import { Box, Typography, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function EditFormula({ primaryAction, secondaryAction }) {
  return <Popup
    title={"Edit Formula"}
    primaryAction={{ text: "Submit", handler: primaryAction }}
    secondaryAction={{ text: "Cancel", handler: secondaryAction }}
  >
    <Box sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
      <Box sx={{ padding: 1, display: "flex", flexDirection: "row", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Name
          </Typography>
          <TextField size="small" fullWidth />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Input variables
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
            Datatype
          </Typography>
          <TextField size="small" fullWidth />
        </Box>

      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1, padding: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Define
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
import { Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Popup } from "../../../components/Popup/Popup";


export default function EditPopup({
  submitHandler = () => { },
  cancelHandler = () => { } }) {
  return <Popup
    title={"Edit salary info"}
    primaryAction={{ text: "Submit", handler: submitHandler }}
    secondaryAction={{ text: "Cancel", handler: cancelHandler }}
  >
    <Box sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
      <Box sx={{ padding: 1, display: "flex", flexDirection: "row", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            First name
          </Typography>
          <TextField size="small" fullWidth InputProps={{
            readOnly: true
          }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Employee code
          </Typography>
          <TextField size="small" fullWidth InputProps={{
            readOnly: true
          }}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1, padding: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Role
          </Typography>

          <TextField size="small" fullWidth InputProps={{
            readOnly: true
          }}
          />
        </Box>

        <Box sx={{ flex: 1, padding: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Last name
          </Typography>
          <TextField size="small" fullWidth />
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1, padding: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Base Salary
          </Typography>
          <TextField size="small" fullWidth />
        </Box>

        <Box sx={{ flex: 1, padding: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Working Schedule
          </Typography>
          <TextField size="small" fullWidth />
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1, padding: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Bank name
          </Typography>
          <TextField size="small" fullWidth />
        </Box>

        <Box sx={{ flex: 1, padding: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
          >
            Bank number
          </Typography>
          <TextField size="small" fullWidth />
        </Box>
      </Box>

    </Box>
  </Popup>
}

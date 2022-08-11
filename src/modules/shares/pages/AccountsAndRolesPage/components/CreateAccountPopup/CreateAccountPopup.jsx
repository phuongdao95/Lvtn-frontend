import { Box } from "@mui/system";
import { Popup } from "../Popup/Popup";
import { grey } from "@mui/material/colors";
import { Avatar, Button, TextField, Typography } from "@mui/material";

export default function CreateAccountPopup({}) {
  return (
    <Popup
      title={"Create Account"}
      primaryAction={{ text: "Submit", handler: () => {} }}
      secondaryAction={{ text: "Cancel", handler: () => {} }}
    >
      <Box sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            pading: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ width: 168, height: 168 }} />

          <Button variant="outlined" size="small">Upload Image</Button>
        </Box>
        <Box sx={{ padding: 1, display: "flex", flexDirection: "row", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Username
            </Typography>
            <TextField size="small" fullWidth />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Password
            </Typography>
            <TextField size="small" fullWidth />
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: 1, padding: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              First name
            </Typography>
            <TextField size="small" fullWidth />
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
              Role
            </Typography>
            <TextField size="small" fullWidth />
          </Box>

          <Box sx={{ flex: 1, padding: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Email
            </Typography>
            <TextField size="small" fullWidth />
          </Box>
        </Box>
      </Box>
    </Popup>
  );
}

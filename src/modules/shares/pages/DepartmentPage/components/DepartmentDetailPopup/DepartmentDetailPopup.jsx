import { Box } from "@mui/system";
import { Typography, TextField, Avatar } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Popup } from "../Popup/Popup";

export function DepartmentDetailPopup() {
  return (
    <Popup
      title={"Department Detail"}
      primaryAction={{ text: "Submit", handler: () => {} }}
      secondaryAction={{ text: "Cancel", handler: () => {} }}
    >
      <Box sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Avatar />

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Marketing
            </Typography>
            <Typography>description</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 1.5 }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Department Name
            </Typography>
            <TextField size="small" fullWidth />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Parent Department
            </Typography>
            <TextField size="small" fullWidth />
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Planned Position
            </Typography>
            <TextField size="small" fullWidth />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Assistant
            </Typography>
            <TextField size="small" fullWidth />
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Created At
            </Typography>
            <TextField size="small" fullWidth />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", color: grey[700], fontSize: 14 }}
            >
              Created By
            </Typography>
            <TextField size="small" fullWidth />
          </Box>
        </Box>

        <Box sx={{ paddingTop: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 0.5 }}
          >
            Sub-departments
          </Typography>

          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Avatar />
            <Avatar />
            <Avatar />
          </Box>
        </Box>
      </Box>
    </Popup>
  );
}

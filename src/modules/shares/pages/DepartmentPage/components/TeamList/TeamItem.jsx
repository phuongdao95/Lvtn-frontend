import { Avatar, Box, Paper, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

export default function TeamItem({ name, avatar, leader, area, members }) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 3,
        cursor: "pointer",
        border: 1,
        gap: 1.25,
        minWidth: 150,
        borderColor: blue[400],
        color: grey[700],
        "&:hover": {
          background: blue[500],
          color: "white",
          boxShadow: 5,
          transition: "200ms ease-in-out",
        },
      }}
      elevation={3}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography variant="h5">Marketing</Typography>
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 600, fontSize: 17, color: "inherit" }}>
          Area
        </Typography>
        <Typography>Product</Typography>
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 600, fontSize: 17 }}>Leader</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.6,
          }}
        >
          <Avatar sx={{ width: 24, height: 24 }} />
        </Box>
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 600, fontSize: 17 }}>Members</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.25,
          }}
        >
          <Avatar sx={{ width: 24, height: 24 }} />
          <Avatar sx={{ width: 24, height: 24 }} />
          <Avatar sx={{ width: 24, height: 24 }} />
        </Box>
      </Box>
    </Paper>
  );
}

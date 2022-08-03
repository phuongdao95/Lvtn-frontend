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
        borderColor: blue[400],
        "&:hover": {
          background: blue[200],
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
        }}
      >
        <Typography variant="h6">Marketing</Typography>
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 600, fontSize: 17, color: grey[800] }}>
          Area
        </Typography>
        <Typography>Product</Typography>
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 600, fontSize: 17, color: grey[800] }}>
          Leader
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.6,
          }}
        >
          <Avatar sx={{ width: 24, height: 24 }} />
          <Typography>Tang Minh Nhat</Typography>
        </Box>
      </Box>
    </Paper>
  );
}

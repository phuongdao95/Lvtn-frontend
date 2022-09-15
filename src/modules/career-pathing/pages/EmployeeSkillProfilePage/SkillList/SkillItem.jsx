import React from "react";
import { Box } from "@mui/system";
import { Typography, Rating } from "@mui/material";

export default function SkillItem({ name, value }) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend" fontSize={14}>
        {name}
      </Typography>
      <Rating name="simple-controlled" value={value} max={10} readOnly />
    </Box>
  );
}

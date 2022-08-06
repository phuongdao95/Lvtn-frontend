import {
  Collapse,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { Fragment, useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";

export default function PermissionGroup({ name, items }) {
  const [open, setOpen] = useState();

  return (
    <Fragment>
      <Box sx={{ background: "white", color: "black" }}>
        <Box
          onClick={() => setOpen(!open)}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            cursor: "pointer",
          }}
        >
          <Typography sx={{ fontWeight: 400, fontSize: 22 }}>{name}</Typography>
          {open ? <ExpandLess /> : <ExpandMore />}
        </Box>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box paddingX={2}>
            {items.map((item) => (
              <ListItemText color={grey[700]}>{item.text}</ListItemText>
            ))}
          </Box>
        </Collapse>
      </Box>
    </Fragment>
  );
}

import React from "react";
import { Box, Paper, Avatar } from "@mui/material";
import { Tree, TreeNode } from "react-organizational-chart";
import { grey, blue } from "@mui/material/colors";

function DepartmentItem({ name, manager }) {
  return (
    <Paper
      sx={{
        maxWidth: 200,
        minWidth: 160,
        paddingX: 2,
        paddingY: 0.5,
        border: `1px solid ${blue[500]}`,
        overflow: "auto",
        display: "inline-block",
        transition: "200ms ease-in-out",
        cursor: "pointer",
        minHeight: 90,
        color: grey[700],
        "&:hover": { backgroundColor: blue[400], color: "white" },
      }}
    >
      <Box
        textTransform={"capitalize"}
        fontWeight={"bold"}
        fontSize={15}
        textAlign={"left"}
        color={"inherit"}
        sx={{ "&:hover": { color: grey[50] } }}
        mb={1}
      >
        Marketing
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          gap: 1,
        }}
      >
        <Avatar sx={{ width: 28, height: 28 }} />

        <Box
          textTransform={"capitalize"}
          fontSize={15}
          textAlign={"left"}
          color={"inherit"}
          sx={{ "&:hover": { color: grey[50] } }}
        >
          Tang Minh Nhat
        </Box>
      </Box>

      <Box display={"flex"} flexDirection={"row"} paddingTop={1}>
        <Box fontSize={14} fontWeight={"medium"}>
          Department
        </Box>
      </Box>
    </Paper>
  );
}

export default function DepartmentTree() {
  return (
    <Tree label={<DepartmentItem />} lineColor={grey[400]}>
      <TreeNode label={<DepartmentItem />}>
        <TreeNode label={<DepartmentItem />} />
      </TreeNode>

      <TreeNode label={<DepartmentItem />}>
        <TreeNode label={<DepartmentItem />} />
      </TreeNode>

      <TreeNode label={<DepartmentItem />}>
        <TreeNode label={<DepartmentItem />} />
      </TreeNode>
    </Tree>
  );
}

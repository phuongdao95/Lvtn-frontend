import { Box } from "@mui/system";
import SystemVariable from "./SystemVariable";
import { green, grey } from "@mui/material/colors";
import { Typography } from "@mui/material";

const systemVariableList = new Array(12).fill(0).map((index) => ({
  name: `system_variable_${index}`,
  displayName: `System Variable ${index}`,
  description: "Kind of a formula",
  type: "Number",
}));

export default function SystemVariableList() {
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: `2px solid ${grey[300]}`,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        width: 500,
        maxHeight: 600,
        overflow: "auto",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={"bold"}
        color={green[500]}
        paddingLeft={2}
        mb={1}
      >
        System Variables
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.24 }}>
        {systemVariableList.map((item, index, array) => (
          <SystemVariable
            key={index}
            description={item.description}
            displayName={item.displayName}
            name={item.name}
            type={item.type}
          />
        ))}
      </Box>
    </Box>
  );
}

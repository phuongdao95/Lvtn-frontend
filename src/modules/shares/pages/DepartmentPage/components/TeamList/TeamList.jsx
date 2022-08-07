import { Box } from "@mui/system";
import TeamItem from "./TeamItem";

export default function TeamList() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2 }}
    >
      <TeamItem />
      <TeamItem />
      <TeamItem />
      <TeamItem />
      <TeamItem />
    </Box>
  );
}

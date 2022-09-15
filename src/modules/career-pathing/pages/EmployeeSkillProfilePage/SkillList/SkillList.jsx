import { Box } from "@mui/system";
import SkillItem from "./SkillItem";

const skills = new Array(8).fill(0).map((_, index) => ({
  name: `Skill ${index}`,
  value: index % 2 === 0 ? 8 : 9,
}));

export default function SkillList() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {skills.map(({ name, value }) => (
        <SkillItem name={name} value={value} />
      ))}
    </Box>
  );
}

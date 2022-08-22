import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BasicInformationCard from "./BasicInformationCard/BasicInformationCard";
import SkillList from "./SkillList/SkillList";

export default function EmployeeSkillProfilePage() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Avatar sx={{ width: 96, height: 96 }} />
        <Box>
          <Typography sx={{ fontWeight: 500, fontSize: 22 }}>
            Nguyen Le Van A
          </Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 16 }}>
            Team Lead
          </Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 16 }}>
            IT Department
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          minWidth: 600,
          gap: 5,
          padding: 2,
          justifyContent: "center",
        }}
      >
        <BasicInformationCard />

        <SkillList />
      </Box>
    </Box>
  );
}

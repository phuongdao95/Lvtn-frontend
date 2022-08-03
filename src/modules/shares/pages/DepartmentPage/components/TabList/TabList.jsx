import React from "react";
import { Box } from "@mui/system";
import { Tabs, Tab } from "@mui/material";
import { grey } from "@mui/material/colors";
import TabPanel from "./TabPanel";
import a11yProps from "./a11Props";
import DepartmentTree from "../DepartmentTree/DepartmentTree";
import TeamList from "../TeamList/TeamList";

export default function TabList() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ mt: 1, width: "100%", color: "white" }}>
      <Box sx={{ borderBottom: 1, borderColor: grey[400] }}>
        <Tabs
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Departments"
            sx={{
              textTransform: "capitalize",
              color: grey[800],
              fontWeight: 500,
            }}
            {...a11yProps(0)}
          />
          <Tab
            label="Teams"
            sx={{ textTransform: "capitalize", color: grey[800] }}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DepartmentTree />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TeamList />
      </TabPanel>
    </Box>
  );
}

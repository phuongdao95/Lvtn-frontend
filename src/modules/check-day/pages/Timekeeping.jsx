import React, { Fragment } from 'react';
import { Box } from "@mui/system";
import SwitchTab from "../components/SwitchTab";

export default function Timekeeping() {
    return (
    <Fragment>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
        </Box>
        <SwitchTab />
    </Fragment>
    );
}
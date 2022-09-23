import React, {useState} from 'react';
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const TabLayout = ({title, tabList, listTabPanel}) => { 
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <Box sx={{
        padding: 2,
        background: 'white'
    }}>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 4,
            }}>
                <Typography fontSize={30}
                    textTransform={"capitalize"}
                    fontWeight={500}
                    color={grey[800]}
                >
                    {title}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                    {tabList(value, handleChange)}
                </Box>
            </Box>
        </Box>
        <Box>
            {listTabPanel(value)}
        </Box>
    </Box >;
}
export default TabLayout;
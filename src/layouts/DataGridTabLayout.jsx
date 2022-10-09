import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function DataGridTabLayout({
    title,
    primaryButtonSection,
    secondaryButtonSection,
    tabSections,
}) {

    const [value, setValue] = React.useState(0);

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
            gap: 2,
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

                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    {secondaryButtonSection}

                    {primaryButtonSection}
                </Box>
            </Box>
        </Box>

        <Box>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        {tabSections.map((tab,) =>
                            <Tab label={tab.label} {...a11yProps(tab.index)} key={tab.index} />
                        )}
                    </Tabs>
                </Box>


                {tabSections.map((tabSection) =>
                    <TabPanel value={value} key={tabSection.index} index={tabSection.index}>
                        {tabSection.dataGrid}
                    </TabPanel>
                )}
            </Box>

        </Box>
    </Box>

}
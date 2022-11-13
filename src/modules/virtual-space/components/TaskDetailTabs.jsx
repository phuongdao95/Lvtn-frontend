import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1, pt: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `task-tab-${index}`,
    };
}

export default function TaskDetailTabs({ infoSection, fileSection, historySection }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Thông tin task" {...a11yProps(0)} />
                    <Tab label="file và hình ảnh" {...a11yProps(1)} />
                    <Tab label="Lịch sử thay đổi" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {infoSection}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {fileSection}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {historySection}
            </TabPanel>
        </Box>
    );
}

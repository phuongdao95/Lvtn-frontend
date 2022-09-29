import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { grey } from "@mui/material/colors";

import Timekeeping from './TimekeepingRecognizer';
import TimekeepingRegister from './TimekeepingRegister';

const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`timekeeping-tabpanel-${index}`}
            aria-labelledby={`timekeeping-tab-${index}`}
            style={{ background: grey[200] }}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
  );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const a11yProps = index => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabList = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
                value={value} 
                onChange={handleChange} 
                aria-label="tabs list for timekeeping"
            >
                <Tab label="Nhận diện khuôn mặt" {...a11yProps(0)} />
                <Tab label="Đăng ký hình ảnh" {...a11yProps(1)} />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <Timekeeping />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <TimekeepingRegister />
        </TabPanel>
    </Box>
    );
}
export default TabList;
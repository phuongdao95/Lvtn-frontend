import React, { Fragment } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabLayout from '../../../layouts/TabLayout'
import {TabPanel} from '../../../components/TabList/TabPanel'
import a11Props from '../../../components/TabList/a11Props'

import Recognize from './Recognize';
import Register from './RegisterImage';

const SwitchTab = () => {
    const tabList = (value, handleChange) => {
        return <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
                value={value} 
                onChange={handleChange} 
                aria-label="tabs list for timekeeping"
            >
                <Tab label="Nhận diện khuôn mặt" {...a11Props(0)} />
                <Tab label="Đăng ký hình ảnh" {...a11Props(1)} />
            </Tabs>
        </Box>
    }
    const listTabPanel= (value) => {
    return <>
        <TabPanel value={value} index={0}>
            <Recognize />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Register />
        </TabPanel>
    </>}
    return (
        <TabLayout 
            title={"Chấm công"}
            tabList={tabList}
            listTabPanel={listTabPanel}
        />
    );
}
export default SwitchTab;
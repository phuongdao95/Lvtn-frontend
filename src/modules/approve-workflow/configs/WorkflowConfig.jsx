import * as React from 'react';
import Grid from '@mui/material/Grid';
import ConfigCard from './ConfigCard';

/*
 * There is 7 flows in total.
*/
const flows = [
    {
        title: 'Nghỉ phép',
        link: 'config-nghi-phep',
        icon: 'notifications_off'
    },
    {
        title: 'Nghỉ thai sản',
        link: 'config-nghi-thai-san',
        icon: 'family_restroom'
    },
    {
        title: 'Điểm danh thủ công',
        link: 'config-check-in-out',
        icon: 'where_to_vote'
    }
];

const WorkflowConfig = () => {
    return (<>
        <Grid container spacing={5}>
            {
                flows.map((flow, index) =>
                    <Grid item={true} xs={3} key={index}>
                        <ConfigCard title={flow.title} content={flow.content} icon={flow.icon} link={flow.link} />
                    </Grid>
                )
            }
        </Grid>
    </>);
}

export default WorkflowConfig;
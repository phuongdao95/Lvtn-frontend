import * as React from 'react';
import Grid from '@mui/material/Grid';
import WorkflowCard from './WorkflowCard';

/*
 * There is 7 flows in total.
*/
const flows = [
    {
        title: 'Nghỉ phép',
        content: 'Tạo request cho việc nghỉ phép',
        link: 'user-nghi-phep/new',
        icon: 'notifications_off'
    },
    {
        title: 'Nghỉ thai sản',
        content: 'Tạo request nghỉ thai sản dành cho nữ sản phụ hoặc nam có vợ là sản phụ',
        link: 'user-nghi-thai-san/new',
        icon: 'family_restroom'
    },
    {
        title: 'Điểm danh thủ công',
        content: 'Tạo request khi chấm công bằng khuôn mặt gặp trục trặc',
        link: 'user-check-in-out/new',
        icon: 'where_to_vote'
    }
];

const WorkFlows = () => {
    return (<>
        <Grid container spacing={5}>
            {
                flows.map((flow, index) =>
                    <Grid item={true} xs={4} key={index}>
                        <WorkflowCard title={flow.title} content={flow.content} icon={flow.icon} link={flow.link} />
                    </Grid>
                )
            }
        </Grid>
    </>);
}

export default WorkFlows;
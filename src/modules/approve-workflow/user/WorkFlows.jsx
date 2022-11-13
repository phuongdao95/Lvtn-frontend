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
        link: 'user-nghi-phep',
        icon: 'notifications_off'
    },
    {
        title: 'Nghỉ thai sản',
        content: 'Tạo request nghỉ thai sản dành cho nữ sản phụ hoặc nam có vợ là sản phụ',
        link: 'user-nghi-thai-san',
        icon: 'family_restroom'
    },
    {
        title: 'Ứng lương',
        content: 'Tạo request khi cần phải ứng trước lương',
        link: 'user-advance-payment',
        icon: 'price_change'
    },
    {
        title: 'Điểm danh thủ công',
        content: 'Tạo request khi chấm công bằng khuôn mặt gặp trục trặc',
        link: 'user-check-in-out',
        icon: 'where_to_vote'
    },
    {
        title: 'Hoàn chi phí, Cấp phí',
        content: 'Tạo request khi cần phải hoàn lại hoặc cấp chi phí cho nhân viên',
        link: 'user-cost',
        icon: 'monetization_on'
    },
    {
        title: 'Yêu cầu trợ giúp Helpdesk',
        content: 'Tạo request khi cần trợ giúp về thiết bị, phần mềm,... nhằm hỗ trợ công việc',
        link: 'user-helpdesk',
        icon: 'help_center'
    },
    {
        title: 'Tăng ca',
        content: 'Tạo request khi leader của team hoặc department cần nhân viên tăng ca',
        link: 'user-overtime',
        icon: 'more_time'
    },
    {
        title: 'Work from home',
        content: 'Tạo request để yêu cầu được làm việc từ xa',
        link: 'user-wfh',
        icon: 'online_prediction'
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
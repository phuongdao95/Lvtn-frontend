import * as React from 'react';
import Grid from '@mui/material/Grid';
import WorkflowCard from './WorkflowCard';


const flows = [
    {
        title: 'Nghỉ phép',
        content: 'Tạo request cho việc nghỉ phép',
        link: 'nghi-phep',
        icon: 'notifications_off'
    },
    {
        title: 'Nghỉ thai sản',
        content: 'Tạo request nghỉ thai sản dành cho nữ sản phụ hoặc nam có vợ là sản phụ',
        link: 'nghi-thai-san',
        icon: 'family_restroom'
    },
    {
        title: 'Thăng cấp trong career path',
        content: 'Tạo request để thay đổi trong con đường sự nghiệp (career path)',
        link: '',
        icon: 'route'
    },
    {
        title: 'Yêu cầu trợ giúp Helpdesk',
        content: 'Tạo request khi cần trợ giúp về thiết bị, phần mềm,... nhằm hỗ trợ công việc',
        link: '',
        icon: 'help_center'
    },
    {
        title: 'Hoàn chi phí, Cấp phí',
        content: 'Tạo request khi cần phải hoàn lại hoặc cấp chi phí cho nhân viên',
        link: '',
        icon: 'monetization_on'
    },
    {
        title: 'Work from home',
        content: 'Tạo request để yêu cầu được làm việc từ xa',
        link: '',
        icon: 'online_prediction'
    },
    {
        title: 'Nâng cao kỹ năng',
        content: 'Tạo request khi có yêu cầu cần phải nâng cao trình độ',
        link: '',
        icon: 'local_library'
    },
    {
        title: 'Ứng lương',
        content: 'Tạo request khi cần phải ứng trước lương',
        link: '',
        icon: 'price_change'
    },
    {
        title: 'Điểm danh thủ công',
        content: 'Tạo request khi chấm công bằng khuôn mặt gặp trục trặc',
        link: '',
        icon: 'where_to_vote'
    },
    {
        title: 'Tăng ca',
        content: 'Tạo request khi leader của team hoặc department cần nhân viên tăng ca',
        link: '',
        icon: 'more_time'
    }
]

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
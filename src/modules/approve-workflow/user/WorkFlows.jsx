import * as React from 'react';
import WorkflowSection from './WorkflowSection';

const flows = [
    {
        title: 'Nghỉ phép',
        content: 'Tạo request cho việc nghỉ phép',
        link: 'user-nghi-phep/new',
        tags: 'Chung, Ngày nghỉ'
    },
    {
        title: 'Nghỉ thai sản',
        content: 'Tạo request nghỉ thai sản dành cho nữ sản phụ hoặc nam có vợ là sản phụ',
        link: 'user-nghi-thai-san/new',
        tags: 'Chung, Ngày nghỉ'
    },
    {
        title: 'Kiểm tra log giờ làm việc',
        content: 'Tạo request khi chấm công bằng khuôn mặt gặp trục trặc',
        link: 'user-check-in-out/new',
        tags: 'Chung, Chính sách công ty'
    }
];

const WorkFlows = () => {
    return (<>
        <h2>Tạo mới request</h2>
        {['Chung', 'Ngày nghỉ', 'Chính sách công ty'].map(tag => {
            return <WorkflowSection sectionName={tag} listWorkflow={flows.filter(f => f.tags.includes(tag))} key={tag}/>
        })}
    </>);
}

export default WorkFlows;
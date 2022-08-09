import * as React from 'react';
import Grid from '@mui/material/Grid';
import WorkflowCard from './WorkflowCard';


const flows = [
    {
        title: 'Nghi phep',
        content: 'Nhan vien bam chon tao request nghi phep',
        link: 'nghi-phep'
    },
    {
        title: 'Nghi thai san',
        content: 'Nhan vien bam chon tao request nghi thai san',
        link: 'nghi-thai-san'
    },
    {
        title: 'I am a big title',
        content: 'I am listening to the best music of all time!!!!!!'
    },
    {
        title: 'I am a big title',
        content: 'I am listening to the best music of all time!!!!!!'
    },
    {
        title: 'I am a big title',
        content: 'I am listening to the best music of all time!!!!!!'
    },
    {
        title: 'I am a big title',
        content: 'I am listening to the best music of all time!!!!!!'
    },
    {
        title: 'I am a big title',
        content: 'I am listening to the best music of all time!!!!!!'
    },
    {
        title: 'I am a big title',
        content: 'I am listening to the best music of all time!!!!!!'
    },
    {
        title: 'I am a big title',
        content: 'I am listening to the best music of all time!!!!!!'
    },
    {
        title: 'I am a big title',
        content: 'I am listening to the best music of all time!!!!!!'
    },
    {
        title: 'I am a big title',
        content: 'I am listening to the best music of all time!!!!!!'
    }
]

const WorkFlows = () => {
    return (<>
        <Grid container spacing={5}>
            {
                flows.map((flow, index) =>
                    <Grid item={true} xs={4} key={index}>
                        <WorkflowCard title={flow.title} content={flow.content} name={flow.name} link={flow.link} />
                    </Grid>
                )
            }
        </Grid>
    </>);
}

export default WorkFlows;
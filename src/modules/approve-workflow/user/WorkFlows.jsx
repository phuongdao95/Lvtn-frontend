import * as React from 'react';
import Grid from '@mui/material/Grid';
import WorkflowCard from './WorkflowCard';


const flows = [
    {
        title: 'I am a big title',
        content: 'I am listening to the best music of all time!!!!!!',
        name: "Anchor"
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
                        <WorkflowCard title={flow.title} content={flow.content} name={flow.name} />
                    </Grid>
                )
            }
        </Grid>
    </>);
}

export default WorkFlows;
import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { CardActionArea, Divider } from '@mui/material';
import Icon from '@mui/material/Icon';

const WorkflowCard = ({ title, content, name = "", isConfig = true }) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardActionArea>
                <CardContent>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: 'fit-content',
                        borderRadius: 1,
                        bgcolor: 'background.paper',
                        color: 'text.secondary',
                        '& svg': {
                            m: 1.5,
                        },
                        '& hr': {
                            mx: 0.5,
                            marginRight: 2
                        },
                    }}>

                        <Divider variant="fullWidth" orientation="vertical" flexItem sx={{ borderRightWidth: 5, backgroundColor: 'red' }} />
                        <Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}>
                                <Typography variant="h5" component="div">
                                    {title}
                                </Typography>
                                {isConfig && <FormControlLabel control={<Switch defaultChecked />} label="Enable" />}
                            </Box>

                            <Typography color="text.secondary">
                                {content}
                            </Typography>
                        </Box>
                    </Box>

                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default WorkflowCard;
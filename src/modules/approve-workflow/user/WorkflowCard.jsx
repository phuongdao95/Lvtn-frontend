import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { CardActionArea, Divider } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Link from '@mui/material/Link'

const WorkflowCard = ({ title, content, isConfig = true, link = '' }) => {
    const location = useLocation();

    const pathname = location.pathname;

    return (
        <Link underline='none' component={RouterLink} to={`${pathname}\\${link}`}>
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
        </Link>
    );
}

export default WorkflowCard;
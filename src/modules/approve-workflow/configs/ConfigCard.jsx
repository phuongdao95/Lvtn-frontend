import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';

import Icon from '@mui/material/Icon';

const ConfigCard = ({ title, content, link = '', icon = 'recommend' }) => {
    const location = useLocation();

    const pathname = location.pathname;

    return (
        <Card component={Link} to={`${pathname}\\${link}`} sx={{
            minWidth: 275,
            minHeight: 150,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 1,
            bgcolor: '#4097D7',
            textDecoration: 'none !important'
        }}>
            <Icon sx={{ fontSize: 60, color: "white", mt: '10px', mb: '30px' }}>{icon}</Icon>
            <Typography variant="h5" component="div">
                {title}
            </Typography>
        </Card >
    );
}

export default ConfigCard;
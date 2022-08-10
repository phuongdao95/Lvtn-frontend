import { Box, Button, Card, CardContent, TextField } from '@mui/material';
import React from 'react';

const Register = () => {
    return (
        <div style={{paddingTop: 40}}>
            <Card sx={{
                mx: 'auto',
                py: 20,
                textAlign: 'center'
                }}>
                <CardContent>
                    <Box sx={{
                        mx: 'auto',
                        my: 'auto',
                        p: 1,
                        borderRadius: 2,
                        textAlign: 'center',
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        bgcolor: 'info.main',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <form>
                            <TextField 
                                type="text"
                                label="ID"
                                variant="outlined"
                            />
                            <TextField 
                                type="text"
                                label="Họ và tên"
                                variant="outlined"
                            />
                            <Button variant="contained" color="primary">
                                save
                            </Button>
                        </form>
                    </Box>    
                </CardContent>
            </Card>
        </div>
    );
}

export default Register;
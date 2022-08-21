import { Box, Button, Card, CardContent, TextField, Grid, ButtonGroup } from '@mui/material';
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
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        bgcolor: 'info.main',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        Register image
                    </Box>
                    <Box 
                        component="form"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}>
                        <Grid container spacing={2} sx={{ p: 2}}>
                            <form>
                            <Grid item xs={12}>
                                <TextField 
                                    required
                                    type="text"
                                    label="ID"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    type="text"
                                    label="Họ và tên"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonGroup sx={{
                                    '& > *': {
                                    m: 1,
                                    },
                                }}>
                                    <Button variant="contained" color="primary">
                                        save
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                            </form>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}

export default Register;
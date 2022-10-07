import { Box, Button, Card, CardContent, TextField, Grid, ButtonGroup } from '@mui/material';
import React, {useRef} from 'react';

const Register = ({takePicture}) => {
    const inputIdRef = useRef('');
    const inputNameRef = useRef('');
    const clickSave = () => {
        takePicture();
    }
    return (
        <Box sx={{
            mx: 'auto',
            py: 1,
            minWidth: 200,
        }}>
            <Card sx={{
                mx: 'auto',
                textAlign: 'center',
                }}>
                <CardContent sx={{
                    maxWidth: "100%",
                    height: "auto",
                }}>
                    <Box sx={{
                        mx: 'auto',
                        my: 'auto',
                        p: 1,
                        borderRadius: 2,
                        fontWeight: '300',
                        bgcolor: 'info.main',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        Đăng ký hình ảnh
                    </Box>
                    <Box 
                        component="form"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '& .MuiTextField-root': { m: 1, width: 'auto' },
                        }}>
                        <Grid container spacing={2} sx={{ p: 2}}>
                            <Grid item xs={12}>
                                <ButtonGroup sx={{
                                    '& > *': {
                                    m: 1,
                                    },
                                }}>
                                    <Button variant="contained" 
                                        onClick={clickSave}
                                        color="primary">
                                        Lưu
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Register;
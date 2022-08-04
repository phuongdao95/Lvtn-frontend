import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const Info = () => {
    const [value, setValue] = React.useState(new Date());
    const [isRead, setIsRead] = React.useState(true);
    const [isSave, setIsSave] = React.useState(false);
    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const handleEdit = () => {
        setIsRead(!isRead);
        setIsSave(!isSave);
    };
    return (
    <Grid container spacing={2} sx={{ p: 2}}>
        <Grid item xs={12} sx={{ borderBottom: 1 }}>
            <Box>
                <Grid container spacing={2} sx={{ p: 2}}>
                    <Grid item xs={10}>
                        <h3>Executive Information</h3>
                    </Grid>
                    <Grid item xs={2}>                        
                        <Button variant="standard" startIcon={<EditIcon />}
                            onClick={handleEdit}>
                        </Button>
                        <Button variant="standard" startIcon={<CheckBoxIcon />}
                            onClick={handleEdit}
                            style={{ display: !isSave ? 'none' : ''}}>
                        </Button>                   
                    </Grid>
                </Grid>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Box>
                <Grid container spacing={2} sx={{ p: 2}}>
                    <Grid item xs={6}>
                        <TextField
                            id="input1"
                            label="Họ và tên"
                            defaultValue="Nguyễn Văn A"
                            InputProps={{
                                readOnly: isRead,
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Ngày sinh"
                                readOnly
                                inputFormat="dd/MM/yyyy"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    
                    <Grid item xs={6}>
                        <TextField
                            id="input1"
                            label="Địa chỉ"
                            defaultValue="32 NGuyễn Phú Thọ"
                            InputProps={{
                                readOnly: isRead,
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="input1"
                            label="Email"
                            defaultValue="a.nguyenvan@gmail.com"
                            InputProps={{
                                readOnly: isRead,
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="input1"
                            label="Giới tính"
                            defaultValue="Nam"
                            InputProps={{
                                readOnly: isRead,
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="input1"
                            label="Số điện thoại"
                            defaultValue="0946532187"
                            InputProps={{
                                readOnly: isRead,
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="input1"
                            label="CCCD"
                            defaultValue="274856319521"
                            InputProps={{
                                readOnly: isRead,
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="input1"
                            label="Chức vụ"
                            defaultValue="Nhân viên"
                            InputProps={{
                                readOnly: isRead,
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="input1"
                            label="Mã số thuế"
                            defaultValue="0012365488"
                            InputProps={{
                                readOnly: isRead,
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="input1"
                            label="Mã số bảo hiểm"
                            defaultValue="184965AAD235D898"
                            InputProps={{
                                readOnly: isRead,
                            }}
                            variant="standard"
                        />
                    </Grid>                   
                </Grid>
            </Box>
        </Grid>
    </Grid>
    )
}
export default Info;
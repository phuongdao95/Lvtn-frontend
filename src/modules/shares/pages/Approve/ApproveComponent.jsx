import * as React from 'react';
import { Box, InputLabel, Button, Checkbox, Avatar, ListItem, ListItemAvatar, ListItemText, List, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ApproveComponent = () => {

    const nameList = [
        {
            name: 'Nguyễn Phương Tri',
            isPerson: 'true'
        },
        {
            name: 'Phòng QLNS',
            isPerson: false
        }
    ];

    return (
        <Card sx={{ padding: 5 }}>
            <Grid container spacing={2} sx={{ paddingBottom: 5 }}>
                <Grid item xs={3}>
                    <label>Quản lý của nhân viên: </label>
                </Grid>
                <Grid item xs={6}>
                    <Select value="0" size="small">
                        <MenuItem value="0">Là Approver tùy chọn</MenuItem>
                        <MenuItem value="1">Là Approver bắt buộc</MenuItem>
                    </Select>
                </Grid>
            </Grid>
            <Box sx={{
                display: 'flex',
                width: '100%'
            }}>
                <Box sx={{ width: '60%' }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={8}>
                                    <InputLabel sx={{ color: 'black' }}>Trưởng Department</InputLabel>
                                    <Select size="small" sx={{ width: '80%' }}>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>

                                </Grid>
                                <Grid item xs={4}>
                                    <Box sx={{ display: 'flex', width: '100&', height: '100%' }}>
                                        <Button variant="contained" endIcon={<SendIcon />} sx={{ alignSelf: 'flex-end' }}>
                                            Thêm
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={8}>
                                    <InputLabel sx={{ color: 'black' }}>Nhân viên cụ thể</InputLabel>
                                    <Select size="small" sx={{ width: '80%' }}>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>

                                </Grid>
                                <Grid item xs={4}>
                                    <Box sx={{ display: 'flex', width: '100&', height: '100%' }}>
                                        <Button
                                            variant="contained"
                                            endIcon={<SendIcon />}
                                            sx={{
                                                alignSelf: 'flex-end',
                                                bgcolor: '#74c23d',
                                                '&:hover': {
                                                    bgcolor: '#377b06'
                                                }
                                            }}>
                                            Thêm
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <label>Yêu cầu approve dạng dây chuyền?</label>
                                </Grid>
                                <Grid item xs={4}>
                                    <Checkbox
                                        defaultChecked
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <label>Số người tối thiểu cần approve</label>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField variant="outlined" size="small" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <h3>Danh sách người được yêu cầu xác nhận</h3>
                    <List>
                        {nameList.map((name) => <ListItem key={name.name}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: name.isPerson ? '#74c23d' : '#1976d2' }}>
                                    <AccountCircleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={name.name} />
                            <Button
                                variant="contained"
                                color="error"
                                endIcon={<DeleteForeverIcon />}
                                sx={{
                                    alignSelf: 'flex-end',
                                }}>
                                Xóa
                            </Button>
                        </ListItem>)}
                    </List>
                </Box>
            </Box>
        </Card>
    );
}

export default ApproveComponent;
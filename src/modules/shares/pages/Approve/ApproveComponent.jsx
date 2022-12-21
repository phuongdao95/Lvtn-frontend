import * as React from 'react';
import { uniq, without } from 'lodash';
import { Box, InputLabel, Button, Avatar, ListItem, ListItemAvatar, ListItemText, List, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ApproveComponent = ({ departmentList, userList, isSequence, min, departmentIds, userIds, setData }) => {
    let [approveData, setApproveData] = React.useState({
        departmentIds,
        userIds,
        isSequence,
        min
    });

    React.useEffect(() => {
        setData(approveData);
    }, [approveData, setData]);

    let [department, setDepartment] = React.useState();
    let [user, setUser] = React.useState();

    const handleDMChange = (e) => {
        setDepartment(Number(e.target.value));
    }

    const handleUserChange = (e) => {
        setUser(Number(e.target.value));
    }

    return (
        <Card sx={{ padding: 5 }}>
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
                                    <Select size="small" sx={{ width: '80%' }} onChange={handleDMChange}>
                                        {departmentList.map(depart => <MenuItem value={depart.id} key={depart.id}>{depart.text}</MenuItem>)}
                                    </Select>

                                </Grid>
                                <Grid item xs={4}>
                                    <Box sx={{ display: 'flex', width: '100&', height: '100%' }}>
                                        <Button variant="contained"
                                            endIcon={<SendIcon />}
                                            sx={{ alignSelf: 'flex-end' }}
                                            onClick={() =>
                                                setApproveData({ ...approveData, departmentIds: uniq([...approveData.departmentIds, department]) })}>
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
                                    <Select size="small" sx={{ width: '80%' }} onChange={handleUserChange}>
                                        {userList.map(user => <MenuItem value={user.id} key={user.id}>{user.text}</MenuItem>)}
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
                                            }}
                                            onClick={() =>
                                                setApproveData({ ...approveData, userIds: uniq([...approveData.userIds, user]) })}>
                                            Thêm
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <label>Số người tối thiểu cần approve</label>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        defaultValue={min}
                                        onChange={(e) => setApproveData({ ...approveData, min: Number(e.target.value) })} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <h3>Danh sách người được yêu cầu xác nhận</h3>
                    <List>
                        {departmentList.filter(d => approveData.departmentIds.includes(d.id)).map((department) => <ListItem key={department.id}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#1976d2' }}>
                                    <AccountCircleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={department.text} />
                            <Button
                                variant="contained"
                                color="error"
                                endIcon={<DeleteForeverIcon />}
                                onClick={() => { setApproveData({ ...approveData, departmentIds: without(approveData.departmentIds, department.id) }) }}
                                sx={{
                                    alignSelf: 'flex-end',
                                }}>
                                Xóa
                            </Button>
                        </ListItem>)}
                        {userList.filter(u => approveData.userIds.includes(u.id)).map((user) => <ListItem key={user.id}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#74c23d' }}>
                                    <AccountCircleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user.text} />
                            <Button
                                variant="contained"
                                color="error"
                                endIcon={<DeleteForeverIcon />}
                                onClick={() => { setApproveData({ ...approveData, userIds: without(approveData.userIds, user.id) }) }}
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
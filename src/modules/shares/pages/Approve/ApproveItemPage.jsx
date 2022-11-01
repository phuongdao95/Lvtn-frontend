import * as React from 'react';
import { Card, InputLabel, Box, Divider, Avatar, Chip, Typography, Paper, Grid } from "@mui/material";
import moment from 'moment/moment';
import BreadCrumb from '../../breadcrumb/BreadCrumb';


const ApproverBox = ({ avatarUrl, name, status }) => {

    let color = status === 1 ? 'info' : status === 2 ? 'success' : 'error';
    let chipText = status === 1 ? 'Pending' : status === 2 ? 'Approved' : 'Denied';

    return <Box sx={{ display: 'flex', paddingBottom: '20px' }}>
        <Avatar src={avatarUrl} sx={{ height: '50px', width: '50px' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}>
            <InputLabel>{name}</InputLabel>
            <Chip variant='filled' color={color} size="small" label={chipText} sx={{ width: 'fit-content' }} />
        </Box>
    </Box>
}

const LogItemBox = ({ avatarUrl, name, text, dateLong }) => (
    <Paper style={{ padding: "15px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <Avatar alt="Remy Sharp" src={avatarUrl} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>{name}</h4>
                <p style={{ textAlign: "left" }}>
                    {text}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                    {moment(dateLong).fromNow()}
                </p>
            </Grid>
        </Grid>
    </Paper>
)

const ApproveItemPage = ({ content }) => {

    return (
        <Box sx={{ display: 'flex' }}>
            <Card sx={{ padding: 5, mt: 5, width: '60%', mr: 5 }}>
                <BreadCrumb status={3} />
                {content}

                <Divider variant="middle" sx={{ pt: 4, marginBottom: 4 }} />

                <Typography sx={{ fontWeight: '600', paddingBottom: '10px', fontSize: 20 }}>Danh sách những người có quyền chấp thuận/từ chối</Typography>
                <ApproverBox avatarUrl="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" name="Nguyen Phuong" status={1} />
                <ApproverBox avatarUrl="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" name="Nguyen Hai" status={2} />
                <ApproverBox avatarUrl="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" name="Nguyen Hinh" status={3} />
            </Card>
            <Card sx={{ padding: 5, mt: 5, width: '40%' }}>
                <Typography sx={{ fontWeight: '600', paddingBottom: '10px', fontSize: 20, margin: '0 auto' }}>Lịch sử thao tác</Typography>
                <LogItemBox avatarUrl="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                    name="Nguyen Hinh"
                    text="Test text"
                    dateLong={1664826749721} />
                <LogItemBox avatarUrl="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                    name="Nguyen Trung"
                    text="Test text 123434343"
                    dateLong={1904826749721} />
            </Card>
        </Box>
    );
}

export default ApproveItemPage;
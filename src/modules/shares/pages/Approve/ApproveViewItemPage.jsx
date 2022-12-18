import * as React from 'react';
import { Card, InputLabel, Box, Divider, Avatar, Chip, Typography, Paper, Grid, FormControl, Button, TextField } from "@mui/material";
import moment from 'moment/moment';
import BreadCrumb from '../../breadcrumb/BreadCrumb';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import * as workflowService from '../../../../client/workflowService';
import { useNavigate } from 'react-router';


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

const ApproveViewItemPage = ({ content, isApprover, data, flowId }) => {

    const navigation = useNavigate();
    const commentRef = React.useRef();

    return (
        <Box sx={{ display: 'flex' }}>
            <Card sx={{ padding: 5, mt: 5, width: '60%', mr: 5 }}>
                <BreadCrumb status={data?.status} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel>Người tạo: {data?.userCreatedName}</InputLabel>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Ngày tạo: {moment(data?.createdTime).format("DD-MM-YYYY : hA")}</InputLabel>
                    </Grid>
                </Grid>
                {content}
                {isApprover && data?.status == 0 &&
                    <Grid item xs={12} sx={{ mt: '30px' }}>
                        <Button variant="contained" color="error" startIcon={<DoDisturbIcon />} sx={{ marginRight: '10px' }} onClick={() => {
                            workflowService.setWorkflowStatus(flowId, 3).then(() => navigation("/approve-workflows/my-todo-requests"));
                        }}>
                            Từ chối
                        </Button>
                        <Button variant="contained" startIcon={<ThumbUpAltIcon />} type="submit" onClick={() => {
                            workflowService.setWorkflowStatus(flowId, 2).then(() => navigation("/approve-workflows/my-todo-requests"));
                        }}>
                            Chấp thuận
                        </Button>
                    </Grid>}
                <Divider variant="middle" sx={{ pt: 4, marginBottom: 4 }} />

                <Typography sx={{ fontWeight: '600', paddingBottom: '10px', fontSize: 20 }}>Danh sách những người chấp thuận/từ chối</Typography>
                {
                    data?.approvers?.map(item =>
                        <ApproverBox avatarUrl="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" name={item.name} status={item.status} />
                    )
                }
            </Card>
            <Card sx={{ padding: 5, mt: 5, width: '40%', display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: '600', paddingBottom: '10px', fontSize: 20, margin: '0 auto' }}>Lịch sử thao tác</Typography>
                {
                    data?.comments?.map(item =>
                        <LogItemBox avatarUrl="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                            name={item.name}
                            text={item.text}
                            dateLong={item.timeLong} />
                    )
                }
                {
                    data?.status == 0 &&
                    <FormControl variant="standard" fullWidth sx={{ justifySelf: 'end' }}>
                        <TextField
                            multiline
                            minRows={3}
                            maxRows={5}
                            focused={true}
                            inputRef={commentRef}
                        />
                        <Button onClick={() => {
                            workflowService.addComment(flowId, commentRef.current.value).then(() => {
                                window.location.reload(false);
                            })
                        }}>
                            Comment
                        </Button>
                    </FormControl>
                }
            </Card>
        </Box>

    );
}

export default ApproveViewItemPage;
import { Grid, TextField, Card, InputLabel, Box, Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import ApproveComponent from "../../shares/pages/Approve/ApproveComponent";
import * as React from 'react';
import * as workflowService from "../../../client/workflowService";
import { useNavigate } from "react-router";

const ConfigNghiPhep = () => {
    const [departmentList, setDepartmentList] = React.useState([]);
    const [userList, setUserList] = React.useState([]);
    const [configData, setConfigData] = React.useState({
        key: 1, // use to update component after get data
        "approveInfo": {
            "sequence": true,
            "minimum": 1,
            "departmentIds": [],
            "customApprovers": []
        },
        "longHolidaySet": 7,
        "overDay": 7
    })
    let [data, setData] = React.useState();
    const navigate = useNavigate();

    React.useEffect(() => {
        workflowService.getSelections().then(res => {
            setDepartmentList(res.departmentSelections);
            setUserList(res.userSelections);
        });
        workflowService.getNghiPhepConfig().then(res => setConfigData({ key: 2, ...res }));
    }, [])

    const onCancel = () => {
        navigate("/approve-workflows/configs");
    }

    const onSubmit = () => {
        workflowService.postNghiPhepConfig({
            "approveInfo": {
                "sequence": data.isSequence,
                "minimum": 0,
                "departmentIds": data.departmentIds,
                "customApprovers": data.userIds
            },
            "longHolidaySet": Number(longDayRef.current.value),
            "overDay": Number(overDayRef.current.value)
        });
    }

    const getApproveData = (data) => {
        setData(data);
    }

    const longDayRef = React.useRef();
    const overDayRef = React.useRef();

    return (
        <>
            <ApproveComponent
                departmentList={departmentList}
                userList={userList}
                setData={getApproveData}
                isSequence={configData.approveInfo.sequence}
                min={configData.approveInfo.minimum}
                departmentIds={configData.approveInfo.departmentIds}
                userIds={configData.approveInfo.customApprovers}
                key={configData.key} />

            <Card sx={{ padding: 5, mt: 5 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel sx={{ color: 'black' }}>Đánh dấu là nghỉ dài ngày nếu số ngày nghỉ lớn hơn (ngày)</InputLabel>
                        <TextField
                            inputRef={longDayRef}
                            defaultValue={configData.longHolidaySet}
                            type="number" fullWidth size="small"></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel sx={{ color: 'black' }}>Cho phép nghỉ quá số ngày nghỉ còn lại tối đa (ngày)</InputLabel>
                        <TextField
                            inputRef={overDayRef}
                            defaultValue={configData.overDay}
                            type="number" fullWidth size="small"></TextField>
                    </Grid>
                </Grid>
            </Card>

            <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingLeft: 'calc(100% - 256px)', paddingTop: 2, margin: '0' }}>
                <Button variant="contained" color="error" startIcon={<ClearIcon />} sx={{ marginRight: '10px' }} onClick={onCancel}>
                    Hủy
                </Button>
                <Button variant="contained" startIcon={<SaveIcon />} onClick={onSubmit}>
                    Lưu thay đổi
                </Button>
            </Box>
        </>
    );
}

export default ConfigNghiPhep;
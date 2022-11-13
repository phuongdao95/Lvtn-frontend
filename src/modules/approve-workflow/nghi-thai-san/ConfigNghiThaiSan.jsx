import { Grid, TextField, Card, InputLabel, Box, Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import ApproveComponent from "../../shares/pages/Approve/ApproveComponent";
import * as React from 'react';
import * as workflowService from "../../../client/workflowService";
import { useNavigate } from "react-router";

const ConfigNghiThaiSan = () => {
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
        "primary": 7,
        "secondary": 7
    })
    let [data, setData] = React.useState();
    const navigate = useNavigate();

    React.useEffect(() => {
        workflowService.getSelections().then(res => {
            setDepartmentList(res.departmentSelections);
            setUserList(res.userSelections);
        });
        workflowService.getNghiThaiSanConfig().then(res => setConfigData({ key: 2, ...res }));
    }, [])

    const onCancel = () => {
        navigate("/approve-workflows/configs");
    }

    const onSubmit = () => {
        workflowService.postNghiThaiSanConfig({
            "approveInfo": {
                "sequence": data.isSequence,
                "minimum": 0,
                "departmentIds": data.departmentIds,
                "customApprovers": data.userIds
            },
            "primary": Number(primaryRef.current.value),
            "secondary": Number(secondaryRef.current.value)
        });
    }

    const getApproveData = (data) => {
        setData(data);
    }

    const primaryRef = React.useRef();
    const secondaryRef = React.useRef();
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
                    <Grid item xs={4}>
                        <InputLabel sx={{ color: 'black' }}>Cho phép nghỉ sớm trước (ngày)</InputLabel>
                        <TextField type="number" fullWidth size="small"></TextField>
                    </Grid>

                    <Grid item xs={4}>
                        <InputLabel sx={{ color: 'black' }}>Số ngày nghỉ thai sản (người nghỉ là sản phụ) (tháng)</InputLabel>
                        <TextField type="number" fullWidth size="small"
                            inputRef={primaryRef}
                            defaultValue={configData.primary}
                        ></TextField>
                    </Grid>

                    <Grid item xs={4}>
                        <InputLabel sx={{ color: 'black' }}>Số ngày nghỉ thai sản (người nghỉ là chồng sản phụ) (tháng)</InputLabel>
                        <TextField type="number" fullWidth size="small"
                            inputRef={secondaryRef}
                            defaultValue={configData.secondaryRef}></TextField>
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

export default ConfigNghiThaiSan;
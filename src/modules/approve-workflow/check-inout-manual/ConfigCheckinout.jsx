import { Box, Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import ApproveComponent from "../../shares/pages/Approve/ApproveComponent";
import * as React from 'react';
import * as workflowService from "../../../client/workflowService";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ConfigCheckin = () => {
    const [departmentList, setDepartmentList] = React.useState([]);
    const [userList, setUserList] = React.useState([]);
    const [configData, setConfigData] = React.useState({
        key: 1, // use to update component after get data
        "approveInfo": {
            "sequence": true,
            "minimum": 1,
            "departmentIds": [],
            "customApprovers": []
        }
    })
    let [data, setData] = React.useState();
    const navigate = useNavigate();

    React.useEffect(() => {
        workflowService.getSelections().then(res => {
            setDepartmentList(res.departmentSelections);
            setUserList(res.userSelections);
        });
        workflowService.getCheckInConfig().then(res => setConfigData({ key: 2, ...res }));
    }, [])

    const onCancel = () => {
        navigate("/approve-workflows/configs");
    }

    const onSubmit = () => {
        if (data.min > data.departmentIds.length + data.userIds.length) {
            toast.error("Số người tối thiểu phải bé hơn tổng số người xét duyệt!");
            return;
        }
        workflowService.postCheckInConfig({
            "approveInfo": {
                "sequence": data.isSequence,
                "minimum": data.min,
                "departmentIds": data.departmentIds,
                "customApprovers": data.userIds
            }
        }).then(() => {
            toast.success("Lưu thành công!");
            navigate("/approve-workflows/configs");
        });
    }

    const getApproveData = (data) => {
        setData(data);
    }

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

export default ConfigCheckin;
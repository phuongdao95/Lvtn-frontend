import { Grid, TextField, Card, InputLabel, Box, Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import ApproveComponent from "../../shares/pages/Approve/ApproveComponent";

const ConfigCost = () => {
    return (
        <>
            <ApproveComponent />
            <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingLeft: 'calc(100% - 256px)', paddingTop: 2, margin: '0' }}>
                <Button variant="contained" color="error" startIcon={<ClearIcon />} sx={{ marginRight: '10px' }}>
                    Hủy
                </Button>
                <Button variant="contained" startIcon={<SaveIcon />}>
                    Lưu thay đổi
                </Button>
            </Box>
        </>
    );
}

export default ConfigCost;
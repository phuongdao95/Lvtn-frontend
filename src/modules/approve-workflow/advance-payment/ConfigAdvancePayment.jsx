import { Grid, TextField, Card, InputLabel, Box, Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import ApproveComponent from "../../shares/pages/Approve/ApproveComponent";

const ConfigAdvancePayment = () => {
    return (
        <>
            <ApproveComponent />
            <Card sx={{ padding: 5, mt: 5 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <InputLabel sx={{ color: 'black' }}>Số tháng cho phép ứng trước tối đa (ngày)</InputLabel>
                        <TextField type="number" fullWidth size="small"></TextField>
                    </Grid>
                </Grid>
            </Card>
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

export default ConfigAdvancePayment;
import { Grid, TextField, Card, InputLabel } from "@mui/material";
import ApproveComponent from "../../shares/ApproveComponent";

const ConfigNghiThaiSan = () => {
    return (
        <>
            <ApproveComponent />
            <Card sx={{ padding: 5, mt: 5 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <InputLabel>So ngay nghi som (ngay)</InputLabel>
                        <TextField type="number" fullWidth></TextField>
                    </Grid>

                    <Grid item xs={4}>
                        <InputLabel>So ngay nghi thai san - san phu (ngay)</InputLabel>
                        <TextField type="number" fullWidth></TextField>
                    </Grid>

                    <Grid item xs={4}>
                        <InputLabel>So ngay nghi thai san - chong san phu (ngay)</InputLabel>
                        <TextField type="number" fullWidth></TextField>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
}

export default ConfigNghiThaiSan;
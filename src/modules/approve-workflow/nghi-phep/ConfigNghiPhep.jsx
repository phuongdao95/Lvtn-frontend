import { Grid, TextField, Card, InputLabel } from "@mui/material";
import ApproveComponent from "../../shares/ApproveComponent";

const ConfigNghiPhep = () => {
    return (
        <>
            <ApproveComponent />
            <Card sx={{ padding: 5, mt: 5 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>La nghi dai ngay neu so ngay nghi lon hon (ngay)</InputLabel>
                        <TextField type="number" sx={{ width: "100%" }}></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Cho phep nghi qua toi da (ngay)</InputLabel>
                        <TextField type="number" InputLabelProps={{ shrink: true }} sx={{ width: "100%" }}></TextField>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
}

export default ConfigNghiPhep;
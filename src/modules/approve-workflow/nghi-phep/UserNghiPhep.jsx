import { Grid, TextField, Card, InputLabel } from "@mui/material";

const UserNghiPhep = () => {
    return (
        <>
            <Card sx={{ padding: 5, mt: 5 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>So ngay nghi phep con lai (ngay)</InputLabel>
                        <TextField type="number" fullWidth></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Ly do xin nghi phep</InputLabel>
                        <TextField fullWidth placeholder="Vi ly do..."></TextField>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}

export default UserNghiPhep;
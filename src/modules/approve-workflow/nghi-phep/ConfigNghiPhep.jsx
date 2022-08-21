import { Grid, TextField, Card, InputLabel } from "@mui/material";
import ApproveComponent from "../../shares/ApproveComponent";
import * as employeeService from "../../../client/employeeService";
import axios from 'axios';

const ConfigNghiPhep = () => {
    employeeService.getAllUsers()
        .then(res => console.log(res));
    console.log(axios.get("https://localhost:7115/api/user"));

    return (
        <>
            <ApproveComponent />
            <Card sx={{ padding: 5, mt: 5 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel>La nghi dai ngay neu so ngay nghi lon hon (ngay)</InputLabel>
                        <TextField type="number" fullWidth></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Cho phep nghi qua toi da (ngay)</InputLabel>
                        <TextField type="number" fullWidth></TextField>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
}

export default ConfigNghiPhep;
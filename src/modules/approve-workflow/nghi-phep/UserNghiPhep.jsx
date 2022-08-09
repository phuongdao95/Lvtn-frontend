import * as React from 'react';
import { Grid, TextField, Card, InputLabel } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ControlledSwitches from '../../shares/common/ControlledSwitches';

const UserNghiPhep = () => {
    const [value, setValue] = React.useState(
        new Date('2014-08-18T21:11:54'),
    );

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
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

                <Grid item xs={3}>
                    <InputLabel>Nghi tu ngay</InputLabel>
                    <DesktopDatePicker
                        inputFormat="MM/dd/yyyy"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </Grid>
                <Grid item xs={3}>
                    <InputLabel>Nghi den ngay</InputLabel>
                    <DesktopDatePicker
                        inputFormat="MM/dd/yyyy"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </Grid>

                <Grid item xs={6}>
                    <InputLabel>Nghi khong luong</InputLabel>
                    <ControlledSwitches />
                </Grid>
            </Grid>
        </Card>
    );
}

export default UserNghiPhep;
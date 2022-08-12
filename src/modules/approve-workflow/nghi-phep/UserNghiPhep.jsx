import * as React from 'react';
import { Grid, TextField, Card, InputLabel } from "@mui/material";
import ControlledSwitches from '../../shares/common/ControlledSwitches';
import ComponentDatePicker from '../../shares/common/ComponentDatePicker';

const UserNghiPhep = () => {
    // const [value, setValue] = React.useState(
    //     new Date('2014-08-18T21:11:54'),
    // );

    // const handleChange = (newValue) => {
    //     setValue(newValue);
    // };

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
                    <ComponentDatePicker label='Nghi tu ngay' date={new Date()} isReadOnly={false} />
                </Grid>
                <Grid item xs={3}>
                    <ComponentDatePicker label='Nghi den ngay' date={new Date()} isReadOnly={false} />
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
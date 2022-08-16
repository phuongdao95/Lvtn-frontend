import * as React from 'react';
import { Grid, Card, InputLabel } from "@mui/material";
import ControlledSwitches from '../../shares/common/ControlledSwitches';
import ComponentDatePicker from '../../shares/common/ComponentDatePicker';

const UserNghiThaiSan = () => {
    // const [value, setValue] = React.useState(
    //     new Date('2014-08-18T21:11:54'),
    // );

    // const handleChange = (newValue) => {
    //     setValue(newValue);
    // };

    return (
        <Card sx={{ padding: 5, mt: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <InputLabel>Nghi thai san som</InputLabel>
                    <ControlledSwitches />
                </Grid>

                <Grid item xs={4}>
                    <InputLabel>Xin nghi voi tu cach la chong</InputLabel>
                    <ControlledSwitches />
                </Grid>

                <Grid item xs={4}>
                    <ComponentDatePicker label='Nghi tu ngay' date={new Date()} isReadOnly={false} />
                </Grid>
            </Grid>
        </Card>
    );
}

export default UserNghiThaiSan;
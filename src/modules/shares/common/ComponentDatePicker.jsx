import * as React from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField, InputLabel } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const ComponentDatePicker = (props) => {
    const [value, setValue] = React.useState(props.date);
    const handleChange = (newValue) => {
        setValue(newValue);
    };
    // const getValue = () => {
    //     return value;
    // };
    return (
        <>
            <InputLabel>{props.label}</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                readOnly={props.isReadOnly ? true : false}
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} fullWidth />}>
            </DesktopDatePicker>
            </LocalizationProvider>
        </>
    )
}
export default ComponentDatePicker;
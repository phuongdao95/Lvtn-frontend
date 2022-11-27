import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

export default function TimePicker(props) {
    return <MuiTimePicker
        {...props}
        renderInput={(params) => <TextField size="small" fullWidth {...params} />}
    />;
}
import { MobileDatePicker as MuiDesktopDatePicker } from "@mui/x-date-pickers";
import TextField from "./TextField";


export default function DatePicker({
    id,
    name,
    value,
    onChange,
    error,
    helperText,
    ...rest
}) {
    return <MuiDesktopDatePicker
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        renderInput={(params) =>
            <TextField {...params}
                helperText={helperText} 
                error={error}
            />
        }
        {...rest}
    />;
}
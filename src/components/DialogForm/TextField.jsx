import { TextField as MuiTextField } from "@mui/material";

export default function TextField({ helperText, error, ...rest }) {
    return <MuiTextField {...rest} size="small" fullWidth helperText={helperText} error={error} />
}
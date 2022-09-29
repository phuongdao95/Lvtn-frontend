import { TextField as MuiTextField } from "@mui/material";

export default function TextField({ helperText, error, type, readOnly, ...rest }) {
    return <MuiTextField {...rest} size="small"
        fullWidth
        type={type}
        helperText={helperText}
        error={error}
        InputProps={{
            readOnly
        }}
    />
}
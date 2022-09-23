import { TextField as MuiTextField } from "@mui/material";

export default function TextField({ helperText, error, readOnly, ...rest }) {
    return <MuiTextField {...rest} size="small"
        fullWidth
        helperText={helperText}
        error={error}
        InputProps={{
            readOnly
        }}
    />
}
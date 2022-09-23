import { Select as MuiSelect, MenuItem } from "@mui/material"

export default function Select({ options, values, ...rest }) {
    return <MuiSelect
        {...rest}
        value={10}
        size="small"
    >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
    </MuiSelect>
}
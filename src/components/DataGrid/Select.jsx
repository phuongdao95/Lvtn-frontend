import { Select as MuiSelect, MenuItem } from "@mui/material"

export default function Select() {
    return <MuiSelect
        value={10}
        label="Age"
        size="small"
    >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
    </MuiSelect>
}
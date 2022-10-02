import { Select as MuiSelect, MenuItem } from "@mui/material"

export default function Select({ options = [], value = null, ...rest }) {
    return <MuiSelect
        {...rest}
        size="small"
        value={value}
    >
        {options.map((option) =>
            <MenuItem key={option.label} value={option.label}
                onClick={option.handler}
                onChange={(event) => {
                    console.log(event.target.value)
                }}
            >
                {option.label}
            </MenuItem>)
        }
    </MuiSelect>
}
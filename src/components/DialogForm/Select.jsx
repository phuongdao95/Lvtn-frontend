import { MenuItem } from "@mui/material";
import { Select as MuiSelect } from '@mui/material';


export default function Select({
    id,
    menu = [],
    onChange,
    value,
    ...rest
}) {
    return <MuiSelect
        size="small"
        fullWidth
        id={id}
        value={value}
        onChange={onChange}
        {...rest}
    >
        {
            menu.map((item) =>
                <MenuItem value={item.value} key={item.value}>
                    {item.label}
                </MenuItem>)
        }
    </MuiSelect>
}
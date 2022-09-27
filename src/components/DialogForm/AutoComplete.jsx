import { Autocomplete as MuiAutoComplete, TextField } from "@mui/material";

export default function AutoComplete({
    options,
    id,
    name,
    value,
    onChange,
    getOptionLabel,
    isOptionEqualToValue,
}) {

    return <MuiAutoComplete
        fullWidth
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        disablePortal
        id={id}
        name={name}
        options={options}
        onChange={onChange}
        value={value}
        renderInput={(params) => <TextField {...params} size="small" />}
    />
}


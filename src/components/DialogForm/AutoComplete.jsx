import { Autocomplete as MuiAutoComplete, TextField } from "@mui/material";

export default function AutoComplete({
    options,
    id,
    name,
    value,
    onChange,
    getOptionLabel = (option) => option.name,
    isOptionEqualToValue = (option, value) => option.id === value.id,
}) {

    return <MuiAutoComplete
        fullWidth
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        id={id}
        name={name}
        options={[...options, { id: null, name: "" }]}
        onChange={onChange}
        value={value}
        renderInput={(params) => <TextField {...params} size="small" />}
    />
}


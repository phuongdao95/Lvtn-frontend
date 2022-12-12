import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Chip } from '@mui/material';

export default function AutoCompleteMultiple({
    options,
    getOptionLabel = (option) => option.name,
    isOptionEqualToValue = (option, value) => option.id === value.id,
    value,
    onChange,
    disabled = false,
}) {
    return (
        <Autocomplete
            fullWidth
            multiple
            disabled={disabled}
            ListboxProps={{ style: { maxHeight: 150 } }}
            filterSelectedOptions
            options={options}
            value={value}
            onChange={onChange}
            isOptionEqualToValue={isOptionEqualToValue}
            getOptionLabel={getOptionLabel}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        label={getOptionLabel(option)}
                        variant="filled"
                        size="small"
                        {...getTagProps({ index })} />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    maxRows={4}
                    fullWidth
                    size="small"
                />
            )}
        />
    );
}


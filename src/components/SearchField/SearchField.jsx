import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { TextField } from '@mui/material';


export default function SearchField({ ...props }) {
    return (
        <TextField
            size='small'
            placeholder='Tìm kiếm'
            variant="outlined"
            InputProps={{
                endAdornment: (
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                ),
            }}
            {...props}
        />
    );
}

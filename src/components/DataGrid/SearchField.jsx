import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { TextField } from '@mui/material';


export default function SearchField(props) {
    return (
        <TextField
            size='small'
            id="standard-bare"
            variant="outlined"
            placeholder='Tìm kiếm'
            defaultValue=""
            InputProps={{
                endAdornment: (
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                ),
            }}
        />
    );
}

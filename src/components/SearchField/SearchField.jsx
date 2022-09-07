import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { TextField } from '@mui/material';


export default function SearchField(props) {
    return (
        <TextField
            size='small'
            maxWidth={400}
            id="standard-bare"
            variant="outlined"
            placeholder='Search something'
            defaultValue="How can we help"
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

import * as React from 'react';
import { RadioGroup, FormLabel, FormControlLabel, Radio, Box, FormControl } from '@mui/material';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    height: 50,
    lineHeight: '50px',
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 10
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ApproveComponent = () => {
    const handleDelete = () => { };

    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];

    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    return (
        <Card sx={{ padding: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box >
                    <FormLabel id="approve-type">Way To Approve</FormLabel>
                    <RadioGroup
                        aria-labelledby="approve-type"
                        defaultValue="cur"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="cur" control={<Radio />} label="Đồng thời" />
                        <FormControlLabel value="pal" control={<Radio />} label="Song song" />
                    </RadioGroup>
                </Box>
                <Box >
                    <FormLabel id="approvers">Approvers List</FormLabel>
                    <Item>
                        <Chip label="Nguyen Van A" onDelete={handleDelete} />
                        <Chip label="ABC Department Manager" onDelete={handleDelete} />
                        <Chip label="Supervisor Level 3" onDelete={handleDelete} />
                    </Item>
                </Box>
            </Box>
            <Box>
                <Grid container spacing={4} justifyContent="center" >
                    <Grid item xs={4}>
                        <FormControl sx={{ m: 1, width: '100%', mt: 3 }}>
                            <Select
                                multiple
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                value={personName}
                                input={<OutlinedInput />}
                                onChange={handleChange}
                                renderValue={(selected) => {
                                    return "Choose department managers";
                                }}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl sx={{ m: 1, width: "100%", mt: 3 }}>
                            <Select
                                multiple
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                value={personName}
                                input={<OutlinedInput />}
                                onChange={handleChange}
                                renderValue={(selected) => {
                                    return "Choose specific person";
                                }}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl sx={{ width: '100%' }}>
                            <Box sx={{ m: 1, width: "100%", mt: 3, display: 'flex' }}>
                                <Input type="number" placeholder="Department level" inputProps={{ 'aria-label': 'description' }} sx={{ marginRight: 5 }} />
                                <Button variant="contained">Add</Button>
                            </Box>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}

export default ApproveComponent;
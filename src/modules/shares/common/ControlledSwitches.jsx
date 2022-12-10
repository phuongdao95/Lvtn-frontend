import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function ControlledSwitches({ name, onChange }) {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        onChange(event.target.checked);
    };

    return (
        <Switch
            name={name}
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}

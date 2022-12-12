import { FilterAlt } from "@mui/icons-material"
import { Button } from "@mui/material"

export default function FilterButton({ ...rest }) {
    return <Button {...rest} variant="contained" sx={{ display: 'flex', flexDirection: 'row', gap: 0.7 }}>
        <FilterAlt /> Bộ lọc
    </Button>
}
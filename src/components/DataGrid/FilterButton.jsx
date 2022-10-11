import { Button } from "@mui/material"

export default function FilterButton({ ...rest }) {
    return <Button {...rest} size="small" sx={{ fontWeight: 550 }} variant="outlined">
        Filter
    </Button>
}
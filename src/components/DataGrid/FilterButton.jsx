import { Button } from "@mui/material"

export default function FilterButton({ ...rest }) {
    return <Button {...rest} size="small"  variant="outlined">
        Lọc
    </Button>
}